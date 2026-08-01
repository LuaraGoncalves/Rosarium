import { SantoDetalhePage } from './pages/SantoDetalhePage';
import { SantosPage } from './pages/SantosPage';

export const santosRoutes = [
  {
    path: '/santos',
    Component: SantosPage,
  },
  {
    path: '/santos/:id',
    Component: SantoDetalhePage,
  },
];
