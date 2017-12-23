import React from 'react';
import '../shared-styles/main.scss';
import './Article.scss';

const Article = ({ content }) => (
  <article className="nyt-article">
    <p key={'intro'} className="nyt-article-paragraph">
      Dear Kim,
    </p>

    {content.split('\n').map((paragraphText, index) => (
      <p key={index} className="nyt-article-paragraph">
        {paragraphText}
      </p>
    ))}

    <p key={'outro'} className="nyt-article-paragraph">
      Sincerely,<br/>
      David Brooks
    </p>
  </article>
);

export default Article;
