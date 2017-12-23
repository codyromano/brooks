import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import Header from '../Header';
import Notice from '../Notice';
import ActionPanel from '../ActionPanel';
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
  totalArticlesVisible,
  articlesReadMap,
  contents
}) => {
  const completion = Math.round((totalArticlesRead / contents.length) * 100);

  const visibleArticles = contents.slice(0, totalArticlesVisible);

  const readArticles = visibleArticles.filter(
    article => articlesReadMap[article.id]
  );
  const unreadArticles = visibleArticles.filter(
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
         Discover them all to unlock a reward.</p>
      </PageWidthContainer>
    </Notice>

    <PageWidthContainer>
      {unreadArticles.length > 0 && <h2>Unread</h2>}
      {unreadArticles.length > 0 && <ArticleList articles={unreadArticles} />}

      {!unreadArticles.length &&
        <ActionPanel />
      }

      {readArticles.length > 0 && (<h2>Read</h2>)}
      {readArticles.length > 0 && <ArticleList articles={readArticles} />}
      

    </PageWidthContainer>
  </Page>);
};

TableOfContentsView.propTypes = {
  totalArticlesVisible: PropTypes.number.isRequired
};

const TableOfContents = ({ articleLibraryModel }) => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={TableOfContentsView}
    totalArticlesVisible={articleLibraryModel.getTotalArticlesVisible()}
    totalArticlesRead={articleLibraryModel.getTotalArticlesRead()}
    articlesReadMap={articleLibraryModel.getArticlesReadMap()}
  />
);

export default withLibraryModel(TableOfContents);
