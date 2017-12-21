import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import resolveArticleContent from '../resolveArticleContent';

/**
* HOC that injects article content
*/
export default function withArticleContent(Component) {

  class WrappedWithArticle extends React.Component {
    static getArticleIdFromRouterParams(params) {
      return params && params.articleId && parseInt(articleId) || 0; 
    }

    constructor(props, context) {
      super(props, context);

      this.state = {
        contentDidResolve: false
      };
      this.mounted = false;
    }

    updateStateWithArticleContent(articleId) {
      resolveArticleContent(articleId).then(content =>
        this.setState({
          contentDidResolve: true,
          ...content
        })
      );
    }

    componentDidMount() {
      this.mounted = true;

      this.updateStateWithArticleContent(
        this.props.match.params.articleId
      );
    }

    componentWillReceiveProps(newProps) {
      if (this.mounted) {
        this.setState({
          contentDidResolve: false
        });
        this.updateStateWithArticleContent(
          newProps.match.params.articleId
        );
      }
    }

    render() {
      const Loading = this.props.LoadingComponent;

      if (!this.state.contentDidResolve) {
        return Loading;
      }
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  WrappedWithArticle.defaultProps = {
    LoadingComponent: <div></div>
  };

  WrappedWithArticle.propTypes = {
    match: PropTypes.object.isRequired,
    LoadingComponent: PropTypes.element
  };

  return withRouter(WrappedWithArticle);
}
