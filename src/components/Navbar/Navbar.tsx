import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoActive from "../../assets/Sidepane/TF logo.svg";
import matrixLOGO from "../../assets/Sidepane/metrics.png";
import matrixActiveLOGO from "../../assets/Sidepane/metrics-gray.png";
import logsActiveLOGO from "../../assets/Sidepane/list-active.png";
import logsInactiveLOGO from "../../assets/Sidepane/list.png";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Determine the active state for each link based on the current route
  const logsActive = location.pathname === "/logs";
  const matrixActive = location.pathname === "/metrics";

  return (
    <nav className="bg-white p-4">
      <ul className="flex space-x-4 text-black items-center">
        {/* Logo */}
        <img src={logoActive} alt="logo"  />

        {/* Logs Link */}
        <li className="flex items-center">
          <img
            src={logsActive ? logsActiveLOGO : logsInactiveLOGO}
            alt="Logs"
            className="w-4 h-4 mr-2"
          />
          <Link to="/logs" className={logsActive ? "underline" : ""}>
            Logs
          </Link>
        </li>

        {/* Metrics Link */}
        <li className="flex items-center">
          <img
            src={matrixActive ? matrixActiveLOGO : matrixLOGO}
            alt="Metrics"
            className="w-4 h-4 mr-2"
          />
          <Link to="/metrics" className={matrixActive ? "underline" : ""}>
            Metrics
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
