import { useMutation } from '@apollo/client';
import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { CREATE_POST } from '../graphql/mutations';
import { FETCH_POSTS } from '../graphql/queries';
import { useForm } from '../hooks/useForm';
const initState = {
  body: '',
};

const PostForm = () => {
  const [createPost, { error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: FETCH_POSTS }],
  });

  const submit = () => {
    createPost({
      variables: {
        body: values.body,
      },
    })
      .then((data) => {
        console.log(data);
        setValues(initState);
      })
      .catch((error) => {});
  };
  const { values, setValues, handleChange, handleSubmit } = useForm(
    initState,
    submit
  );

  return (
    <div
      style={{
        width: '500px',
        // margin: 'auto',
      }}
    >
      <h1>Create a post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name='body'
          placeholder='Body'
          value={values.body}
          onChange={handleChange}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form>
      {error && <Message error content={error?.message} />}
    </div>
  );
};

export default PostForm;
