import React from 'react';
import PropTypes from 'prop-types';
import SplashScreenView from '../SplashScreen/SplashScreenView';

const NetworkError = ({ errorMessage }) => (
  <SplashScreenView
    title="This is embarrassing..."
    about={`My content server encountered a hiccup. Please reload and try again. If it keeps happening, let me know. 😊`}
  />
);

export default NetworkError;
