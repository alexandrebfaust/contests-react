import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">
        <Link to="/">CosContest</Link>
      </h1>
      <div>
        <Link to="/login" className="text-white mr-4 hover:text-gray-400">Login</Link>
        <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
