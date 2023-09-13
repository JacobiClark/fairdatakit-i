import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderSelectDialog from './FolderSelectDialog';
import DatasetCustomizationDialog from './DatasetCustomizationDialog';

const dummyDatasets = [
  { name: 'Dataset 1', description: 'This is a description of dataset 1' },
  { name: 'Dataset 2', description: 'This is a description of dataset 2' },
  { name: 'Dataset 3', description: 'This is a description of dataset 3' },
];

function GenerateTestDatasetHome() {
  const [folderSelectOpen, setFolderSelectOpen] = useState(false);
  const [datasetCustomizationOpen, setDatasetCustomizationOpen] =
    useState(false);
  const [selectedFolderPath, setSelectedFolderPath] = useState('');

  const openGenerateTestDatasetConfigDialogue = () => {
    setDatasetCustomizationOpen(true);
  };

  // IPC Functions
  const openDefaultDatasetSavePath = () => {
    window.electron.ipcRenderer.sendMessage(
      'open-single-folder-select-test-dataset-save-path',
      []
    );
  };

  useEffect(() => {
    // IPC Event Handler to set the selected folder path
    const setTestDatasetSavePath = (selectedDatasetPath) => {
      setSelectedFolderPath(selectedDatasetPath);
    };

    window.electron.ipcRenderer.on(
      'open-single-folder-select-test-dataset-save-path-success',
      setTestDatasetSavePath
    );
  }, []);

  useEffect(() => {
    // Send the IPC message to the main process
    window.electron.ipcRenderer.sendMessage('get-test-dataset-save-path', []);

    // Register the event listener and get the cleanup function
    const unsubscribe = window.electron.ipcRenderer.on(
      'get-test-dataset-save-path-reply',
      (folderPath) => {
        // Handle the IPC message here
        setSelectedFolderPath(folderPath);
      }
    );

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      console.log("Removing 'get-test-dataset-save-path-reply' listener");
      unsubscribe(); // Call the cleanup function to unsubscribe
    };
  }, []);

  useEffect(() => {
    // Get the default test dataset path from main and set it
    const handleMessage = (res) => {
      console.log(data);
    };

    window.electron.ipcRenderer.on(
      'generate-test-dataset-success',
      handleMessage
    );
  }, []);

  const handleFolderSelectClose = () => {
    setFolderSelectOpen(false);
  };

  const handleDatasetCustomizationOpen = () => {
    setFolderSelectOpen(false);
    setDatasetCustomizationOpen(true);
  };

  const handleDatasetCustomizationClose = () => {
    setDatasetCustomizationOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={openDefaultDatasetSavePath}
      >
        Select default save location
      </Button>
      <Typography gutterBottom>
        {selectedFolderPath || 'No folder selected'}
      </Typography>

      {selectedFolderPath && (
        <Button
          variant="contained"
          color="primary"
          onClick={openGenerateTestDatasetConfigDialogue}
        >
          Add dataset
        </Button>
      )}
      <FolderSelectDialog
        open={folderSelectOpen}
        onClose={handleFolderSelectClose}
        onFolderSelectButtonClick={openDefaultDatasetSavePath}
        selectedFolderPath={selectedFolderPath}
        handleDatasetCustomizationOpen={handleDatasetCustomizationOpen}
      />
      <DatasetCustomizationDialog
        open={datasetCustomizationOpen}
        onClose={handleDatasetCustomizationClose}
      />

      <h1>Current datasets</h1>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Avatar with text and icon
        </Typography>
        <List>
          {dummyDatasets.map((dataset) => (
            <ListItem
              key={dataset.name}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={dataset.name}
                secondary={dataset.description}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

export default GenerateTestDatasetHome;
