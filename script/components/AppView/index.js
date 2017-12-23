import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Article from '../Article';
import Button from '../Button';
import Image from '../Image';
import Notice from '../Notice';
import Page, { PageWidthContainer } from '../Page';

/**
* Immutable top-level component. For view only
*/
const AppView = ({
    id,
    title,
    content,
    articleStats,
    featuredImageSrc,
    continueButtonText,
    onContinueClicked,
    nextArticleId
}) => (
  <Page>
    <Header title={title} />
    <PageWidthContainer>
      <Image src={featuredImageSrc}/>
      <Article content={content} />
    </PageWidthContainer>

    <Footer
      nextArticleId={nextArticleId}
    />
  </Page>
);

AppView.propTypes = {
  id: PropTypes.number.isRequired,
  nextArticleId: PropTypes.number,
  articleStats: PropTypes.shape({
    totalArticlesRead: PropTypes.number.isRequired,
    totalArticlesAvailable: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string.isRequired,

  onContinueClicked: PropTypes.func.isRequired
};

export default AppView;
