import React, { useState, useEffect } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { Button, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function DatasetForm() {
  return (
    <>
      <div style={{ height: 400 }}>
        <FullFileBrowser
          files={files}
          folderChain={folderChain}
          fileActions={fileActions}
          onFileAction={handleFileAction}
          thumbnailGenerator={thumbnailGenerator}
          {...props}
        />
      </div>
      <button type="button" onClick={handleSendMessage}>
        Send IPC Message
      </button>
    </>
  );
}

export default DatasetForm;
