import React from 'react';
import PropTypes from 'prop-types';
import SplashScreenView from './SplashScreenView';
import withCountdown from '../withCountdown';

const CountdownView = ({ secondsLeft }) => (
  <SplashScreenView
    title="David is writing..."
    about={`A new column will arrive in ${secondsLeft} seconds.`}
    backgroundImageSrc="./images/paperplane.gif"
  />
);

const Countdown = withCountdown(CountdownView);

class SplashScreen extends React.Component {
  render() {
    return (
      <Countdown targetTime={1514051871809} />
    );
  }
}

// 1514041871809
export default SplashScreen;
