import React from 'react';
import ModalWindow from '../ModalWindow';
import EnableTwoFactorAuthForm from './EnableTwoFactorAuthForm';
import './style.css';

const ModalEnableTwoFactorAuth = () =>
  <ModalWindow className="modal--enable-two-factor" title="Enable two factor authentication">
    <EnableTwoFactorAuthForm />
  </ModalWindow>

export default ModalEnableTwoFactorAuth;
