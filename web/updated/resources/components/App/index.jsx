//import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import classnames from 'classnames';
import * as appActions from '../../actions/app';
import * as uiActions from '../../actions/ui';
import * as currentUserActions from '../../actions/currentUser';
import { keyboard } from '../../constants';
// import Modal from '../Modals/Modal';
import config from '../../configuration';
import './style.css';
import './animations.css';
import Callout from '../Callout';

const mapStateToProps = state => ({
  messages: state.app.messages,
  modalId: state.ui.modal.modalId,
  isMobileNavVisible: state.ui.isMobileNavVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleEscapeKey: uiActions.handleEscapeKey,
  logoutUser: currentUserActions.unset,
  hideMessage: (id) => appActions.hideMessage(id),
  push,
}, dispatch);

class App extends Component {
  static propTypes = {
    handleEscapeKey: PropTypes.func,
    logoutUser: PropTypes.func,
    isMobileNavVisible: PropTypes.bool,
    modalId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    messages: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.startTimeout();
  }

  startTimeout() {
    const logoutUser = this.logoutUser;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(logoutUser, 3600000);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  logoutUser = () => {
    this.props.push(config.routes.login);
    this.props.logoutUser();
  }

  handleKeyUp = (event) => {
    this.startTimeout();
    if (event.keyCode === keyboard.esc) this.props.handleEscapeKey();
  }

  handleMouseMove = (event) => {
    this.startTimeout();
  }

  startMessageTimeout(id) {
    this.timeouts = this.timeouts || {};

    if (!this.timeouts[id]) {
      this.timeouts[id] = setTimeout(() => {console.log(id); this.props.hideMessage(id);}, 10000);
    }
  }

  render() {
    const { children, modalId, isMobileNavVisible } = this.props;

    const cssClasses = classnames('app', {
      'app--modal-visible': modalId,
      'app--mobile-nav-visible': isMobileNavVisible,
    });

    const messages = this.props.messages && Object.keys(this.props.messages).map(key => {
      this.startMessageTimeout(key);
      return this.props.messages[key];
    });

    return (
      <div className={cssClasses}>
        <Callout text={messages} type="success" />
        {children}
        {/* <Modal id={modalId} /> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));