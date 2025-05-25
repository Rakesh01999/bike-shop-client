
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Allproduct from '../pages/Allproduct';
import SingleProduct from '../pages/SingleProduct';
import Buynow from '../pages/Buynow';
import Verify from '../pages/Verify';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard/Dashboard';
import { routeGenerator } from '../utils/routesGenerator';
import { adminChildren } from './Adminroutes';
import { userChildren } from './UserRoutes';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';

const router = createBrowserRouter([
   {
      path:'/',
      element:<App/>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
           path:'about',
           element:<About/>
        },
        {
           path:'contact',
           element:<Contact/>
        },
        {
           path:'blog',
           element:<Blog/>
        },
        {
            path:'register',
            element:<Register></Register>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'allproduct',
            element:<Allproduct/>
        },
        {
            // path:`car-detail/:id`,
            path:`products/:id`,
            element:<SingleProduct/>
        },
        {
            path:`checkout/:id`,
            element:<ProtectedRoute><Buynow/></ProtectedRoute>
        },
        {
            path:'order/verify',
            element:<ProtectedRoute><Verify/></ProtectedRoute>
        }
      ]
   },
   {
     path:'/dashboard',
     element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
     children:routeGenerator(adminChildren)
   },
   {
     path:'/dashboard',
     element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
     children:routeGenerator(userChildren)
   }
]);

export default router;
