import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import Header from '../Header';
import Notice from '../Notice';
import ActionPanel from '../ActionPanel';
import { getEndpoint } from '../../utils/pathUtils';
import Page, { PageWidthContainer } from '../Page';
import NetworkError from '../NetworkError';
import withLibraryModel from '../../data/models/withLibraryModel';
import './TableOfContents.scss';

const ArticleList = ({ articles, priority = 'normal' }) => {
  return (<ul className="nyt-table">
    {articles.map((article, i) => (
      <li key={i} className="nyt-table-item">
        <Link to={`/article/${article.id}`}>
          <Button priority={priority}>{article.title}</Button>
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

  // TODO: It's inefficient to do all this iteration inside a render method.
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
        <p className="nyt-progress-description">
          You've read {totalArticlesRead} of {contents.length} letters.
         Read them all to reveal a reward.</p>
      </PageWidthContainer>
    </Notice>

    <PageWidthContainer>
      {unreadArticles.length > 0 && <h2>Unread</h2>}
      {unreadArticles.length > 0 && <ArticleList articles={unreadArticles} />}
      {!unreadArticles.length && <ActionPanel /> }

      {readArticles.length > 0 && (<h2>Read</h2>)}
      {readArticles.length > 0 &&
        <ArticleList articles={readArticles} priority={'low'} />}
    </PageWidthContainer>
  </Page>);
};

TableOfContentsView.propTypes = {
  totalArticlesVisible: PropTypes.number.isRequired
};

const TableOfContents = ({ articleLibraryModel }) => (
  <BrooksDataProvider
    endpoint={getEndpoint('table-of-contents')}
    onDataReadyComponent={TableOfContentsView}
    loadingErrorComponent={NetworkError}
    totalArticlesVisible={articleLibraryModel.getTotalArticlesVisible()}
    totalArticlesRead={articleLibraryModel.getTotalArticlesRead()}
    articlesReadMap={articleLibraryModel.getArticlesReadMap()}
  />
);

export default withLibraryModel(TableOfContents);
