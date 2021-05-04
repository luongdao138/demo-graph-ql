import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import ToolTip from './ToolTip';

const Post = ({ post }) => {
  const { user } = useAuthContext();
  return (
    <Card fluid>
      <Card.Content>
        <ToolTip
          header={post.username}
          trigger={
            <Image
              as={Link}
              to={`/profile/${post.username}`}
              floated='right'
              size='mini'
              avatar
              src={
                post.user.id === user?.id
                  ? user.avatar
                    ? user.avatar
                    : '/images/no-img.png'
                  : post.user.avatar
                  ? post.user.avatar
                  : '/images/no-img.png'
              }
            />
          }
          content={`${post.username} has been a member since ${moment(
            post.user.createdAt
          ).format('MMMM Do YYYY')}`}
        />
        <Card.Header as={Link} to={`/profile/${post.username}`}>
          {post.username}
        </Card.Header>
        <Card.Meta as={Link} to={`/post/${post.id}`}>
          {moment(post.createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          post={{
            id: post.id,
            likeCount: post.likeCount,
            likes: post.likes,
            username: post.username,
          }}
          user={user}
        />

        <ToolTip
          content='Comment on post'
          trigger={
            <Button labelPosition='right' as={Link} to={`/post/${post.id}`}>
              <Button color='blue' basic size='tiny'>
                <Icon name='comment' />
                {/* Comment */}
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {post.commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === post.username && (
          <DeleteButton postId={post.id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default Post;
