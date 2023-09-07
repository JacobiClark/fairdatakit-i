/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  TextField,
  Checkbox,
  Select,
  Slider,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

type DatasetCustomizationDialogProps = {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Function to handle the dialog's close event
};

function DatasetCustomizationDialog({
  open,
  onClose,
}: DatasetCustomizationDialogProps) {
  const { control, handleSubmit, reset } = useForm();

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
            sx={{ m: 3, gap: 3 }}
          >
            <Controller
              name="Dataset name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Dataset name"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="Number of folders"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Slider
                  aria-label="Number of folders"
                  defaultValue={0}
                  min={0}
                  max={50}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  {...field}
                />
              )}
            />
            <Controller
              name="Number of files per folder"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Slider
                  aria-label="Number of files per folder"
                  defaultValue={0}
                  min={0}
                  max={50}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  {...field}
                />
              )}
            />

            <DialogActions>
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
