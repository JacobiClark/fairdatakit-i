import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import { DatasetForm } from 'components/DatasetForm';

import AppContainer from '../components/AppContainer';
import MetadataForm from '../components/MetadataForm';

import PingPong from '../components/PingPong';
import CurateHome from '../components/CurateHome';

import './App.css';

const theme = createTheme({});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Routes>
            <Route path="/" element={<DatasetForm />} />

            <Route path="/Curate" element={<CurateHome />} />
            <Route path="/Curate/Metadata" element={<MetadataForm />} />
            <Route path="/Curate/dataset" element={<DatasetForm />} />
          </Routes>
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}
