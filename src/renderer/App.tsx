import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import MetadataForm from '../components/MetadataForm';
import CurateHome from '../components/CurateHome';
import CurateMetadata from '../components/CurateMetadata';

import './App.css';

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<MetadataForm />} />
          <Route path="/Curate" element={<CurateHome />} />
          <Route path="/Curate/Metadata" element={<MetadataForm />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}
