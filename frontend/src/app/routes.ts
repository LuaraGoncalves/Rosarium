import { createBrowserRouter } from 'react-router';
import { homeRoutes } from '../features/home/routes';
import { authRoutes } from '../features/auth/routes';
import { rosarioRoutes } from '../features/rosario/routes';
import { novenasRoutes } from '../features/novenas/routes';
import { oracoesRoutes } from '../features/oracoes/routes';
import { breviarioRoutes } from '../features/breviario/routes';
import { liturgiaRoutes } from '../features/liturgia/routes';
import { santosRoutes } from '../features/santos/routes';
import { errorRoutes } from '../features/erros/routes';

export const router = createBrowserRouter([
  ...homeRoutes,
  ...authRoutes,
  ...rosarioRoutes,
  ...novenasRoutes,
  ...oracoesRoutes,
  ...breviarioRoutes,
  ...liturgiaRoutes,
  ...santosRoutes,
  ...errorRoutes,
]);
