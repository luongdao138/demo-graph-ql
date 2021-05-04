import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';
import { DELETE_POST } from '../graphql/mutations';
import { FETCH_POSTS } from '../graphql/queries';

const DeleteButton = ({ postId, cb }) => {
  const [open, setOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST);
  const { logout } = useAuthContext();
  const history = useHistory();

  const handleDeletePost = () => {
    deletePost({
      variables: {
        postId,
      },
      refetchQueries: [
        {
          query: FETCH_POSTS,
        },
      ],
    })
      .then((res) => {
        setOpen(false);
        if (cb) cb();
      })
      .catch((error) => {
        logout();
        history.push('/login');
      });
  };

  return (
    <>
      <Popup
        content='Delete comment'
        inverted
        trigger={
          <Button
            as='div'
            color='red'
            size='tiny'
            floated='right'
            onClick={() => setOpen(true)}
          >
            <Icon name='trash' />
          </Button>
        }
      />
      <Confirm
        open={open}
        cancelButton='Cancel'
        confirmButton='Delete'
        onCancel={() => setOpen(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
};

export default DeleteButton;
