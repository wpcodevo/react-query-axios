import { Box, Container, Typography } from '@mui/material';
import { useStateContext } from '../context';

const ProfilePage = () => {
  const stateContext = useStateContext();

  const user = stateContext.state.authUser;

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: '#2363eb',
        minHeight: '100vh',
      }}
    >
      <Box
        maxWidth='lg'
        sx={{
          backgroundColor: '#ece9e9',
          maxHeight: '20rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '2rem',
          mx: 'auto',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#1f1e1e', fontWeight: 500 }}
        >
          Profile Page
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            <strong>Id:</strong> {user?.id}
          </Typography>
          <Typography gutterBottom>
            <strong>Full Name:</strong> {user?.name}
          </Typography>
          <Typography gutterBottom>
            <strong>Email Address:</strong> {user?.email}
          </Typography>
          <Typography gutterBottom>
            <strong>Role:</strong> {user?.role}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
