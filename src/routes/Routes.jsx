import { createBrowserRouter, redirect } from 'react-router';
import { API_BASE_URL } from '../config';
import MainLayout from '../layouts/MainLayout';
import AddCrop from '../pages/AddCrop';
import AllCrops from '../pages/AllCrops';
import CropDetails from '../pages/CropDetails';
import ErrNoCrop from '../pages/ErrNoCrop';
import ErrPage from '../pages/ErrPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyInterests from '../pages/MyInterests';
import MyPosts from '../pages/MyPosts';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
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

      // Private routes
      {
        path: '/crops/:id',
        element: (
          <PrivateRoute>
            <CropDetails />
          </PrivateRoute>
        ),
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
    ],
  },
  { path: '*', element: <ErrPage /> },
  {
    path: '/no-crop',
    element: <ErrNoCrop />,
  },
]);

export default router;
