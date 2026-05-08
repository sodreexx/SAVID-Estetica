import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import { ServicesPage } from './components/ServicesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/servicos',
    Component: ServicesPage,
  },
  {
    path: '*',
    Component: HomePage,
  },
]);
