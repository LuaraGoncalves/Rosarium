import { CalendarioLiturgicoPage } from './pages/CalendarioLiturgicoPage';
import { LiturgiaHojePage } from './pages/LiturgiaHojePage';
import { LiturgiaPage } from './pages/LiturgiaPage';

export const liturgiaRoutes = [
  {
    path: '/liturgia',
    Component: LiturgiaPage,
  },
  {
    path: '/liturgia/hoje',
    Component: LiturgiaHojePage,
  },
  {
    path: '/liturgia/calendario',
    Component: CalendarioLiturgicoPage,
  },
];
