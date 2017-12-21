import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Article from '../Article';
import Button from '../Button';
import Image from '../Image';
import Notice from '../Notice';
import Page, { PageWidthContainer } from '../Page';

/**
* Immutable top-level component. For view only
*/
const AppView = ({
    articleId,
    headerTitle,
    articleText,
    articleStats,
    featuredImageSrc,
    continueButtonText,
    onContinueClicked
}) => (
  <Page>
    {articleStats.totalArticlesRead > 0 && (<Notice>
      <PageWidthContainer>
        <span>You've collected {articleStats.totalArticlesRead} out of {articleStats.totalArticlesAvailable}  articles!</span>
      </PageWidthContainer>
    </Notice>)}

    <Header title={headerTitle} />
    <PageWidthContainer>
      <Image src={featuredImageSrc}/>

      <Article content={articleText} />
      <Button onClick={onContinueClicked}>
        {continueButtonText}
      </Button>
    </PageWidthContainer>
  </Page>
);

AppView.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleStats: PropTypes.shape({
    totalArticlesRead: PropTypes.number.isRequired,
    totalArticlesAvailable: PropTypes.number.isRequired,
  }).isRequired,
  headerTitle: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string.isRequired,
  articleText: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string.isRequired,

  onContinueClicked: PropTypes.func.isRequired
};

export default AppView;
