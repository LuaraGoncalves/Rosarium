import { NotFound } from './pages/NotFound';

export const errorRoutes = [
  {
    path: '*',
    Component: NotFound,
  },
];
