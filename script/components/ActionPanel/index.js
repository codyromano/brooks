import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
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
    this.content = {
      title: `You're out of letters!`,
      about: ``,
      buttons: [
        {
          text: 'Ask David to write a letter',
          onClick: this.onRequestLetterClick,
          priority: 'high'
        }
      ]
    };
  }
  onRequestLetterClick() {
    const model = this.props.articleLibraryModel;

    if (!model.isWritingInProgress()) {
      model.requestNewArticle();
    }
    // TODO: Use router
    window.location.hash = 'writing/foo';
  }
  render() {
    // TODO: Selectively show content for reward
    // when articlesVisible === totalArticles
    return (
      <ActionPanelView {...this.content} />
    );
  }
}

ActionPanel.propTypes = {
  articleLibraryModel: articleLibraryModelShape,
  articlesVisible: PropTypes.number,
  totalArticles: PropTypes.number
};

export default withLibraryModel(ActionPanel);
