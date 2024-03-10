import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/logs">Logs</Link>
        </li>
        <li>
          <Link to="/metrics">Metrics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
