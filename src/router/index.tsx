import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import FullScreenLoader from '../components/FullScreenLoader';
import Layout from '../components/layout';
import RequireUser from '../components/requireUser';

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );

const LoginPage = Loadable(lazy(() => import('../pages/login.page')));
const RegisterPage = Loadable(lazy(() => import('../pages/register.page')));
const HomePage = Loadable(lazy(() => import('../pages/home.page')));
const ProfilePage = Loadable(lazy(() => import('../pages/profile.page')));
const UnauthorizePage = Loadable(
  lazy(() => import('../pages/unauthorize.page'))
);
const EmailVerificationPage = Loadable(
  lazy(() => import('../pages/verifyemail.page'))
);

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'verifyemail',
      element: <EmailVerificationPage />,
      children: [
        {
          path: ':verificationCode',
          element: <EmailVerificationPage />,
        },
      ],
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'profile',
      element: <RequireUser allowedRoles={['user', 'admin']} />,
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: 'unauthorized',
      element: <UnauthorizePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
