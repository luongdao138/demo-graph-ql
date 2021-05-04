import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloContext from './context/apollo';
import { AuthProvider } from './context/auth';

ReactDOM.render(
  <ApolloContext>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloContext>,
  document.getElementById('root')
);
