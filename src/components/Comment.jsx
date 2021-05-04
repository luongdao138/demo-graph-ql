import { useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useState } from 'react';
import { Confirm, Button, Card, Icon, Image } from 'semantic-ui-react';
import { DELETE_COMMENT } from '../graphql/mutations';
import ToolTip from './ToolTip';

const Comment = ({ comment, username, postId }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [open, setOpen] = useState(false);
  // console.log(comment, username, postId);
  const handleDeleteComment = (commentId) => {
    deleteComment({
      variables: {
        postId,
        commentId,
      },
    })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Card fluid>
        <Image
          src={comment.user.avatar ? comment.user.avatar : '/images/no-img.png'}
          avatar
        />
        <Card.Content>
          {comment?.username === username && (
            <ToolTip
              trigger={
                <Button
                  as='div'
                  color='red'
                  floated='right'
                  size='tiny'
                  onClick={() => setOpen(true)}
                >
                  <Icon name='trash' />
                </Button>
              }
              content='Delete comment'
            />
          )}
          <Card.Header>{comment.username}</Card.Header>
          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          <Card.Description>{comment.body}</Card.Description>
        </Card.Content>
      </Card>
      <Confirm
        open={open}
        cancelButton='Cancel'
        confirmButton='Delete'
        onCancel={() => setOpen(false)}
        onConfirm={() => handleDeleteComment(comment.id)}
      />
    </>
  );
};

export default Comment;
