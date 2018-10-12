import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'qrcode';
import Button from '../../Button';
import Form from '../../Form';
import TextField from '../../../containers/TextField';
import * as actions from '../../../actions/forms/enableTwoFactorAuth';
import * as selectors from '../../../selectors';
import { FORM_ID } from '../../../configuration/forms/enableTwoFactorAuth';
import './style.css';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitEnableTwoFactorAuthForm(state),
  sharedKey: state.enableTwoFactorAuthForm.setup.sharedKey,
  authenticatorUrl: state.enableTwoFactorAuthForm.setup.authenticatorUrl,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTwoFactorAuthSetup: actions.fetch,
  handleSubmit: actions.submit,
}, dispatch);

class EnableTwoFactorAuth extends Component {

  componentDidMount() {
    this.props.fetchTwoFactorAuthSetup();
  }

  componentDidUpdate() {
    if (this.props.authenticatorUrl) {
      var canvas = document.getElementById('qrcanvas')    
      QRCode.toCanvas(canvas, this.props.authenticatorUrl);//, { width: 200 });
    }
  }

  render() {
    return <>
      <p>Scan the QR code with your authenticator app. Alternatively, manually enter the shared key.</p>
      <canvas id="qrcanvas"></canvas>
      <p>Shared key: {this.props.sharedKey}</p>
      <Form handleSubmit={this.props.handleSubmitClick}>
        <TextField id="code" formId={FORM_ID} />
        <Button
          text="Update"
          color="blue"
          isDisabled={!this.props.canSubmit}
          handleClick={this.props.handleSubmit}
        />
      </Form>
    </>;
  }
}

EnableTwoFactorAuth.propTypes = {
  handleSubmitClick: PropTypes.func,
  canSubmit: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnableTwoFactorAuth);
