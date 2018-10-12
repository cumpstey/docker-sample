import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';

import { routes } from './configuration';
import reducers from './reducers';

import authHandler from './middleware/authHandler';
import errorHandler from './middleware/errorHandler';
//import modalHandler from '../middleware/modalHandler';
//import dropdownHandler from '../middleware/dropdownHandler';
// import paginationHandler from '../middleware/paginationHandler';
// import tableSortHandler from '../middleware/tableSortHandler';
// import homeRedirectHandler from '../middleware/homeRedirectHandler';
import formHandler from './middleware/formHandler';

import App from './components/App';
// import AccountPage from './components/AccountPage';
// import AccountSettings from './containers/AccountSettings';
// import AccountMenu from './containers/AccountMenu';
// import AccountSystem from './containers/AccountSystem';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import VerifyEmailPage from './containers/VerifyEmailPage';
// import LoginPage from './components/LoginPage2';
// import ErrorPage from './containers/ErrorPage';
// import ForgotPasswordPage from './containers/ForgotPasswordPage';
// import ResetPasswordPage from './containers/ResetPasswordPage';
// import CreatePasswordPage from './containers/CreatePasswordPage';
import DashboardPage from './containers/DashboardPage';
import AccountPage from './containers/AccountPage';

// TODO: This was called on router.onUpdate, but I believe this no longer exists.
// Should move into the page components maybe.
function scrollTop() {
  if (this.state.location.action === 'PUSH') window.scrollTo(0, 0);
}

const rootElement = document.getElementById('root');

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      authHandler,
      errorHandler,
      formHandler,
      // ... other middlewares ...
    )
  )
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <App>
      <Route path={routes.dashboard} exact component={DashboardPage} />
      <Route path={routes.login} component={LoginPage} />
      <Route path={routes.register} component={RegisterPage} />
      <Route path={routes.verifyEmail} component={VerifyEmailPage} />
      <Route path={routes.account} component={AccountPage} />
        {/* <Route path="error" component={ErrorPage} />
        <Route path="sign-up/:token" component={CreatePasswordPage} />
        <Route path="forgot-password" component={ForgotPasswordPage} />
        <Route path="password/reset/:token" component={ResetPasswordPage} />
        
        <Route path="account" component={AccountPage}>
          <IndexRoute components={{ menu: AccountMenu, content: AccountSettings }} />
          <Route path="settings" components={{ menu: AccountMenu, content: AccountSettings }} />
          <Route path="system" components={{ menu: AccountMenu, content: AccountSystem }} />
        </Route>
        <Route path="admin/users" component={UsersPage} /> */}
      </App>
    </ConnectedRouter>
  </Provider>,
  rootElement,
);
