import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import './App.css';

function Home() {
  return <div>Home</div>;
}
export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Home />} />
          <Route path="/metadata" element={<div>a</div>} />
        </Routes>
      </AppContainer>
    </Router>
  );
}
