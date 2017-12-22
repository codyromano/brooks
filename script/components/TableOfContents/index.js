import React from 'react';
import BrooksDataProvider from '../BrooksDataProvider';

const TableOfContentsView = ({ contents }) => (
  <ul>
    {contents.map(article => (
      <li>{article.title}</li>
    ))}
  </ul>
);

const TableOfContents = () => (
  <BrooksDataProvider
    endpoint="http://localhost:9980/table-of-contents"
    onDataReadyComponent={TableOfContentsView}
  />
);

export default TableOfContents;
