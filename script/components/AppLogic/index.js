import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import resolveArticleContent from '../../data/resolveArticleContent';
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

export default class AppLogic extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      articleContentResolved: false,
    };

    this.mounted = false;
    this.onContinueClicked = this.onContinueClicked.bind(this);
  }
  onContinueClicked() {
    // TODO: Update this
    this.updateStateWithArticleContent(1);
  }

  updateStateWithArticleContent(articleId) {
    resolveArticleContent(articleId).then(content =>
      this.setState({
        articleContentResolved: true,
        ...content
      })
    );
  }

  componentDidMount() {
    this.mounted = true;

    const { articleId } = this.props.match.params || 0
    this.updateStateWithArticleContent(articleId);
  }
  componentWillReceiveProps({ articleId }) {
    console.log(articleId);

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
