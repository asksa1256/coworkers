import AuthRoute from '@/components/feature/auth/AuthRoute';
import PrivateRoute from '@/components/feature/auth/PrivateRoute';
import BoardLayout from '@/components/layout/BoardLayout';
import Layout from '@/components/layout/Layout';
import SignInPage from '@/pages/auth/SignInPage';
import BoardPage from '@/pages/board/BoardPage';
import CreateTeamPage from '@/pages/CreateTeamPage';
import ErrorPage from '@/pages/ErrorPage';
import JoinTeamPage from '@/pages/JoinTeamPage';
import LandingPage from '@/pages/LandingPage';
import TaskListPage from '@/pages/TaskListPage';
import TeamPage from '@/pages/TeamPage';
import type { ReactNode } from 'react';
import KakaoRedirectPage from './pages/auth/KakaoRedirectPage';
import KakaoSignUpPage from './pages/auth/KakaoSignUpPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SignUpPage from './pages/auth/SignUpPage';
import ArticleDetailPage from './pages/board/ArticleDetailPage';
import UpdateTeamPage from './pages/UpdateTeamPage';

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
        path: '/create-team',
        element: withPrivate(<CreateTeamPage />),
      },
      {
        path: '/join-team',
        element: withPrivate(<JoinTeamPage />),
      },
      {
        path: '/:groupId',
        children: [
          {
            index: true,
            element: withPrivate(<TeamPage />),
          },
          {
            path: 'details/:taskListId',
            element: withPrivate(<TaskListPage />),
          },
          {
            path: 'update-team',
            element: withPrivate(<UpdateTeamPage />),
          },
        ],
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/auth',
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
    ],
  },
  {
    path: '/board',
    element: <BoardLayout />,
    children: [
      {
        index: true,
        element: <BoardPage />,
      },
      {
        path: ':articleId',
        element: withPrivate(<ArticleDetailPage />),
      },
    ],
  },
];

export default routes;
