import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { useStateContext } from '../context';
import { useMutation } from 'react-query';
import { logoutUserFn } from '../api/authApi';
import CreatePost from './post/create-post';
import PostModal from './modals/post.modal';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: #222;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const { mutate: logoutUser, isLoading } = useMutation(
    async () => await logoutUserFn(),
    {
      onSuccess: (data) => {
        window.location.href = '/login';
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: 'top-right',
          });
        }
      },
    }
  );

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
                <>
                  <LoadingButton
                    loading={isLoading}
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </LoadingButton>
                  <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                    Logout
                  </LoadingButton>
                  <LoadingButton onClick={() => setOpenPostModal(true)}>
                    Create Post
                  </LoadingButton>
                </>
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
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      >
        <CreatePost setOpenPostModal={setOpenPostModal} />
      </PostModal>
    </>
  );
};

export default Header;
