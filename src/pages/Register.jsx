import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { API_BASE_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passValid = /(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
    if (!passValid) {
      return setError(
        'Password must contain uppercase, lowercase and be at least 6 characters long'
      );
    }

    try {
      await createUser(email, password);
      await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photo }),
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL || '',
      };

      await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row'>
        {/* Left side text */}
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold text-primary'>Register Now!</h1>
          <p className='py-6 max-w-md text-gray-600'>
            Join our growing agricultural marketplace to connect directly with
            farmers and buyers. Create your account to list crops, send orders,
            and grow your agri-network effortlessly.
          </p>
        </div>

        {/* Register card */}
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <form onSubmit={handleRegister} className='card-body'>
            <fieldset className='fieldset space-y-3'>
              <label className='label font-semibold'>Full Name</label>
              <input
                name='name'
                type='text'
                placeholder='Your Name'
                className='input input-bordered w-full'
                required
              />

              <label className='label font-semibold'>Email</label>
              <input
                name='email'
                type='email'
                placeholder='Email'
                className='input input-bordered w-full'
                required
              />

              <label className='label font-semibold'>Photo URL</label>
              <input
                name='photo'
                type='text'
                placeholder='Profile Photo URL'
                className='input input-bordered w-full'
              />

              <label className='label font-semibold'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                className='input input-bordered w-full'
                required
              />

              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <button type='submit' className='btn btn-neutral w-full mt-2'>
                Register
              </button>

              {/* Google Register */}
              <button
                type='button'
                onClick={handleGoogleRegister}
                className='btn btn-outline w-full mt-2'
              >
                <img
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  alt='Google'
                  className='w-5 h-5 mr-2'
                />
                Register with Google
              </button>

              {/* Login link */}
              <p className='text-center text-sm mt-4'>
                Already a user?{' '}
                <Link to='/login' className='link link-primary font-semibold'>
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
