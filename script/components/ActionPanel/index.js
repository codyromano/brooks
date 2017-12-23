import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
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

const content = {
  title: `You're out of letters!`,
  about: ``,
  buttons: [
    {
      text: 'Ask David to write a letter',
      onClick: () => {
        // TODO: Use router
        window.location.hash = 'writing/foo';
      },
      priority: 'high'
    }
  ]
};

// Exclusively handles business logic
class ActionPanel extends React.Component {
  render() {
    // TODO: Selectively show content for reward
    // when articlesVisible === totalArticles
    return (
      <ActionPanelView {...content} />
    );
  }
}

ActionPanel.defaultProps = {
};

ActionPanel.propTypes = {
  articlesVisible: PropTypes.number,
  totalArticles: PropTypes.number
};

export default ActionPanel;
