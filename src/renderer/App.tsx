import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Home from '../components/Home';
import PingPong from '../components/PingPong';
import './App.css';

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/datasets" element={<Home />} />
          <Route path="/metadata" element={<PingPong />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}
