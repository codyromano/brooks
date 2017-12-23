import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Button from '../Button';
import Article from '../Article';
import Image from '../Image';
import Page, { PageWidthContainer } from '../Page';

import './Intro.scss';

const introText = `As a special Christmas gift, I created a website featuring my New York Times columns. Think of each column as a letter just for you!`;

const Intro = () => (
  <Page>
    <div className="intro-page">
      <Header title="Letters from David Brooks" />
      <PageWidthContainer>
        <Image src="./images/david-brooks-headshot.jpg" />
        <Article content={introText} />
        <Link to="/table-of-contents">
          <Button>Start reading</Button>
        </Link>
      </PageWidthContainer>
    </div>
  </Page>
);

export default Intro;
