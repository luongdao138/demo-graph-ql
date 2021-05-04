import React, { useContext, useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTS, GET_USER } from '../graphql/queries';
import { useHistory } from 'react-router-dom';

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
    case 'GET_NOTS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'NEW_NOT':
      return {
        ...state,
        user: {
          ...state.user,
          activeNots: state.user.activeNots + 1,
        },
        notifications: [action.payload, ...state.notifications],
      };
    case 'RESET_NOT':
      return {
        ...state,
        user: {
          ...state.user,
          activeNots: 0,
        },
      };

    default:
      return state;
  }
};
const initState = {
  user: null,
  notifications: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const { data } = useQuery(GET_USER);
  const history = useHistory();
  const { data: notifications } = useQuery(GET_NOTS, {
    variables: {
      username: state.user?.username,
    },
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'LOGIN', payload: data.getUser });
    }
  }, [data]);

  useEffect(() => {
    if (notifications) {
      dispatch({ type: 'GET_NOTS', payload: notifications.getNots });
    }
  }, [notifications]);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const updateAvatar = (url) => {
    dispatch({ type: 'CHANGE_AVATAR', payload: url });
  };

  const newNot = (data) => {
    dispatch({ type: 'NEW_NOT', payload: data });
  };

  const resetNotification = () => {
    dispatch({ type: 'RESET_NOT' });
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        notifications: state.notifications,
        login,
        logout,
        updateAvatar,
        newNot,
        resetNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
