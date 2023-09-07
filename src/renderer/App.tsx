import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import MetadataForm from '../components/MetadataForm';
import FileExplorer from '../components/FileExplorer';
import PingPong from '../components/PingPong';
import CurateHome from '../components/CurateHome';
import GenerateTestDatasetHome from '../components/GenerateTestDatasetHome';

import './App.css';
import DatasetForm from 'components/DatasetForm';

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<DatasetForm />} />

          <Route path="/curate" element={<CurateHome />} />
          <Route path="/curate/Metadata" element={<MetadataForm />} />
          <Route path="/curate/dataset" element={<DatasetForm />} />
          <Route
            path="/generate-test-dataset"
            element={<GenerateTestDatasetHome />}
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}
