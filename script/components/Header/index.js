import React from 'react';
import PropTypes from 'prop-types';
import { PageWidthContainer } from '../Page';

const Header = ({ title }) => (
  <header>
    <PageWidthContainer>
      <h1>{title}</h1>
    </PageWidthContainer>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;