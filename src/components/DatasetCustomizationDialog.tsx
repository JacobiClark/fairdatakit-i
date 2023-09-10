/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  TextField,
  Slider,
  Typography,
  Button,
  Typography,
  InputLabel,
} from '@mui/material';
import Switch from '@mui/material/Switch';

import { useForm, Controller } from 'react-hook-form';

type DatasetCustomizationDialogProps = {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Function to handle the dialog's close event
};

function DatasetCustomizationDialog({
  open,
  onClose,
}: DatasetCustomizationDialogProps) {
  const { control, handleSubmit, reset, watch } = useForm();
  const [totalSize, setTotalSize] = useState(0); // Initialize total size to 0

  // Calculate the total size based on user selections
  const calculateTotalSize = () => {
    const formData = watch();
    console.log(formData);
    const numberOfFolders = formData.numberOfFolders || 0;
    const numberOfFilesPerFolder = formData.numberOfFilesPerFolder || 0;
    const sizePerFile = formData.sizePerFile || 0;

    // Calculate the total size
    const totalSize = numberOfFolders * numberOfFilesPerFolder * sizePerFile;
    setTotalSize(totalSize);
  };

  useEffect(() => {
    // Call the calculateTotalSize function when the component mounts
    calculateTotalSize();
  }, []); // Empty dependency array to run it only once on mount

  const onSubmit = (data: any) => {
    console.log(data);
    // Add your form submission logic here
    // You can also close the dialog if needed
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customize dataset</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            minWidth={500}
          >
            <Controller
              name="datasetName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="dataset-name">Dataset name</InputLabel>
                  <TextField
                    id="dataset-name"
                    variant="outlined"
                    fullWidth
                    {...field}
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}
            />
            <Controller
              name="numberOfFolders"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="number-of-folders">
                    Number of folders per folder
                  </InputLabel>
                  <Slider
                    id="number-of-folders"
                    aria-label="Number of folders"
                    defaultValue={0}
                    min={0}
                    max={200}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    {...field}
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}
            />
            <Controller
              name="numberOfFilesPerFolder"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="number-of-files">
                    Number of files per folder
                  </InputLabel>
                  <Slider
                    id="number-of-files"
                    aria-label="Number of files per folder"
                    defaultValue={0}
                    min={0}
                    max={50}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    {...field}
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}
            />

            <Controller
              name="sizePerFile"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="size-per-file">
                    Size (mb) per file
                  </InputLabel>
                  <Slider
                    id="size-per-file"
                    aria-label="Size (mb) per file"
                    defaultValue={0}
                    min={0.001}
                    max={50}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    {...field}
                    sx={{ width: '100%' }}
                  />
                </Box>
              )}
            />

            <Typography variant="body2">Total Size: {totalSize} MB</Typography>

            <Controller
              name="includeHiddenFiles"
              control={control}
              defaultValue={false} // Set the default value to false
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="include-hidden-files">
                    Include Hidden Files
                  </InputLabel>
                  <Switch
                    id="include-hidden-files"
                    color="primary"
                    {...field}
                  />
                </Box>
              )}
            />
            <Controller
              name="includeProblematicFileNames"
              control={control}
              defaultValue={false} // Set the default value to false
              render={({ field }) => (
                <Box sx={{ width: '100%' }}>
                  <InputLabel htmlFor="include-problematic-files">
                    Include files with problematic names
                  </InputLabel>
                  <Switch
                    id="include-problematic-files"
                    color="primary"
                    {...field}
                  />
                </Box>
              )}
            />

            <DialogActions>
              <Button onClick={reset}>Reset</Button>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Generate dataset
              </Button>
            </DialogActions>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DatasetCustomizationDialog;
