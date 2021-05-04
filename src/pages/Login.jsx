import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { LOGIN } from '../graphql/mutations';
import { useForm } from '../hooks/useForm';
import { useAuthContext } from '../context/auth';
const initState = {
  username: '',
  password: '',
};

const Login = () => {
  const { login } = useAuthContext();
  const [loginUser] = useMutation(LOGIN);

  const submit = () => {
    loginUser({
      variables: { ...values },
    })
      .then((res) => {
        login(res.data.login);
        history.push('/');
      })
      .catch((error) => {
        setErrors(error.graphQLErrors[0].extensions.exception.errors);
      });
  };
  const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
    initState,
    submit
  );
  const history = useHistory();

  return (
    <div
      style={{
        width: '500px',
        margin: 'auto',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          type='text'
          name='username'
          error={Boolean(errors?.username)}
          value={values.username}
          onChange={handleChange}
        />

        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          error={Boolean(errors?.password)}
          onChange={handleChange}
        />

        <Button type='submit' primary>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
