import { Login } from './components/Login/Login';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './constants/routerConstants';
import { Registration } from './components/Login/Registration';
import { RouteProps } from 'react-router-dom';
import { Order } from './pages/Order/Order';

// export const authRouters = [
//     {
//         path: ORDER_ROUTE,
//         Component: Order
//     },

// ]

export const publicRouters: RouteProps[] = [
  {
    path: LOGIN_ROUTE,
    component: Login,
    exact: true,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Registration,
    exact: true,
  },
  { path: '/', component: Order },
];
