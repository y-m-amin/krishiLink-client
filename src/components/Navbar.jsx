import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: 'auto',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const Navbar = () => {
  const { user, signOutUser, role } = useContext(AuthContext);
  const dashboardPath = role === 'admin' ? '/dashboard/admin' : '/dashboard';

  const [cropsOpen, setCropsOpen] = useState(false);
  const cropsTimeoutRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileTimeoutRef = useRef(null);

  const [hoverReady, setHoverReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoverReady(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setProfileOpen(false);
    setHoverReady(false);

    const timer = setTimeout(() => {
      setHoverReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  const openCrops = () => {
    clearTimeout(cropsTimeoutRef.current);
    setCropsOpen(true);
  };

  const closeCrops = () => {
    cropsTimeoutRef.current = setTimeout(() => {
      setCropsOpen(false);
    }, 500);
  };

  const openProfile = () => {
    if (!hoverReady) return;
    clearTimeout(profileTimeoutRef.current);
    setProfileOpen(true);
  };

  const closeProfile = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileOpen(false);
    }, 250);
  };

  const handleLogout = () => {
    signOutUser().catch(console.error);
  };

  const handleThemeChange = (e) => {
    const theme = e.target.checked ? 'sunset' : 'lemonade';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Public links only
  const links = (
    <>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-bold underline underline-offset-4'
              : 'hover:text-primary'
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/crops'
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-bold underline underline-offset-4'
              : 'hover:text-primary'
          }
        >
          All Crops
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-bold underline underline-offset-4'
              : 'hover:text-primary'
          }
        >
          About
        </NavLink>
      </li>

      {!user && (
        <>
          <li>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-bold underline underline-offset-4'
                  : 'hover:text-primary'
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-bold underline underline-offset-4'
                  : 'hover:text-primary'
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='max-w-6xl mx-auto w-full px-4 flex justify-between items-center'>
        {/* LEFT */}
        <div className='navbar-start'>
          {/* Mobile menu */}
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

            <ul className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow'>
              {links}
              {user && (
                <>
                  <li className='menu-title'>My Crops</li>
                  <li>
                    <NavLink to='/add-crop'>Add Crop</NavLink>
                  </li>
                  <li>
                    <NavLink to='/my-posts'>My Posts</NavLink>
                  </li>
                  <li>
                    <NavLink to='/my-interests'>My Interests</NavLink>
                  </li>
                  <li className='menu-title'>Account</li>
                  <li>
                    <NavLink to='/profile'>My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to={dashboardPath}>Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='text-error'>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <NavLink to='/' className='btn btn-ghost text-xl font-bold '>
            Krishi<span className='text-emerald-500 font-inherit'>Link</span>
          </NavLink>
        </div>

        {/* CENTER */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal gap-4'>
            {links}

            {/* My Crops Dropdown */}
            {user && (
              <li
                className='relative'
                onMouseEnter={openCrops}
                onMouseLeave={closeCrops}
              >
                <span className='cursor-pointer font-medium hover:text-primary'>
                  My Crops
                </span>

                <AnimatePresence>
                  {cropsOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      className='absolute top-full left-0 mt-2 w-44 menu bg-base-100 rounded-box shadow-lg z-50'
                    >
                      <li>
                        <NavLink to='/add-crop'>Add Crop</NavLink>
                      </li>
                      <li>
                        <NavLink to='/my-posts'>My Posts</NavLink>
                      </li>
                      <li>
                        <NavLink to='/my-interests'>My Interests</NavLink>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className='navbar-end gap-4'>
          {/* Theme Toggle */}
          <label className='toggle'>
            <input
              type='checkbox'
              onChange={handleThemeChange}
              defaultChecked={localStorage.getItem('theme') === 'sunset'}
            />
            <svg
              aria-label='sun'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <circle cx='12' cy='12' r='4' />
            </svg>
            <svg
              aria-label='moon'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
            </svg>
          </label>

          {/* Profile Dropdown */}
          {user && (
            <div
              className='relative'
              onMouseEnter={openProfile}
              onMouseLeave={closeProfile}
            >
              <img
                src={user.photoURL}
                alt='User'
                className='w-9 h-9 rounded-full object-cover cursor-pointer border'
              />

              <AnimatePresence>
                {profileOpen && (
                  <motion.ul
                    variants={dropdownVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className='absolute right-0 mt-2 w-48 menu bg-base-100 rounded-box shadow-lg z-50'
                  >
                    <li>
                      <NavLink to='/profile'>My Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to={dashboardPath}>Dashboard</NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='text-error font-medium'
                      >
                        Logout
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
