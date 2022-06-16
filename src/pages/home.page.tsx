import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: '#2363eb', minHeight: '100vh', pt: '5rem' }}
    >
      <Box
        maxWidth='md'
        sx={{
          backgroundColor: '#ece9e9',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: '#1f1e1e', fontWeight: 500 }}
        >
          Home Page
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
