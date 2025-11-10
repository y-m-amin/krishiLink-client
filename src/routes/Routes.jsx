import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home'; 
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllCrops from '../pages/AllCrops';
import CropDetails from '../pages/CropDetails';
import PrivateRoute from './PrivateRoute';
import { API_BASE_URL } from '../config';
import AddCrop from '../pages/AddCrop';
import MyPosts from '../pages/MyPosts';
import MyInterests from '../pages/MyInterests';
import Profile from '../pages/Profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/crops', element: <AllCrops /> },
      
      // Private routes go here like:
      { path: '/crops/:id', element: <PrivateRoute><CropDetails /></PrivateRoute>,loader: async ({ params }) => {
    const res = await fetch(`${API_BASE_URL}/crops/${params.id}`);
    if (!res.ok) throw new Error('Crop not found');
    return res.json();
  } },
  {
  path: '/add-crop',
  element: (
    <PrivateRoute>
      <AddCrop />
    </PrivateRoute>
  )
},
{
  path: '/my-posts',
  element: (
    <PrivateRoute>
      <MyPosts />
    </PrivateRoute>
  )
},
{
  path: '/my-interests',
  element: (
    <PrivateRoute>
      <MyInterests />
    </PrivateRoute>
  )
},
{
  path: '/profile',
  element: (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  )
}
    ]
  },
  { path: '*', element: <h2>404 Page Not Found</h2> }
]);

export default router;
