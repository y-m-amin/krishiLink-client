import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser().catch(console.error);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">🌾 KrishiLink</h1>
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/crops">All Crops</Link></li>
          {!user && <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>}
          {user && <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/add-crop">Add Crop</Link></li>
            <li><Link to="/my-posts">My Posts</Link></li>
            <li><Link to="/my-interests">My Interests</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
