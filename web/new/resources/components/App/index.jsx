import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import classnames from 'classnames';
import * as actions from '../../actions';
import { keyboard } from '../../constants';
// import Modal from '../Modals/Modal';
import config from '../../configuration';
import './style.css';
import './animations.css';

const mapStateToProps = state => ({
  modalId: state.modal.modalId,
  isMobileNavVisible: state.app.isMobileNavVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleEscapeKey: actions.handleEscapeKey,
  logoutUser: actions.unsetCurrentUser,
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

  render() {
    const { children, modalId, isMobileNavVisible } = this.props;

    const cssClasses = classnames('app', {
      'app--modal-visible': modalId,
      'app--mobile-nav-visible': isMobileNavVisible,
    });

    return (
      <div className={cssClasses}>
        {children}
        {/* <Modal id={modalId} /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
