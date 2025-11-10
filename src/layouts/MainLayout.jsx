import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router';

const MainLayout = () => {
  const location = useLocation();
  const is404 = location.pathname === '/404';

  if (is404) return <Outlet />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
