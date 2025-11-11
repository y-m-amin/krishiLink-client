import { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser().catch(console.error);
  };

  // 🔹 Common links
  const links = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/crops'>All Crops</Link>
      </li>

      {user ? (
        <>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/add-crop'>Add Crop</Link>
          </li>
          <li>
            <Link to='/my-posts'>My Posts</Link>
          </li>
          <li>
            <Link to='/my-interests'>My Interests</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      {/* Left side - logo and user image */}
      <div className='navbar-start'>
        {/* Mobile dropdown */}
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow'
          >
            {links}
          </ul>
        </div>

        {/* User image + logo */}
        <div className='flex items-center gap-2'>
          <Link to='/' className='btn btn-ghost text-xl font-bold'>
            🌾 KrishiLink
          </Link>
        </div>
      </div>

      {/* Center - main nav links (for large screens) */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{links}</ul>
      </div>

      {/* Right side - login/logout button */}
      <div className='navbar-end flex-row gap-6'>
        <label className='toggle text-base-content'>
          <input type='checkbox' value='forest' className='theme-controller' />

          <svg
            aria-label='sun'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='12' cy='12' r='4'></circle>
              <path d='M12 2v2'></path>
              <path d='M12 20v2'></path>
              <path d='m4.93 4.93 1.41 1.41'></path>
              <path d='m17.66 17.66 1.41 1.41'></path>
              <path d='M2 12h2'></path>
              <path d='M20 12h2'></path>
              <path d='m6.34 17.66-1.41 1.41'></path>
              <path d='m19.07 4.93-1.41 1.41'></path>
            </g>
          </svg>

          <svg
            aria-label='moon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2'
              fill='none'
              stroke='currentColor'
            >
              <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
            </g>
          </svg>
        </label>
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt='User'
            className='w-8 h-8 rounded-full object-cover'
          />
        )}
        {user ? (
          <button onClick={handleLogout} className='btn btn-error btn-sm'>
            Logout
          </button>
        ) : (
          <Link to='/login' className='btn btn-primary btn-sm '>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
