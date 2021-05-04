import { Redirect, Route } from 'react-router-dom';

const LoggedInProtectedRoute = ({ children, user, loggedInPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return children;

        return (
          <Redirect
            to={{
              pathname: loggedInPath,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default LoggedInProtectedRoute;
