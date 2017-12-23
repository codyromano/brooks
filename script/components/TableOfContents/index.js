import React from 'react';
import { Link } from 'react-router-dom';
import BrooksDataProvider from '../BrooksDataProvider';
import Button from '../Button';
import Header from '../Header';
import Page, { PageWidthContainer } from '../Page';
import './TableOfContents.scss';

const TableOfContentsView = ({ contents }) => (
  <Page>
    <Header title="Letters" />
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
  </Page>
);

const TableOfContents = () => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={TableOfContentsView}
  />
);

export default TableOfContents;
