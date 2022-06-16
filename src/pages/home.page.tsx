import { Box, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getAllPostsFn } from '../api/postApi';
import FullScreenLoader from '../components/FullScreenLoader';
import PostItem from '../components/post/post.component';
import Message from '../components/Message';

const HomePage = () => {
  const {
    isLoading,
    isError,
    error,
    data: posts,
  } = useQuery('posts', () => getAllPostsFn(), {
    select: (data) => data.data.posts,
  });

  useEffect(() => {
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: '#2363eb', minHeight: '100vh' }}
    >
      {posts?.length === 0 ? (
        <Box maxWidth='sm' sx={{ mx: 'auto', py: '5rem' }}>
          <Message type='info' title='Info'>
            No posts at the moment
          </Message>
        </Box>
      ) : (
        <Grid
          container
          rowGap={5}
          maxWidth='lg'
          sx={{ margin: '0 auto', pt: '5rem' }}
        >
          {posts?.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
