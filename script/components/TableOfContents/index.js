import React from 'react';
import { Link } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import Header from '../Header';
import Notice from '../Notice';
import Page, { PageWidthContainer } from '../Page';
import withLibraryModel from '../../data/models/withLibraryModel';
import './TableOfContents.scss';

const ArticleList = ({ articles }) => {
  return (<ul className="nyt-table">
    {articles.map((article, i) => (
      <li key={i} className="nyt-table-item">
        <Link to={`/article/${article.id}`}>
          <Button>{article.title}</Button>
        </Link>
      </li>
    ))}
  </ul>);
};

const TableOfContentsView = ({
  totalArticlesRead,
  articlesReadMap,
  contents
}) => {
  const completion = Math.round((totalArticlesRead / contents.length) * 100);

  const readArticles = contents.filter(
    article => articlesReadMap[article.id]
  );
  const unreadArticles = contents.filter(
    article => !articlesReadMap[article.id]
  );

  return (<Page>
    <Header title="Letters" />

    <Notice>
      <PageWidthContainer>
        <h2 className="nyt-progress-header">
          <strong>Reward progress: {completion}%</strong>
        </h2>
        <progress
          min={0}
          max={100}
          value={completion}
          style={{width: '100%'}}
        />
        <p className="nyt-progress-description">
          You've read {totalArticlesRead} of {contents.length} letters.
         Read them all to unlock a reward.</p>
      </PageWidthContainer>
    </Notice>

    <PageWidthContainer>
      <h2>Unread</h2>
      <ArticleList articles={unreadArticles} />

      {readArticles.length > 0 && (<h2>Read</h2>)}
      {readArticles.length > 0 && <ArticleList articles={readArticles} />}
      

    </PageWidthContainer>
  </Page>);
};

const TableOfContents = ({ articleLibraryModel }) => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={TableOfContentsView}
    totalArticlesRead={articleLibraryModel.getTotalArticlesRead()}
    articlesReadMap={articleLibraryModel.getArticlesReadMap()}
  />
);

export default withLibraryModel(TableOfContents);
