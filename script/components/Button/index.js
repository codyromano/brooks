import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.scss';

const getClassName = ({ size = 'normal' }) =>
  `nyt-button nyt-button-${size}`;

const Button = (props) => (
  <button
    className={getClassName(props)}
    {...props}
  >{props.children}</button>
);

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

export default Button;
