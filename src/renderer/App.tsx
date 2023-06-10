import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Home from '../components/Home';
import CurateHome from '../components/CurateHome';
import CurateMetadata from '../components/CurateMetadata';

import './App.css';

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Curate" element={<CurateHome />} />
          <Route path="/Curate/Metadata" element={<Home />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}
