import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';
import { CREATE_COMMENT } from '../graphql/mutations';
import { useForm } from '../hooks/useForm';

const initState = {
  body: '',
};

const CommentForm = ({ postId }) => {
  const { logout } = useAuthContext();
  const history = useHistory();
  const submit = () => {
    createComment({
      variables: {
        postId,
        body: values.body,
      },
    })
      .then(() => {
        setValues(initState);
      })
      .catch((error) => {
        if (error) {
          logout();
          history.push('/login');
        }
      });
  };
  const { values, setValues, handleChange, handleSubmit } = useForm(
    initState,
    submit
  );
  const [createComment] = useMutation(CREATE_COMMENT);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name='body'
        placeholder='Write your comment...'
        onChange={handleChange}
        value={values.body}
      />
      <Button type='submit' color='teal' disabled={values.body.trim() === ''}>
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
