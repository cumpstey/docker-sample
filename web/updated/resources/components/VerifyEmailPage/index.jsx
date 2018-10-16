import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormMessage from '../formElements/FormMessage';
import Layout from '../LayoutAnonymous';
import Link from '../Link';
import AuthBox from '../AuthBox';
import { routes } from '../../configuration';

class VerifyEmailPage extends Component {
 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleSubmit();
  }

  render() {
    const loginLink = <div><Link to={routes.login}>Log in</Link>.</div>;

    return <Layout className="verify-email-page">
      <AuthBox title="Verify email" footer={loginLink}>
        {this.props.generalError &&
          <FormMessage text={this.props.generalError} type="error" />
        }
        {!this.props.generalError && <>Loading...</>}
      </AuthBox>
    </Layout>;
  }
}

VerifyEmailPage.propTypes = {
  handleSubmit: PropTypes.func,
  generalError: PropTypes.string,
};

export default VerifyEmailPage;
