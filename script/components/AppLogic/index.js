import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import withArticleContent from '../../data/models/withArticleContent';
import resolveArticleContent from '../../data/resolveArticleContent';
import AppView from '../AppView';

function getArticleIdFromRouterParams(params) {
  return params.articleId && parseInt(params.articleId) || 0;
}

class AppLogic extends React.Component {
  constructor(props, context) {
    super(props, context);

    const model = props.articleLibraryModel;

    //this.state = initialState;
    this.onContinueClicked = this.onContinueClicked.bind(this);
  }
  onContinueClicked() {
    // TODO: Check for end of articles
    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    const nextArticleId = articleId + 1;

    this.props.history.push(`/article/${nextArticleId}`);
  }

  componentDidMount() {
    this.mounted = true;

    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    this.props.articleLibraryModel.markArticleAsRead(articleId);
  }
  render() {
    return this.props.contentDidResolve && (
      <AppView
        {...this.props}
        onContinueClicked={this.onContinueClicked}
      />
    );
  }
}

AppLogic.propTypes = {
  articleId: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string.isRequired,
  articleText: PropTypes.string.isRequired,

  articleLibraryModel: PropTypes.shape({
    markArticleAsRead: PropTypes.func.isRequired
  }).isRequired
};

export default withArticleContent(AppLogic);
