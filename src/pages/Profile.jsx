import { updateProfile } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
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
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col w-full'>
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-primary'>My Profile</h1>
          <p className='py-2 text-base-content/70 max-w-md mx-auto'>
            View and update your account information.
          </p>
        </div>

        <div className='card bg-base-100 w-full max-w-md shadow-2xl'>
          <div className='card-body items-center text-center'>
            <div className='avatar mb-4'>
              <div className='w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                <img
                  src={photo || user?.photoURL || '/placeholder.jpg'}
                  alt='Profile'
                />
              </div>
            </div>
            <p className='font-semibold text-base-content'>{user?.email}</p>
          </div>

          <form onSubmit={handleUpdate} className='card-body pt-0 space-y-4'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                placeholder='Enter your name'
                className='input input-bordered w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Photo URL</span>
              </label>
              <input
                type='text'
                placeholder='Enter a photo URL'
                className='input input-bordered w-full'
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            {success && <p className='text-success text-sm'>{success}</p>}
            {error && <p className='text-error text-sm'>{error}</p>}

            <div className='form-control mt-4'>
              <button
                type='submit'
                className='btn btn-primary text-white hover:text-neutral hover:btn-accent transition-all duration-400 ease-in-out  w-full'
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
