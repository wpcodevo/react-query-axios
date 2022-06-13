import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getMeFn } from '../api/authApi';
import { useStateContext } from '../context';
import FullScreenLoader from './FullScreenLoader';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();
  const stateContext = useStateContext();

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery('authUser', getMeFn, {
    retry: 1,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireUser;
