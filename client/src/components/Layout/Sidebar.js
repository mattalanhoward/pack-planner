// src/components/Layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <nav className="h-full bg-gray-800 text-white p-4">
    <ul className="space-y-2">
      <li>
        <NavLink
          to="/garage"
          className={({ isActive }) =>
            isActive ? 'block font-bold' : 'block hover:underline'
          }
        >
          Garage
        </NavLink>
      </li>
      {/* Example: replace "123" with a real board id or map through your boards */}
      <li>
        <NavLink
          to="/lists/123"
          className={({ isActive }) =>
            isActive ? 'block font-bold' : 'block hover:underline'
          }
        >
          My First List
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
