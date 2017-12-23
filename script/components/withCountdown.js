import React from 'react';
import PropTypes from 'prop-types';

const withCountdown = (Component) => {
  class WrappedWithCountdown extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        secondsLeft: this.getSecondsLeft()
      };
      this.getSecondsLeft = this.getSecondsLeft.bind(this);
      this.countdownComplete = false;
    }
    getSecondsLeft() {
      const secondsLeft = Math.round(
        (this.props.targetTime - new Date().getTime()) / 1000
      );
      return Math.max(0, secondsLeft);
    }
    componentDidMount() {
      this.updateInterval = setInterval(() => {
        const secondsLeft = this.getSecondsLeft();

        if (secondsLeft >= 0) {
          this.setState({
            secondsLeft: this.getSecondsLeft()
          });

        } else {
          // Only fire the countdown complete callback once
          if (!this.countdownComplete) {
            this.props.onCountdownComplete();
            window.clearInterval(this.updateInterval);
          }
          this.countdownComplete = true;
        }
      }, this.props.updateInterval);
    }
    componentWillUnmount() {
      window.clearInterval(this.updateInterval);
      delete this.countdownComplete;
    }
    render() {
      return (
        <Component
          secondsLeft={this.state.secondsLeft}
          {...this.props}
        />
      );
    }
  }

  WrappedWithCountdown.defaultProps = {
    updateInterval: 1000,
    onCountdownComplete: () => {}
  };

  WrappedWithCountdown.propTypes = {
    onCountdownComplete: PropTypes.func,
    targetTime: PropTypes.number.isRequired
  };

  return WrappedWithCountdown;
};

export default withCountdown;
