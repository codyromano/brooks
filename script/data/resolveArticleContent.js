import getJSON from './getJSON';

export default function resolveArticleContent(articleId = null) {
  const introText = `Dear Kim,
  
  As a special Christmas gift, I made you this website featuring a collection of my best New York Times columns.`;

  const introContent = {
    articleId: 'intro',
    headerTitle: 'Letters from David Brooks',
    featuredImageSrc: 'https://www.catholicnewsagency.com/images/DAVID_BROOKS_Credit_David_Burnett_BW_2011_CNA_5_19_15.jpg',
    continueButtonText: 'Start Reading',
    articleText: introText
  };

  return getJSON('./articles/intro.json');
}
