import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import resolveArticleContent from '../../data/resolveArticleContent';
import AppView from '../AppView';

const introText = `Dear Kim,

As a special Christmas gift, I made you this website featuring a collection of my best New York Times columns.`;

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

    this.onContinueClicked = this.onContinueClicked.bind(this);
  }
  onContinueClicked(articleId) {
    this.setState({
      headerTitle: 'Next article'
    })
  }
  componentDidMount() {
    const { articleId } = this.props.match.params;

    resolveArticleContent(articleId).then(content =>
      this.setState({
        articleContentResolved: true,
        ...content
      })
    );
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
