import React from 'react';
import { Modal, Button, Group, Text, Flex } from '@mantine/core';

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
    <Modal
      opened={open}
      onClose={onClose}
      title="  Select the local path where you would like to generate the dataset to"
    >
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Button onClick={onFolderSelectButtonClick}>Select save path</Button>
        <Text>{JSON.stringify(selectedFolderPath)}</Text>
      </Flex>
      <Button onClick={handleDatasetCustomizationOpen}>Generate dataset</Button>
      <Group>
        <Button onClick={handleDatasetCustomizationOpen}>
          Generate dataset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Group>
    </Modal>
  );
}

export default FolderSelectDialog;
