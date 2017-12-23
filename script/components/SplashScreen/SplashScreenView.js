import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import { PageWidthContainer } from '../Page';
import './SplashScreenView.scss';

const SplashScreenView = ({
  title,
  about,
  backgroundImageSrc,
  children
}) => {
  return (
    <div className="splash-screen">
      {backgroundImageSrc && <Image
        src={backgroundImageSrc}
        className="splash-screen-image"
      />}
      <PageWidthContainer>
        <div className="splash-screen-content">
          {title && <h1>{title}</h1>}
          {about && <p>{about}</p>}

          {children}
        </div>
      </PageWidthContainer>
    </div>
  );
};

SplashScreenView.defaultProps = {
  backgroundImageSrc: './images/paperplane.gif'
};

SplashScreenView.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
  backgroundImageSrc: PropTypes.string
};

export default SplashScreenView;
