import { BreviarioHoraPage } from './pages/BreviarioHoraPage';
import { BreviarioPage } from './pages/BreviarioPage';

export const breviarioRoutes = [
  {
    path: '/breviario',
    Component: BreviarioPage,
  },
  {
    path: '/breviario/:hora',
    Component: BreviarioHoraPage,
  },
];
