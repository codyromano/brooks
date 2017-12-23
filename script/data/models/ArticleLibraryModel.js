import BaseModel from './BaseModel';

const ARTICLE_LIB_STORAGE_KEY = 'articleLibrary';

export default class ArticleLibraryModel extends BaseModel {
  constructor(storageNamespace = 'defaultArticleLibrary') {
    super(storageNamespace);
    Object.assign(this, this.getInitialModelState());
  }
  getDefaultModelState() {
    return {
      // Maps article id to timestamp when article was first read
      articleFirstReadTimes: {},
      // Time when the most recent article was initially read
      articleMostRecentReadTime: null
    };
  }
  getArticlesReadMap() {
    return this.articleFirstReadTimes;
  }
  getTotalArticlesRead() {
    return Object.keys(this.articleFirstReadTimes).length;
  }
  getInitialModelState() {
    const stored = super.get(ARTICLE_LIB_STORAGE_KEY);
    return stored || this.getDefaultModelState();
  }
  isRead(articleId) {
    return this.articleFirstReadTimes[articleId];
  }
  save() {
    super.set(ARTICLE_LIB_STORAGE_KEY, this);
  }
  markArticleAsRead(articleId) {
    if (articleId === 0) {
      return false;
    }

    if (!this.isRead(articleId)) {
      const now = new Date().getTime();
      this.articleFirstReadTimes[articleId] = now;
      this.articleMostRecentReadTime = now;

      this.save();
      return true;
    }
    return false;
  }
}
