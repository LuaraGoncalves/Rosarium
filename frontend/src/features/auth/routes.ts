import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const authRoutes = [
  {
    path: '/auth/login',
    Component: LoginPage,
  },
  {
    path: '/auth/register',
    Component: RegisterPage,
  },
];
