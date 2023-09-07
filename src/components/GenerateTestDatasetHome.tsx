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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

  const handleFolderSelectOpen = () => {
    setFolderSelectOpen(true);
  };
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

  const handleGetDatasetsButtonClick = () => {
    window.electron.ipcRenderer.sendMessage('get-datasets', []);
  };

  const handleAddDatasetsButtonClick = () => {
    window.electron.ipcRenderer.sendMessage('add-dataset', {
      datasetName: 'Test dataset',
      datasetPath: 'This is a test dataset',
    });
  };

  const handleFolderSelectButtonClick = () => {
    window.electron.ipcRenderer.sendMessage('open-folder-select', []);
  };

  useEffect(() => {
    const handleDatasetStructureMessage = (args) => {
      setSelectedFolderPath(args);
    };

    window.electron.ipcRenderer.on(
      'open-folder-select',
      handleDatasetStructureMessage
    );
  }, []);

  useEffect(() => {
    const handleDatasetNameMessage = (args) => {
      console.log(args);
    };

    window.electron.ipcRenderer.on('get-datasets', handleDatasetNameMessage);
  }, []);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFolderSelectButtonClick}
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
          onClick={handleAddDatasetsButtonClick}
        >
          Add dataset
        </Button>
      )}

      <FolderSelectDialog
        open={folderSelectOpen}
        onClose={handleFolderSelectClose}
        onFolderSelectButtonClick={handleFolderSelectButtonClick}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetDatasetsButtonClick}
      >
        Get datasets
      </Button>
    </>
  );
}

export default GenerateTestDatasetHome;
