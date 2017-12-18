import React from 'react';
import '../shared-styles/main.scss';
import './Page.scss';

const Page = ({ children }) => (
  <main className="page">{children}</main>
);

export const PageWidthContainer = ({ children }) => (
  <div className="page-width-container">
    {children}
  </div>
);


export default Page;
