import React from 'react';
import PropTypes from 'prop-types';
import { modal } from '../../../constants';
import ChangeRole from '../ModalChangeRole';
import EnableTwoFactorAuth from '../ModalEnableTwoFactorAuth';

const Modal = ({ id }) => {
  switch (id) {

    case modal.changeRole:
      return <ChangeRole />;

    case modal.enableTwoFactorAuth:
      return <EnableTwoFactorAuth />;

    default:
      return null;
  }
};

Modal.propTypes = {
  id: PropTypes.string,
};

export default Modal;
