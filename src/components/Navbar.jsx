import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/signin');
      };
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">My App</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-200 transition duration-150 ease-in-out">Home</Link>
          </li>
          <li>
            <Link to="/add-book" className="hover:text-blue-200 transition duration-150 ease-in-out">Add Book</Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-blue-200 transition duration-150 ease-in-out">Users</Link>
          </li>
          <li>
          <button onClick={handleLogout}>Logout</button>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
