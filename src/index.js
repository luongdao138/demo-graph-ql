import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloContext from './context/apollo';

ReactDOM.render(
  <ApolloContext>
    <App />
  </ApolloContext>,
  document.getElementById('root')
);
