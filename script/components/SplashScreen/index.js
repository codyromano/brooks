import React from 'react';
import PropTypes from 'prop-types';
import SplashScreenView from './SplashScreenView';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <SplashScreenView
        title="David is writing..."
        about="A new column will arrive in 5 minutes."
        backgroundImageSrc="https://cdn.dribbble.com/users/637492/screenshots/2487758/paperplane.gif"
      />
    );
  }
}
