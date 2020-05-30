import Login from 'pages/Login';
import Console from 'pages/Console';
import NotFound from 'pages/NotFound';

export default [
  {
    id: 'login',
    path: '/login',
    exact: true,
    component: Login
  },
  {
    id: 'console',
    path: '/',
    exact: true,
    component: Console,
  },
  {
    id: 'not-found',
    path: '*',
    component: NotFound,
  }
]