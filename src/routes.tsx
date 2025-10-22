import Layout from '@/components/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';
import TeamPage from '@/pages/TeamPage';
import SignInPage from '@/pages/auth/SignInPage'

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
  {
    path: '/auth',
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children: [
      {path: 'signin', element: <SignInPage/>}
    ]
  }
];

export default routes;
