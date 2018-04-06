import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
import Auth0 from './helpers/auth0';
import { generateRequireSignInWrapper } from 'redux-token-auth';

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
});

const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/404'}
          component={asyncComponent(() => import('./containers/Page/404'))}
        />
        <Route
          exact
          path={'/500'}
          component={asyncComponent(() => import('./containers/Page/500'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        <Route
          exact
          path={'/forgotpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/forgotPassword'))}
        />
        <Route
          exact
          path={'/resetpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/resetPassword'))}
        />

        <Route
          path="/auth0loginCallback"
          render={props => {
            Auth0.handleAuthentication(props);
          }}
        />
        <Route
          path="/dashboard"
          component={requireSignIn(App)}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
}))(PublicRoutes);
