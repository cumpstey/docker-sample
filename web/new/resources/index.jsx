import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

import App from './components/App';
// import AccountPage from './components/AccountPage';
// import AccountSettings from './containers/AccountSettings';
// import AccountMenu from './containers/AccountMenu';
// import AccountSystem from './containers/AccountSystem';
import LoginPage from './containers/LoginPage';
// import LoginPage from './components/LoginPage2';
// import ErrorPage from './containers/ErrorPage';
// import ForgotPasswordPage from './containers/ForgotPasswordPage';
// import ResetPasswordPage from './containers/ResetPasswordPage';
// import CreatePasswordPage from './containers/CreatePasswordPage';
import DashboardPage from './containers/DashboardPage';

function scrollTop() {
  if (this.state.location.action === 'PUSH') window.scrollTo(0, 0);
}

const rootElement = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} onUpdate={scrollTop}>
      <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="dashboard" component={DashboardPage} />
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
      </Route>
    </Router>
  </Provider>,
  rootElement,
);
