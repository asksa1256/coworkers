import Layout from '@/components/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';
import TeamPage from '@/pages/TeamPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/list/:groupId', element: <ListPage /> },
      { path: '/:teamId', element: <TeamPage /> },
    ],
  },
];

export default routes;
