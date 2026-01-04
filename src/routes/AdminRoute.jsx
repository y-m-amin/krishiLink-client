import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate('/login', { state: { from: location.pathname } });
      else if (role !== 'admin') navigate('/dashboard');
    }
  }, [user, loading, role, navigate, location]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user || role !== 'admin') return null;

  return children;
};

export default AdminRoute;
