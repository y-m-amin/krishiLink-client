import { useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';


const DashboardLayout = () => {
 
  const navigate = useNavigate();

 const { user, loading, role } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

          <NavLink to="/" className="btn btn-sm btn-outline">
            Back to Home
          </NavLink>
        </div>

        {/* simple tab nav */}
        <div className="tabs tabs-boxed bg-base-100 mb-4">
            {role === 'user' && (
  <NavLink
    to="/dashboard"
    end
    className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
  >
    Overview
  </NavLink>
)}
    {role === 'admin' && (
    <>
    <NavLink
    to="/dashboard/admin"
    end
    className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
  >
    Overview
  </NavLink>
        <NavLink to="/dashboard/admin/users" className={({isActive}) => `tab ${isActive ? 'tab-active' : ''}`}>Users</NavLink>
        <NavLink to="/dashboard/admin/crops" className={({isActive}) => `tab ${isActive ? 'tab-active' : ''}`}>Crops</NavLink>
        <NavLink to="/dashboard/admin/reports" className={({isActive}) => `tab ${isActive ? 'tab-active' : ''}`}>Reports</NavLink>
    </>
    )}


</div>

        <div className="bg-base-100 rounded-xl shadow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
