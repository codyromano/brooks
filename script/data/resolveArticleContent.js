import getJSON from './getJSON';

export default function resolveArticleContent(articleId = 0) {
  return getJSON(`./articles/article${articleId}.json`);
}
