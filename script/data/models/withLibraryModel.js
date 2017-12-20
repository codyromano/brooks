import React from 'react';
import ArticleLibraryModel from './ArticleLibraryModel';

const withLibraryModel = (Component) => (props) => {
  const modelProps = {
    articleLibraryModel: new ArticleLibraryModel()
  };

  return (<Component
    {...props}
    {...modelProps}
  />);
};

export default withLibraryModel;
