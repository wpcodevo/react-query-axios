import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { useStateContext } from '../context/context';
import { useMutation } from 'react-query';
import { logoutUserFn } from '../api/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: #222;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const {
    mutate: logoutUser,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation(async () => await logoutUserFn());

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login';
    }

    if (isError) {
      if (Array.isArray((error as any).response.data.error)) {
        (error as any).response.data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).response.data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#fff' }}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography
              variant='h6'
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer', color: '#222' }}
            >
              CodevoWeb
            </Typography>
            <Box display='flex' sx={{ ml: 'auto' }}>
              {!user && (
                <>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/register')}
                  >
                    SignUp
                  </LoadingButton>
                  <LoadingButton onClick={() => navigate('/login')}>
                    Login
                  </LoadingButton>
                </>
              )}
              {user && (
                <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                  Logout
                </LoadingButton>
              )}
              {user && user?.role === 'admin' && (
                <LoadingButton
                  sx={{ ml: 2 }}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </LoadingButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
