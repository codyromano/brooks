import React from 'react';
import PropTypes from 'prop-types';
import { PageWidthContainer } from '../Page';
import './Header.scss';

const Header = ({ title }) => (
  <header className="nyt-header">
    <PageWidthContainer>
      <h1 className="nyt-title">{title}</h1>
    </PageWidthContainer>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;