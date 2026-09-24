import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppStartupLoader } from '../shared/components/AppStartupLoader';

export default function App() {
  return (
    <ThemeProvider defaultTheme="brown" storageKey="vite-ui-theme">
      <AppStartupLoader>
        <RouterProvider router={router} />
      </AppStartupLoader>
    </ThemeProvider>
  );
}
