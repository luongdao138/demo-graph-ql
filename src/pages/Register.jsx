import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';
import { REGISTER } from '../graphql/mutations';
import { useForm } from '../hooks/useForm';

const initState = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
};

const Register = () => {
  const history = useHistory();
  const { login } = useAuthContext();
  const [addUser] = useMutation(REGISTER);
  const submit = () => {
    addUser({
      variables: { ...values },
    })
      .then((res) => {
        login(res.data.register);
        history.push('/');
      })
      .catch((error) =>
        setErrors(error.graphQLErrors[0].extensions.exception.errors)
      );
  };
  const { values, errors, setErrors, handleChange, handleSubmit } = useForm(
    initState,
    submit
  );

  return (
    <div
      style={{
        width: '500px',
        margin: 'auto',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
          label='Email'
          placeholder='Email'
          type='text'
          name='email'
          error={Boolean(errors?.email)}
          value={values.email}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          type='password'
          name='confirmPassword'
          error={Boolean(errors?.confirmPassword)}
          value={values.confirmPassword}
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

export default Register;
