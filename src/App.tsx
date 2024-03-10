import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Logs from "./components/Logs/Logs";
import Metrics from "./components/Metrics/Metrics";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/logs" element={<Logs />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
