import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import withArticleContent from '../../data/models/withArticleContent';
import AppView from '../AppView';

function getArticleIdFromRouterParams(params) {
  return params.articleId && parseInt(params.articleId) || 0;
}

/**
* Mutable component for business logic (no views)
*/
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
    const model = this.props.articleLibraryModel;

    return (
      <AppView
        {...this.props}
        onContinueClicked={this.onContinueClicked}
      />
    );
  }
}

AppLogic.defaultProps = {
  continueButtonText: 'Continue reading'
};

AppLogic.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string.isRequired,
  continueButtonText: PropTypes.string,
  content: PropTypes.string.isRequired,

  articleLibraryModel: PropTypes.shape({
    markArticleAsRead: PropTypes.func.isRequired
  }).isRequired
};

export default withArticleContent(AppLogic);
