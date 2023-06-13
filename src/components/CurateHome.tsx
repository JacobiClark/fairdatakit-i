import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function CurateHome() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/Curate/Metadata">
        <Button variant="contained" color="primary">
          Metadata
        </Button>
      </Link>
      <Link to="/Curate/dataset">
        <Button variant="contained" color="primary">
          Dataset
        </Button>
      </Link>
    </>
  );
}

export default CurateHome;
