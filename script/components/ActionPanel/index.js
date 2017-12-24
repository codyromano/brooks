import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import * as actionContent from './actionPanelContent';
import { getEndpoint } from '../../utils/pathUtils';
import withLibraryModel, { articleLibraryModelShape } from '../../data/models/withLibraryModel';
import './ActionPanelView.scss';

// Immutable component to handle display
const ActionPanelView = ({
  title,
  about,
  buttons
}) => (
  <div className="nyt-action-panel">
    <h2>{title}</h2>
    <p>{about}</p>
    {buttons.map((button, i) => (
      <Button {...button} key={i}>
        {button.text}
      </Button>
    ))}
  </div>
);

// Exclusively handles business logic
class ActionPanel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onRequestLetterClick = this.onRequestLetterClick.bind(this);
    this.onBonusContentClick = this.onBonusContentClick.bind(this);
  }
  onBonusContentClick() {
    this.props.history.push('/cut-scene/');
  }
  onRequestLetterClick() {
    const model = this.props.articleLibraryModel;

    if (!model.isWritingInProgress()) {
      model.requestNewArticle();
    }

    this.props.history.push('/writing/');
  }
  render() {
    let content = null;
    const model = this.props.articleLibraryModel;

    const totalVisible = model.getTotalArticlesVisible();
    const totalAvailable = this.props.contents.length;

    if (totalVisible < totalAvailable) {
      content = actionContent.getRequestLetterContent(
        this.onRequestLetterClick
      );
    } else {
      content = actionContent.getBonusContent(
        this.onBonusContentClick
      );
    }

    return (
      <ActionPanelView {...content} />
    );
  }
}

ActionPanel.propTypes = {
  history: PropTypes.object.isRequired,
  articleLibraryModel: articleLibraryModelShape
};

const ActionPanelWithBrooksData = (props) => (
  <BrooksDataProvider
    {...props}
    endpoint={getEndpoint('table-of-contents')}
    onDataReadyComponent={ActionPanel}
    articleLibraryModel={props.articleLibraryModel}
  />
);

const ActionPanelWithLibrary = withLibraryModel(ActionPanelWithBrooksData);
const ActionPanelWithRouter = withRouter(ActionPanelWithLibrary);

export default ActionPanelWithRouter;

