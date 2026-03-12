import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CapabilityPage from './pages/CapabilityPage/CapabilityPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capabilities/:slug" element={<CapabilityPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
