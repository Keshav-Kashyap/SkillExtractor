import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-xl font-bold text-black cursor-pointer">
          SkillExtractor
        </Link>
      </div>

      <div className="flex gap-3">
        <Link to="/About">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
            About us
          </button>
        </Link>

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Welcome !!
        </button>
      </div>
    </nav>
  );
}
