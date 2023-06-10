import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function CurateHome() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/Curate/Metadata">
        <Button variant="contained" color="primary">
          Link
        </Button>
      </Link>
    </>
  );
}

export default CurateHome;
