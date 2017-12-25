import React from 'react';
import PropTypes from 'prop-types';
import NetworkError from './NetworkError';
import { fetchJSONWithTimeout } from '../utils/networkUtils';

export default class BrooksDataProvider extends React.Component {
  static defaultProps = {
    loadingErrorComponent: NetworkError,
    loadErrorTimeout: 8000,
    loadingComponent: () => (<div></div>),
    mockDelayOnDataReady: 0
  };

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    onDataReadyComponent: PropTypes.oneOfType([
      PropTypes.node.isRequired,
      PropTypes.func.isRequired
    ]).isRequired,
    loadingErrorTimeout: PropTypes.number,
    loadingErrorComponent: PropTypes.func,
    loadingComponent: PropTypes.func,
    mockDelayOnDataReady: PropTypes.number
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errorMessage: null,
      data: null
    };

    this.fetch = this.fetch.bind(this);
  }

  fetch(endpoint) {
    fetchJSONWithTimeout(endpoint, this.props.loadErrorTimeout).then(
      json => this.setState({ data: json, errorMessage: null }),
      () => this.setState({ data: null, errorMessage: 'Network error' })
    );
  }
  componentWillReceiveProps(newProps) {
    if (this.mounted) {
      if (newProps.endpoint !== this.props.endpoint) {
        this.setState({
          data: null
        });
        this.fetch(newProps.endpoint);
      }
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.fetch(this.props.endpoint);
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
          refetch={this.fetch.bind(this, this.props.endpoint)}
          {...this.state.data}
        />
      );
    }
    const LoadingComponent = this.props.loadingComponent;
    return <LoadingComponent />;
  }
}
