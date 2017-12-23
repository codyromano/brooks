import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.scss';

const getClassName = ({
  size = 'normal',
  priority = 'normal'
}) => `nyt-button nyt-button-priority-${priority} $nyt-button-${size}`;

const Button = (props) => (
  <button
    className={getClassName(props)}
    {...props}
  >{props.children}</button>
);

Button.defaultProps = {
  priority: 'normal'
};

Button.propTypes = {
  highPriority: PropTypes.oneOf(['normal', 'high', 'low']),
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

export default Button;
