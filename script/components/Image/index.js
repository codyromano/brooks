import React from 'react';
import PropTypes from 'prop-types';

function preloadImage(src, callback) {
  const testImage = document.createElement('img');
  testImage.onload = () => callback(testImage);
  testImage.src = src;
}

export default class Image extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false
    };
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    preloadImage(this.props.src, () => {
      if (this.mounted) {
        this.setState({ loaded: true });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const imageStyle = {...this.props.style};
    if (!this.state.loaded) {
      imageStyle.opacity = 0;
    }

    return (<img {...this.props} style={imageStyle} />);
  }
}
Image.defaultProps = {
  style: {
    transition: 'opacity ease 1s',
    maxWidth: '100%'
  }
};

Image.propTypes = {
  src: PropTypes.string.isRequired
};