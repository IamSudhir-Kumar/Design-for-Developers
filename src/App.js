import logo from './logo.svg';
import './App.css';
import Logs from './components/logs/Logs';
import Metrics from './components/metrices/Metrices';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
     <Navbar />
     <div>
        <Routes>
          <Route path="/logs" element={<Logs />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
     </div>
    </div>
  );
}

export default App;
