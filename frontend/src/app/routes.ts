import { Fragment, createElement, useEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { homeRoutes } from '../features/home/routes';
import { authRoutes } from '../features/auth/routes';
import { rosarioRoutes } from '../features/rosario/routes';
import { novenasRoutes } from '../features/novenas/routes';
import { oracoesRoutes } from '../features/oracoes/routes';
import { breviarioRoutes } from '../features/breviario/routes';
import { liturgiaRoutes } from '../features/liturgia/routes';
import { santosRoutes } from '../features/santos/routes';
import { errorRoutes } from '../features/erros/routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function RootRoute() {
  return createElement(
    Fragment,
    null,
    createElement(ScrollToTop),
    createElement(Outlet)
  );
}

export const router = createBrowserRouter([
  {
    Component: RootRoute,
    children: [
      ...homeRoutes,
      ...authRoutes,
      ...rosarioRoutes,
      ...novenasRoutes,
      ...oracoesRoutes,
      ...breviarioRoutes,
      ...liturgiaRoutes,
      ...santosRoutes,
      ...errorRoutes,
    ],
  },
]);
