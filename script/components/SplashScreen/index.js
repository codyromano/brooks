import React from 'react';
import PropTypes from 'prop-types';
import SplashScreenView from './SplashScreenView';
import withCountdown from '../withCountdown';
import BrooksDataProvider from '../BrooksDataProvider';

const CountdownView = ({ secondsLeft }) => (
  <SplashScreenView
    title="David is writing..."
    about={`A new column will arrive in ${secondsLeft} seconds.`}
  />
);

const Countdown = withCountdown(CountdownView);

class SplashScreen extends React.Component {
  render() {
    // TODO: Derive articles visible from localStorage
    const articlesVisible = 0;
    const totalArticles = this.props.contents.length;

    if (articlesVisible < totalArticles) {
      // TODO: Derive target time from localStorage
      return (
        <Countdown targetTime={1514051871809} />
      );
    }
    return (
      <SplashScreenView
        title="Nothing left to write."
        about={`You've unlocked all of David's columns!`}
      />
    );
  }
}

const SplashScreenWithData = () => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={SplashScreen}
  />
);

// 1514041871809
export default SplashScreenWithData;
