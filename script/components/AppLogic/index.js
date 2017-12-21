import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { withRouter } from 'react-router-dom';
import resolveArticleContent from '../../data/resolveArticleContent';
import { scrollToTop } from '../../utils/animationUtils';
import AppView from '../AppView';

function getArticleIdFromRouterParams(params) {
  const { articleId } = params;
  return articleId && parseInt(articleId) || 0;
}

const initialState = {
  articleContentResolved: false,
  articleStats: {
    totalArticlesAvailable: 0,
    totalArticlesRead: 0
  }
};

class AppLogic extends React.Component {
  constructor(props, context) {
    super(props, context);

    const model = props.articleLibraryModel;

    this.state = initialState;
    this.mounted = false;
    this.onContinueClicked = this.onContinueClicked.bind(this);
  }
  onContinueClicked() {
    // TODO: Check for end of articles
    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    const nextArticleId = articleId + 1;

    this.props.history.push(`/article/${nextArticleId}`);
    scrollToTop(1000);
  }

  updateStateWithArticleContent(articleId) {
    const model = this.props.articleLibraryModel;
    model.markArticleAsRead(articleId);

    resolveArticleContent(articleId).then(content => {
        this.setState({
          articleContentResolved: true,
          articleStats: {
            totalArticlesRead: model.getTotalArticlesRead(),
            totalArticlesAvailable: model.getTotalArticlesAvailable()
          },
          ...content
        });
      }
    );
  }

  componentDidMount() {
    this.mounted = true;

    const articleId = getArticleIdFromRouterParams(this.props.match.params);
    this.updateStateWithArticleContent(articleId);
    this.props.articleLibraryModel.markArticleAsRead(articleId);
  }
  componentWillReceiveProps(newProps) {
    const articleId = getArticleIdFromRouterParams(newProps.match.params);

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
