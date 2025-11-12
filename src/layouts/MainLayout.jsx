import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const is404 = location.pathname === '/404';

  if (is404) return <Outlet />;

  return (
    <>
      <div className='sticky top-0 z-50 bg-base-100 shadow-sm'>
        <Navbar />
      </div>
      <main className='min-h-screen '>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
