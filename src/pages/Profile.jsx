import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhoto(user.photoURL || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setSuccess('Profile updated!');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="mb-6 text-center">
        <img src={user?.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-2" />
        <p className="font-semibold">{user?.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          className="w-full border p-2"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default Profile;
