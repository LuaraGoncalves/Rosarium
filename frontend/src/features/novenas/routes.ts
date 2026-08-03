import { NovenaDetalhe } from './pages/NovenaDetalhe';
import { NovenaDia } from './pages/NovenaDia';
import { NovenasPage } from './pages/NovenasPage';

export const novenasRoutes = [
  {
    path: '/novenas',
    Component: NovenasPage,
  },
  {
    path: '/novenas/:id',
    Component: NovenaDetalhe,
  },
  {
    path: '/novenas/:id/dia/:dia',
    Component: NovenaDia,
  },
];
