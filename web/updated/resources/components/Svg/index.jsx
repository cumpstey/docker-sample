import React from 'react';
import PropTypes from 'prop-types';

import AreaIcon from '../../assets/svg/area.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import CartIcon from '../../assets/svg/cart.svg';
import CheckIcon from '../../assets/svg/check.svg';
import CloseIcon from '../../assets/svg/close.svg';
import CompassIcon from '../../assets/svg/compass.svg';
import CrossIcon from '../../assets/svg/cross.svg';
import ExpandLessIcon from '../../assets/svg/expand-less.svg';
import ExpandMoreIcon from '../../assets/svg/expand-more.svg';
import Gnome2Icon from '../../assets/svg/gnome2.svg';
import InfoIcon from '../../assets/svg/info.svg';
import IntertwinglyIcon from '../../assets/svg/intertwingly.svg';
import LogoutIcon from '../../assets/svg/logout.svg';
import MenuIcon from '../../assets/svg/menu.svg';
import PersonIcon from '../../assets/svg/person.svg';
import PinIcon from '../../assets/svg/pin.svg';
import RadioSelectedIcon from '../../assets/svg/radio-selected.svg';
import RadioIcon from '../../assets/svg/radio.svg';
import SortDownIcon from '../../assets/svg/sort-down.svg';
import SortUpIcon from '../../assets/svg/sort-up.svg';
import SupportIcon from '../../assets/svg/support.svg';
import ToolsIcon from '../../assets/svg/tools.svg';

import { icon } from '../../constants';

const Svg = ({ name, className, fill }) => {
  switch (name) {
    case icon.area:
      return <AreaIcon className={className} />
    case icon.calendar:
      return <CalendarIcon className={className} />
    case icon.cart:
      return <CartIcon className={className} />
    case icon.check:
      return <CheckIcon className={className} />
    case icon.close:
      return <CloseIcon className={className} />
    case icon.compass:
      return <CompassIcon className={className} />
    case icon.cross:
      return <CrossIcon className={className} />
    case icon.expandLess:
      return <ExpandLessIcon className={className} />
    case icon.expandMore:
      return <ExpandMoreIcon className={className} />
    case icon.gnome2:
      return <Gnome2Icon className={className} />
    case icon.info:
      return <InfoIcon className={className} />
    case icon.intertwingly:
      return <IntertwinglyIcon className={className} />
    case icon.logout:
      return <LogoutIcon className={className} />
    case icon.menu:
      return <MenuIcon className={className} />
    case icon.person:
      return <PersonIcon className={className} />
    case icon.pin:
      return <PinIcon className={className} />
    case icon.radioSelected:
      return <RadioSelectedIcon className={className} />
    case icon.radio:
      return <RadioIcon className={className} />
    case icon.sortDown:
      return <SortDownIcon className={className} />
    case icon.sortUp:
      return <SortUpIcon className={className} />
    case icon.support:
      return <SupportIcon className={className} />
    case icon.tools:
      return <ToolsIcon className={className} />
    default:
      return <CrossIcon className={className} />
  }
}

Svg.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

export default Svg;
