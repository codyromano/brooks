import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { withRouter } from 'react-router-dom';
import resolveArticleContent from '../../data/resolveArticleContent';
import { scrollToTop } from '../../utils/animationUtils';
import AppView from '../AppView';

/*
Article features:
- Title
- Image Src
- Publication date
- Content

App store state:
- Time since last article was opened
- list of article ids opened
- list of article ids
- current article id (numeric)
*/

function getArticleIdFromRouterParams(params) {
  const { articleId } = params;
  return articleId && parseInt(articleId) || 0;
}

class AppLogic extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      articleContentResolved: false,
    };

    this.mounted = false;
    this.onContinueClicked = this.onContinueClicked.bind(this);
    this.currentArticleModel = null;
  }
  onContinueClicked() {
    // TODO: Check for end of articles
    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    const nextArticleId = articleId + 1;

    this.props.history.push(`/article/${nextArticleId}`);
    scrollToTop(1000);
  }

  updateStateWithArticleContent(articleId) {
    resolveArticleContent(articleId).then(content => {
        this.setState({
          articleContentResolved: true,
          ...content
        });
      }
    );
  }

  componentDidMount() {
    this.mounted = true;

    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    this.updateStateWithArticleContent(articleId);
  }
  componentWillUnmount() {
    delete this.currentArticleModel;
  }
  componentWillReceiveProps(newProps) {
    const articleId = getArticleIdFromRouterParams(newProps.match.params);
    this.articleLibraryModel.markAsRead(articleId);

    if (this.mounted) {
      this.updateStateWithArticleContent(articleId);
    }
  }
  render() {
    return this.state.articleContentResolved && (
      <AppView
        {...this.state}
        onContinueClicked={this.onContinueClicked}
      />
    );
  }
}

AppLogic.propTypes = {
  history: PropTypes.object.isRequired,
  articleLibraryModel: PropTypes.shape({
    markArticleAsRead: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(AppLogic);
