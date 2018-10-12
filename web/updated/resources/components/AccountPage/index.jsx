import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../LayoutAuthenticated';
import OptionsBar from '../OptionsBar';
import './style.css';

class AccountPage extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchTwoFactorAuth();
  }

  render() {
    return <Layout className="account-page">
      <OptionsBar>
        <p>My account</p>
      </OptionsBar>
      <div className="account-page-content">
        <div className="account-container">
          <div className="account-row">
            <div className="account-row-inner">

              <div className="account-section">
                <div className="account-section-header">
                  <div className="account-section-heading">
                    <h1>My profile</h1>
                  </div>
                </div>
                <div>
                  {this.props.userIsLoaded &&
                    <dl>
                      <dt>First name</dt><dd>{this.props.firstName}</dd>
                      <dt>Last name</dt><dd>{this.props.lastName}</dd>
                      <dt>Email</dt><dd>{this.props.email}</dd>
                    </dl>
                  }
                </div>
              </div>

              <div className="account-section">
                <div className="account-section-header">
                  <div className="account-section-heading">
                    <h1>Authentication</h1>
                  </div>
                </div>
                <div>
                  {this.props.twoFactorAuthIsLoaded && this.props.twoFactorAuthEnabled &&
                    <dl>
                      <dt>Recovery codes remaining</dt><dd>{this.props.twoFactorAuthRecoveryCodesRemaining}</dd>
                    </dl>
                  }
                  {this.props.twoFactorAuthIsLoaded && !this.props.twoFactorAuthEnabled &&
                    <p onClick={this.props.showEnableTwoFactorAuthForm}>Enable two factor authentication</p>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>;
  }
}

AccountPage.propTypes = {
  primaryHeading: PropTypes.string,
};

export default AccountPage;
