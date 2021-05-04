import { useQuery } from '@apollo/client';
import moment from 'moment';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import { GET_SINGLE_POST } from '../graphql/queries';
import { useAuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuthContext();
  const { data, loading } = useQuery(GET_SINGLE_POST, {
    variables: {
      postId: id,
    },
  });

  if (loading) {
    return <h4>Loading post...</h4>;
  } else {
    const { getPostById: post } = data;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={post.user.avatar ? post.user.avatar : '/images/no-img.png'}
              size='small'
              floated='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{post.body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton
                  user={user}
                  post={{
                    id: post.id,
                    likeCount: post.likeCount,
                    likes: post.likes,
                  }}
                />
                <Button as='div' labelPosition='right' onClick={() => {}}>
                  <Button basic color='blue'>
                    <Icon name='comment' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {post.commentCount}
                  </Label>
                </Button>
                {user && user.username === post.username && (
                  <DeleteButton
                    postId={post.id}
                    cb={() => {
                      history.push('/');
                    }}
                  />
                )}
              </Card.Content>
            </Card>

            <CommentForm postId={post.id} username={post.username} />

            {post.comments.map((comment) => {
              console.log(comment);
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  username={user?.username}
                  postId={post.id}
                />
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default PostDetail;
