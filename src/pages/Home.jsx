import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS } from '../graphql/queries';
import { Grid, Transition } from 'semantic-ui-react';
import Post from '../components/Post';
import { useAuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

const Home = () => {
  const { loading, data, error } = useQuery(FETCH_POSTS);
  const { user } = useAuthContext();
  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h3 style={{ fontSize: '30px' }}>Recent Posts</h3>
      </Grid.Row>
      <Grid.Row>{user && <PostForm />}</Grid.Row>
      <Grid.Row>
        {loading ? (
          <h4>Loading post...</h4>
        ) : (
          <Transition.Group>
            {data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                <Post post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
