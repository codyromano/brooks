import React from 'react';
import './Button.scss';

const Button = (props) => (
  <button
    className="nyt-button"
    {...props}
  >{props.children}</button>
);

export default Button;
