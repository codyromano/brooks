import React from 'react';
import PropTypes from 'prop-types';
import { PageWidthContainer } from '../Page';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './Footer.scss';

const Footer = ({
  continueButtonText,
  nextArticleId
}) => (
  <PageWidthContainer>
    <footer className="nyt-footer">
      <Link to="/table-of-contents">
        <Button>Table of contents</Button>
      </Link>
      {nextArticleId && (<Link to={`/article/${nextArticleId}`}>
        <Button>
          {continueButtonText}
        </Button>
      </Link>)}
    </footer>
  </PageWidthContainer>
);

Footer.defaultProps = {
  continueButtonText: 'Next article'
};

export default Footer;
