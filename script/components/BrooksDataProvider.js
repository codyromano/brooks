import React from 'react';
import PropTypes from 'prop-types';

export default class BrooksDataProvider extends React.Component {
  static defaultProps = {
    loadingErrorComponent: () => (<div>Error loading data</div>),
    loadingComponent: () => (<div>Loading</div>)
  };

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    onDataReadyComponent: PropTypes.oneOfType([
      PropTypes.node.isRequired,
      PropTypes.func.isRequired
    ]).isRequired,
    loadingErrorComponent: PropTypes.func,
    loadingComponent: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errorMessage: null,
      data: null
    };
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    // TODO: Use async / await (requires Babel changes)
    window.fetch(this.props.endpoint).then(response => {
      return response.json();

    }, networkError => {
      this.setState({
        errorMessage: networkError
      });

    }).then(json => {
      this.setState({
        data: json,
        errorMessage: null
      });

    }, jsonParseError => {
      this.setState({
        errorMessage: jsonParseError
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    if (this.state.errorMessage) {
      const ErrorComponent = this.props.loadingErrorComponent;

      return (
        <ErrorComponent
          {...this.state}
        />
      );
    }
    if (this.state.data) {
      const Component = this.props.onDataReadyComponent;

      return (
        <Component
          {...this.props}
          refetch={this.fetch}
          {...this.state.data}
        />
      );
    }
    const LoadingComponent = this.props.loadingComponent;
    return <LoadingComponent />;
  }
}
