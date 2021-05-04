import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import { useAuthContext } from './context/auth';
import LoggedInProtectedRoute from './helpers/LoggeInProtectedRoute';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Container>
        <MenuBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <LoggedInProtectedRoute path='/login' user={user} loggedInPath='/'>
            <Login />
          </LoggedInProtectedRoute>
          <LoggedInProtectedRoute path='/register' user={user} loggedInPath='/'>
            <Register />
          </LoggedInProtectedRoute>
          <Route exact path='/post/:id' component={PostDetail} />
          <Route path='/profile/:username' component={Profile} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
