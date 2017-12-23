import React from 'react';
import { Link } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import Header from '../Header';
import Notice from '../Notice';
import Page, { PageWidthContainer } from '../Page';
import withLibraryModel from '../../data/models/withLibraryModel';
import './TableOfContents.scss';

const TableOfContentsView = ({ articlesRead, contents }) => {
  const completion = Math.round((articlesRead / contents.length) * 100);

  return (<Page>
    <Header title="Letters" />

    <Notice>
      <PageWidthContainer>
        <h2 className="nyt-progress-header">
          <strong>Progress: {completion}%</strong>
        </h2>
        <progress min={0} max={100} value={completion} style={{width: '100%'}}/>
        <p className="nyt-progress-description">
          You've read {articlesRead} of {contents.length} letters.
         Read them all to unlock a reward.</p>
      </PageWidthContainer>
    </Notice>

    <PageWidthContainer>
      <ul className="nyt-table">
        {contents.map((article, i) => (
          <li key={i} className="nyt-table-item">
            <Link to={`/article/${article.id}`}>
              <Button>{article.title}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </PageWidthContainer>
  </Page>);
};

const TableOfContents = ({ articleLibraryModel }) => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={TableOfContentsView}
    articlesRead={articleLibraryModel.getTotalArticlesRead()}
  />
);

export default withLibraryModel(TableOfContents);
