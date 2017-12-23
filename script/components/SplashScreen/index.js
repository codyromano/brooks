import React from 'react';
import PropTypes from 'prop-types';
import SplashScreenView from './SplashScreenView';
import withCountdown from '../withCountdown';
import Button from '../Button';
import { withRouter, Link } from 'react-router-dom';
import withLibraryModel, { articleLibraryModelShape } from '../../data/models/withLibraryModel';
import BrooksDataProvider from '../BrooksDataProvider';

const CountdownView = ({ secondsLeft }) => (
  <SplashScreenView
    title="David is writing..."
    about={`A random number of letters will arrive in ${secondsLeft} seconds.`}
  />
);
const Countdown = withCountdown(CountdownView);

class SplashScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onLetterReadyClick = this.onLetterReadyClick.bind(this);
  }

  navigateToTableOfContents() {
    this.props.history.push('/table-of-contents');
  }

  onLetterReadyClick() {
    this.props.articleLibraryModel.increaseTotalArticlesVisible(
      this.props.contents.length
    );
    this.navigateToTableOfContents();
  }

  componentDidMount() {
    this.forceUpdateInterval = window.setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.forceUpdateInterval);
  }

  render() {
    // TODO: It would be nice to separate these views into
    // distinct components to reduce size of render()

    const model = this.props.articleLibraryModel;

    // Get the number of revealed articles from localStorage
    const articlesVisible = model.getTotalArticlesVisible();

    // Get total number of published articles from the MySQL server
    const totalArticles = this.props.contents.length;

    if (articlesVisible >= totalArticles) {
      return (
        <SplashScreenView
          title="Nothing left to write."
          about={`Congrats! You've unlocked all of David's columns.`}
        />
      );
    }

    if (!model.isWritingInProgress()) {
      return (
        <SplashScreenView
          title="New content available!"
          about={``}
        >
          <Button
            priority={'high'}
            onClick={this.onLetterReadyClick}
          >See unread letters</Button>
        </SplashScreenView>
      );
    }

    return (
      <Countdown
        targetTime={model.getTimeArticleReady()}
      />
    );
  }
}

SplashScreen.propTypes = {
  articleLibraryModel: articleLibraryModelShape,
  history: PropTypes.object.isRequired
};

const SplashScreenWithLibrary = withLibraryModel(SplashScreen);
const SplashScreenWithRouter = withRouter(SplashScreenWithLibrary);

const SplashScreenWithData = () => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={SplashScreenWithRouter}
  />
);

export default SplashScreenWithData;
