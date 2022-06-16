import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getMeFn } from '../api/authApi';
import { useStateContext } from '../context';
import FullScreenLoader from '../components/FullScreenLoader';
import React from 'react';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const stateContext = useStateContext();

  const query = useQuery(['authUser'], () => getMeFn(), {
    enabled: !!cookies.logged_in,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  if (query.isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
