import AuthRoute from '@/components/feature/auth/AuthRoute';
import PrivateRoute from '@/components/feature/auth/PrivateRoute';
import Layout from '@/components/layout/Layout';
import CreateTeamPage from '@/pages/CreateTeamPage';
import ErrorPage from '@/pages/ErrorPage';
import JoinTeamPage from '@/pages/JoinTeamPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';
import TeamPage from '@/pages/TeamPage';
import SignInPage from '@/pages/auth/SignInPage';
import BoardPage from '@/pages/board/BoardPage';
import type { ReactNode } from 'react';
import KakaoRedirectPage from './pages/auth/KakaoRedirectPage';
import KakaoSignUpPage from './pages/auth/KakaoSignUpPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
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
      { index: true, element: <LandingPage /> },
      { path: '/', element: <LandingPage /> },
      {
        path: '/create-team',
        element: withPrivate(<CreateTeamPage />),
      },
      {
        path: '/join-team',
        element: withPrivate(<JoinTeamPage />),
      },
      {
        path: '/list/:groupId',
        element: withPrivate(<ListPage />),
      },
      {
        path: '/:groupId',
        element: withPrivate(<TeamPage />),
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
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
  {
    path: '/oauth',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'kakao',
        element: withAuth(<KakaoRedirectPage />),
      },
      {
        path: 'signup/kakao',
        element: withAuth(<KakaoSignUpPage />),
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

  // user pages
  {
    path: '/user',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'reset-password',
        element: withPrivate(<ResetPasswordPage />),
      },
    ],
  },
];

export default routes;
