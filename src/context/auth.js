import React, { useContext, useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const Context = React.createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'CHANGE_AVATAR':
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };

    default:
      return state;
  }
};
const initState = {
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const { data, error } = useQuery(GET_USER);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOGIN', payload: data.getUser });
    }
  }, [data]);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateAvatar = (url) => {
    dispatch({ type: 'CHANGE_AVATAR', payload: url });
  };

  return (
    <Context.Provider value={{ user: state.user, login, logout, updateAvatar }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
