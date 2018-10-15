import React from 'react';
import ModalWindow from '../ModalWindow';
import ChangeRoleMenu from './ChangeRoleMenu';
import './style.css';

const ModalChangeRole = () =>
  <ModalWindow className="modal--change-role" title="Change role">
    <ChangeRoleMenu />
  </ModalWindow>

export default ModalChangeRole;
