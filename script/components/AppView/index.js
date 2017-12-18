import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Article from '../Article';
import Button from '../Button';
import Image from '../Image';
import Page, { PageWidthContainer } from '../Page';

const AppView = ({
    articleId,
    headerTitle,
    articleText,
    featuredImageSrc,
    continueButtonText,
    onContinueClicked
}) => (
  <Page>
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
  headerTitle: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string.isRequired,
  articleText: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string.isRequired,

  onContinueClicked: PropTypes.func.isRequired
};

export default AppView;
