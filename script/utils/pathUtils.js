export const getCurrentDomain = () => {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}`;
};

// TODO: Look into using GraphQL instead
export const getEndpoint = (name, argsMap = {}) => {
  const domain = getCurrentDomain();
  const port = 9980;

  const endpoints = {
    'table-of-contents': `${domain}:${port}/table-of-contents`,
    'get-article-by-id': `${domain}:${port}/article/id/{{id}}`
  };

  let endpoint = endpoints[name];
  if (!endpoint) {
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }

  for (const argName in argsMap) {
    const value = argsMap[argName];
    endpoint = endpoint.replace(`{{${argName}}}`, value);
  }

  return endpoint;
};
