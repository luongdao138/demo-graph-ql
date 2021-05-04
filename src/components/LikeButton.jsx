import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Modal, List, Image } from 'semantic-ui-react';
import { LIKE_POST } from '../graphql/mutations';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import ToolTip from './ToolTip';
import moment from 'moment';
import { GET_NOTS } from '../graphql/queries';

const LikeButton = ({ post: { id, likes, likeCount, username }, user }) => {
  const [liked, setLiked] = useState(false);
  const [likePostFunc] = useMutation(LIKE_POST);
  const { logout } = useAuthContext();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const likePost = () => {
    likePostFunc({
      variables: {
        postId: id,
      },
      refetchQueries: [{ query: GET_NOTS, variables: { username } }],
    }).catch((error) => {
      logout();
      history.push('/login');
    });
  };

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username))
      setLiked(true);
    else setLiked(false);
  }, [user, likes]);

  const icon = user ? (
    liked ? (
      <Button color='teal' onClick={likePost} size='tiny'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic onClick={likePost} size='tiny'>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button color='teal' basic as={Link} to='/login' size='tiny'>
      <Icon name='heart' />
    </Button>
  );

  return (
    <>
      <ToolTip
        content='Like post'
        trigger={
          <Button as='div' labelPosition='right'>
            {icon}
            <Label
              onClick={() => {
                if (!likes || likes.length === 0) return;
                setOpen(true);
              }}
              basic
              color='teal'
              pointing='left'
            >
              {likeCount}
            </Label>
          </Button>
        }
      />
      <Modal open={open} onClose={() => setOpen(false)} closeIcon>
        <Modal.Header>Post Likes</Modal.Header>
        <Modal.Content>
          <List>
            {likes.map((like) => {
              return (
                <List.Item key={like.id} style={{ marginBottom: '12px' }}>
                  <Image
                    avatar
                    src={
                      like.user && like.user.avatar
                        ? like.user.avatar
                        : '/images/no-img.png'
                    }
                  />
                  <List.Content>
                    <List.Header as='a'>{like.username}</List.Header>
                    <List.Description>
                      {moment(like.createdAt).fromNow()}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default LikeButton;
