import React, { useState, useEffect } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { Button, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface FolderStructure {
  name: string;
  path: string;
  children: FolderStructure[];
}

function DatasetForm() {
  const [folderStructure, setFolderStructure] =
    useState<FolderStructure | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSendMessage = () => {
    window.electron.ipcRenderer.sendMessage('open-folder-dialog', []);
  };

  useEffect(() => {
    const handleDatasetStructureMessage = (args: FolderStructure) => {
      setFolderStructure(args);
    };

    window.electron.ipcRenderer.on(
      'open-folder-dialog',
      handleDatasetStructureMessage
    );
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const renderTree = (nodes: FolderStructure) => (
    <TreeItem
      key={nodes.path}
      nodeId={nodes.path}
      label={nodes.relativePath}
      onContextMenu={handleContextMenu}
    >
      {nodes.children.map((node) => renderTree(node))}
    </TreeItem>
  );

  return (
    <>
      {folderStructure && (
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          sx={{
            height: 500,
            flexGrow: 1,
            maxWidth: '100%',
            overflowY: 'auto',
          }}
        >
          {renderTree(folderStructure)}
        </TreeView>
      )}
      <button type="button" onClick={handleSendMessage}>
        Send IPC Message
      </button>
    </>
  );
}

export default DatasetForm;
