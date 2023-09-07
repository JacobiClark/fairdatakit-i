import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from '@mui/material';

type FolderSelectDialogProps = {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Function to handle the dialog's close event
  onFolderSelectButtonClick: () => void; // Function to handle folder selection button click
  selectedFolderPath: string; // The selected folder path to display
  handleDatasetCustomizationOpen: () => void; // Function to handle dataset customization dialog open
};

function FolderSelectDialog({
  open,
  onClose,
  onFolderSelectButtonClick,
  selectedFolderPath,
  handleDatasetCustomizationOpen,
}: FolderSelectDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select dataset location</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the local path where you would like to generate the dataset to
        </DialogContentText>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Button
            sx={{ m: 3 }}
            variant="contained"
            color="primary"
            onClick={onFolderSelectButtonClick}
          >
            Select save path
          </Button>
          <Typography>{JSON.stringify(selectedFolderPath)}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDatasetCustomizationOpen}>
          Generate dataset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FolderSelectDialog;
