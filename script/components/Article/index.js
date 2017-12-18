import React from 'react';
import '../shared-styles/main.scss';
import './Article.scss';

const Article = ({ content }) => (
  <article className="nyt-article">
    {content.split('\n').map((paragraphText, index) => (
      <p key={index} className="nyt-article-paragraph">
        {paragraphText}
      </p>
    ))}
  </article>
);

export default Article;
