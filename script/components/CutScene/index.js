import React from 'react';
import Header from '../Header';
import { PageWidthContainer } from '../Page';
import './CutScene.scss';

// General cutscene
const CutScene = ({
  heading,
  youTubeId
}) => {
  const videoSrc = `https://www.youtube-nocookie.com/embed/${youTubeId}?rel=0&amp;showinfo=0`;

  return (<div className="cut-scene">
    <Header title={heading} />
    <div className="cut-scene-video-container">
      <PageWidthContainer>
        <iframe
          className="cut-scene-video"
          src={videoSrc}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      </PageWidthContainer>
    </div>
  </div>);
};

// Cutscene implementation for final reward (bonus content)
export const BonusContentCutScene = () => (
  <CutScene
    heading={`"The Next Big Challenge"`}
    youTubeId="PertBYAnQok"
  />
);

export default CutScene;
