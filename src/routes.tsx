import AuthRoute from '@/components/feature/auth/AuthRoute';
import PrivateRoute from '@/components/feature/auth/PrivateRoute';
import Layout from '@/components/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';
import TeamPage from '@/pages/TeamPage';
import SignInPage from '@/pages/auth/SignInPage';
import BoardPage from '@/pages/board/BoardPage';
import type { ReactNode } from 'react';
import SignUpPage from './pages/auth/SignUpPage';
import PostDetailPage from './pages/board/PostDetailPage';

const withPrivate = (element: ReactNode) => {
  return <PrivateRoute>{element}</PrivateRoute>;
};

const withAuth = (element: ReactNode) => {
  return <AuthRoute>{element}</AuthRoute>;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        path: '/list/:groupId',
        element: withPrivate(<ListPage />),
      },
      {
        path: '/:teamId',
        element: withPrivate(<TeamPage />),
      },
    ],
  },

  // auth pages
  {
    path: '/auth',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signin',
        element: withAuth(<SignInPage />),
      },
      {
        path: 'signup',
        element: withAuth(<SignUpPage />),
      },
    ],
  },

  // board pages
  {
    path: '/board',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BoardPage />,
      },
      {
        path: ':postId',
        element: withPrivate(<PostDetailPage />),
      },
    ],
  },
];

export default routes;
