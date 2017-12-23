import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import { PageWidthContainer } from '../Page';
import './SplashScreenView.scss';

const SplashScreenView = ({
  title,
  about,
  backgroundImageSrc
}) => {
  return (
    <div className="splash-screen">
      {backgroundImageSrc && <Image
        src={backgroundImageSrc}
        className="splash-screen-image"
      />}

      <PageWidthContainer>
        <div className="splash-screen-content">
          <h1>{title}</h1>
          <p>{about}</p>
        </div>
      </PageWidthContainer>
    </div>
  );
};

SplashScreenView.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
  backgroundImageSrc: PropTypes.string
};

export default SplashScreenView;
