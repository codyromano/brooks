import React from 'react';
import PropTypes from 'prop-types';
import BrooksDataProvider from '../../components/BrooksDataProvider';
import { getEndpoint } from '../../utils/pathUtils';
import { withRouter } from 'react-router-dom';
import LoadingComponent from '../../components/ArticleLoading';
import NetworkError from '../../components/NetworkError';

const LoadingErrorComponent = () => (
  <div>Whoops...there was a problem loading the article.
    Please try again. If the problem persists, let me know. :)</div>
);

/**
* HOC that injects article content
*/
const withArticleContent = (Component) => {
  // TODO: Move endpoint into common config file

  const WrappedWithArticle = (props) => {
    const articleId = props.match.params.articleId;
    const endpoint = getEndpoint('get-article-by-id', { id: articleId });
    console.log(endpoint);

    // TODO: Create a fun and engaging between-articles loading experience?
    return (
      <BrooksDataProvider
        endpoint={endpoint}
        loadingErrorComponent={NetworkError}
        onDataReadyComponent={Component}
        {...props}
      />
    );
  };

  WrappedWithArticle.propTypes = {
    match: PropTypes.object.isRequired
  };

  return withRouter(WrappedWithArticle);
};

export default withArticleContent;
