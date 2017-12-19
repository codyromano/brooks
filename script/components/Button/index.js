import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = (props) => (
  <button
    className="nyt-button"
    {...props}
  >{props.children}</button>
);

export default Button;
