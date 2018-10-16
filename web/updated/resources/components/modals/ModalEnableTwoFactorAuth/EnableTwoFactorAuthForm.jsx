import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'qrcode';
import Button from '../../formElements/Button';
import Form from '../../formElements/Form';
import FormMessage from '../../formElements/FormMessage';
import TextField from '../../../containers/TextField';
import * as actions from '../../../actions/forms/enableTwoFactorAuth';
import * as selectors from '../../../selectors';
import { FORM_ID } from '../../../configuration/forms/enableTwoFactorAuth';
import './style.css';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitEnableTwoFactorAuthForm(state),
  sharedKey: state.enableTwoFactorAuthForm.setup.sharedKey,
  authenticatorUrl: state.enableTwoFactorAuthForm.setup.authenticatorUrl,
  showSuccess: state.enableTwoFactorAuthForm.success,
  recoveryCodes: state.enableTwoFactorAuthForm.recoveryCodes,
  generalError: state[FORM_ID].errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTwoFactorAuthSetup: actions.fetch,
  handleSubmit: actions.submit,
}, dispatch);

class EnableTwoFactorAuthForm extends Component {

  componentDidMount() {
    this.props.fetchTwoFactorAuthSetup();
  }

  componentDidUpdate() {
    if (!this.props.success && this.props.authenticatorUrl) {
      var canvas = document.getElementById('qrcanvas');
      if (canvas) {    
        QRCode.toCanvas(canvas, this.props.authenticatorUrl, { width: 200 });
      }
    }
  }

  render() {
    return <>
      {!this.props.showSuccess && <>
        <p>Scan the QR code with your authenticator app. Alternatively, manually enter the shared key.</p>
        <canvas id="qrcanvas"></canvas>
        <p>Shared key: {this.props.sharedKey}</p>
        {this.props.generalError &&
          <FormMessage text={this.props.generalError} type="error" />
        }
        <Form handleSubmit={this.props.handleSubmitClick}>
          <TextField id="code" formId={FORM_ID} />
          <Button
            text="Update"
            color="blue"
            isDisabled={!this.props.canSubmit}
            handleClick={this.props.handleSubmit}
          />
        </Form>
      </>}
      {this.props.showSuccess && <>
        <p>Recovery codes:</p>
        <ul>
          {this.props.recoveryCodes.map((i, j) => <li key={j}>{i}</li>)}
        </ul>
      </>}
    </>;
  }
}

EnableTwoFactorAuthForm.propTypes = {
  fetchTwoFactorAuthSetup: PropTypes.func,
  handleSubmit: PropTypes.func,
  canSubmit: PropTypes.bool,
  sharedKey: PropTypes.string,
  authenticatorUrl: PropTypes.string,
  showSuccess: PropTypes.bool,
  recoveryCodes: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, mapDispatchToProps)(EnableTwoFactorAuthForm);
