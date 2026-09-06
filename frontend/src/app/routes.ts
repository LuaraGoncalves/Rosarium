import { Fragment, createElement, useEffect } from 'react';
import { createBrowserRouter, Link, Outlet, useLocation, useRouteError } from 'react-router';
import { homeRoutes } from '../features/home/routes';
import { rosarioRoutes } from '../features/rosario/routes';
import { novenasRoutes } from '../features/novenas/routes';
import { oracoesRoutes } from '../features/oracoes/routes';
import { breviarioRoutes } from '../features/breviario/routes';
import { liturgiaRoutes } from '../features/liturgia/routes';
import { santosRoutes } from '../features/santos/routes';
import { errorRoutes } from '../features/erros/routes';
import { AppFloatingControls } from '../shared/components/AppFloatingControls';

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
    createElement(AppFloatingControls),
    createElement(Outlet)
  );
}

function RouteErrorFallback() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Algo inesperado aconteceu.';

  return createElement(
    'main',
    { className: 'min-h-screen bg-church-bg px-4 py-16 text-church-text' },
    createElement(
      'div',
      {
        className:
          'mx-auto flex max-w-xl flex-col items-center rounded-[1.5rem] bg-church-bg-secondary p-8 text-center shadow-xl shadow-church-bg-darker/10',
      },
      createElement(
        'p',
        {
          className:
            'mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-church-text-muted',
        },
        'Rosarium'
      ),
      createElement(
        'h1',
        { className: 'mb-4 font-serif text-3xl text-church-accent md:text-4xl' },
        'Nao conseguimos abrir esta parte agora'
      ),
      createElement(
        'p',
        { className: 'mb-6 text-base leading-relaxed text-church-text/80' },
        'A pagina encontrou um dado antigo ou incompleto. Tente recarregar, ou volte para o inicio.'
      ),
      createElement(
        'p',
        {
          className:
            'mb-8 rounded-xl border border-church-border/70 bg-church-bg px-4 py-3 text-sm text-church-text-muted',
        },
        message
      ),
      createElement(
        'div',
        { className: 'flex flex-col gap-3 sm:flex-row' },
        createElement(
          'button',
          {
            type: 'button',
            onClick: () => window.location.reload(),
            className:
              'rounded-full bg-church-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-church-accent-hover',
          },
          'Recarregar'
        ),
        createElement(
          Link,
          {
            to: '/igreja',
            className:
              'rounded-full border border-church-border-hover px-5 py-2.5 text-sm font-semibold text-church-accent transition-colors hover:border-church-accent-hover hover:text-church-accent-hover',
          },
          'Voltar ao inicio'
        )
      )
    )
  );
}

export const router = createBrowserRouter([
  {
    Component: RootRoute,
    errorElement: createElement(RouteErrorFallback),
    children: [
      ...homeRoutes,
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
