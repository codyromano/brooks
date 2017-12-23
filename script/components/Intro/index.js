import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import SplashScreenView from '../SplashScreen/SplashScreenView';

const introText = `As a special Christmas gift, I created a website featuring my New York Times columns. Think of each column as a letter just for you!

Sincerely,
David Brooks`;

const Intro = () => (
  <SplashScreenView
    title="Dear Kim,"
    about={introText}
  >
    <Link to="/table-of-contents/">
      <Button priority={'high'}>Start reading</Button>
    </Link>
  </SplashScreenView>
);

export default Intro;
