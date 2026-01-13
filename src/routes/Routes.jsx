import { createBrowserRouter, redirect } from 'react-router';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/About';
import AddCrop from '../pages/AddCrop';
import AllCrops from '../pages/AllCrops';
import CropDetails from '../pages/CropDetails';
import ErrNoCrop from '../pages/ErrNoCrop';
import ErrPage from '../pages/ErrPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyInterests from '../pages/MyInterests';
import MyPosts from '../pages/MyPosts';
import PaymentFailed from '../pages/PaymentFailed';
import PaymentSuccess from '../pages/PaymentSuccess';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import UserDashboard from '../pages/dashboard/UserDashboard';
import AdminCrops from '../pages/dashboard/admin/AdminCrops';
import AdminDashboardHome from '../pages/dashboard/admin/AdminDashboardHome';
import AdminReports from '../pages/dashboard/admin/AdminReports';
import AdminUsers from '../pages/dashboard/admin/AdminUsers';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/crops', element: <AllCrops /> },
      { path: '/about', element: <About /> },

      // Private routes
      {
        path: '/crops/:id',
        element: <CropDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`${API_BASE_URL}/crops/${params.id}`);
          if (!res.ok) {
            throw redirect('/no-crop');
          }
          return res.json();
        },
      },
      {
        path: '/add-crop',
        element: (
          <PrivateRoute>
            <AddCrop />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-posts',
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-interests',
        element: (
          <PrivateRoute>
            <MyInterests />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: '/payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment-failed',
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <UserDashboard /> },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/crops',
        element: (
          <AdminRoute>
            <AdminCrops />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/reports',
        element: (
          <AdminRoute>
            <AdminReports />
          </AdminRoute>
        ),
      },
    ],
  },

  { path: '*', element: <ErrPage /> },
  {
    path: '/no-crop',
    element: <ErrNoCrop />,
  },
]);

export default router;
