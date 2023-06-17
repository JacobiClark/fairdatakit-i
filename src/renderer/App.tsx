import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import MetadataForm from '../components/MetadataForm';
import FileExplorer from '../components/FileExplorer';
import PingPong from '../components/PingPong';
import CurateHome from '../components/CurateHome';

import './App.css';
import DatasetForm from 'components/DatasetForm';

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<DatasetForm />} />

          <Route path="/Curate" element={<CurateHome />} />
          <Route path="/Curate/Metadata" element={<MetadataForm />} />
          <Route path="/Curate/dataset" element={<DatasetForm />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}
