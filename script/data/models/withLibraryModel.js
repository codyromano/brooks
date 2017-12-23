import React from 'react';
import PropTypes from 'prop-types';
import ArticleLibraryModel from './ArticleLibraryModel';

const modelProps = {
  articleLibraryModel: new ArticleLibraryModel()
};

export const articleLibraryModelShape = PropTypes.shape({
  isWritingInProgress: PropTypes.func.isRequired,
  getTotalArticlesVisible: PropTypes.func.isRequired
  // TODO: Add other methods
}).isRequired;

const withLibraryModel = (Component) => (props) => {
  return (<Component
    {...props}
    {...modelProps}
  />);
};

export default withLibraryModel;
