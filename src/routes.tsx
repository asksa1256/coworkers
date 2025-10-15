import Layout from '@/components/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/list/:groupId', element: <ListPage /> },
    ],
  },
];

export default routes;
