import AuthRoute from '@/components/feature/auth/AuthRoute';
import PrivateRoute from '@/components/feature/auth/PrivateRoute';
import Layout from '@/components/layout/Layout';
import ErrorPage from '@/pages/ErrorPage';
import LandingPage from '@/pages/LandingPage';
import ListPage from '@/pages/ListPage';
import TeamPage from '@/pages/TeamPage';
import SignInPage from '@/pages/auth/SignInPage';
import BoardPage from '@/pages/board/BoardPage';
import PostDetailPage from './pages/board/PostDetailPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        path: '/list/:groupId',
        element: (
          <PrivateRoute>
            <ListPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/:teamId',
        element: (
          <PrivateRoute>
            <TeamPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signin',
        element: (
          <AuthRoute>
            <SignInPage />
          </AuthRoute>
        ),
      },
    ],
  },
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
        element: (
          <PrivateRoute>
            <PostDetailPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
