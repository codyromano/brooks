import React from 'react';
import ArticleLibraryModel from './ArticleLibraryModel';

const withLibraryModel = (Component) => (props) => {
  const modelProps = {
    articleLibraryModel: new ArticleLibraryModel()
  };

  return (<Component
    {...modelProps}
    {...props}
  />);
};

export default withLibraryModel;
