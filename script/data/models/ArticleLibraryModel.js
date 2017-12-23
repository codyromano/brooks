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
      articleMostRecentReadTime: null,
      articlesVisible: 3,
      timeWhenArticleReady: null 
    };
  }
  getTimeArticleReady() {
    return this.timeWhenArticleReady;
  }
  requestNewArticle() {
    // TODO: Experiment with different timing function
    const millisecondsFromNow = this.getTotalArticlesVisible() * 2 * 1000;
    this.timeWhenArticleReady = new Date().getTime() + millisecondsFromNow;
    this.save();

    return true;
  }
  isWritingInProgress() {
    return Number.isInteger(this.timeWhenArticleReady) &&
      this.timeWhenArticleReady > new Date().getTime();
  }
  getTotalArticlesVisible() {
    return this.articlesVisible;
  }
  increaseTotalArticlesVisible(totalAvailable) {
    // Unlock a random number of articles just to keep things interesting
    const extraArticles = Math.round(
      Math.max(1, Math.random() * 3)
    );

    if (totalAvailable) {
      const newAmount = Math.min(
        totalAvailable,
        this.articlesVisible + extraArticles
      );
      this.articlesVisible = newAmount;
      this.save();

      return true;
    }
    return false;
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
