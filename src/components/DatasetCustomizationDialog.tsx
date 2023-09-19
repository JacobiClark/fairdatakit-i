import React, { useState, useEffect } from 'react';
import { Modal, Group } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type DatasetCustomizationDialogProps = {
  open: boolean; // Whether the dialog is open
  onClose: () => void; // Function to handle the dialog's close event
};

function DatasetCustomizationDialog({
  open,
  onClose,
}: DatasetCustomizationDialogProps) {
  const { control, handleSubmit, reset, watch } = useForm();
  const formData = watch();

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <Modal opened={open} onClose={onClose} title="Authentication" centered>
      <button onClick={onClose}>asdf</button>
    </Modal>
  );
}

export default DatasetCustomizationDialog;
