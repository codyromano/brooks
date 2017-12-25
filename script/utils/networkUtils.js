export function fetchJSONWithTimeout(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    let fetchTimeout = null;

    if (timeout > 0) {
      const errorMessage = `Request timed out because endpoint ${url}
        took longer than ${timeout} to respond with JSON.`
      fetchTimeout = window.setTimeout(() => reject(errorMessage), timeout);
    }

    window.fetch(url)
      .then(xhrResponse => xhrResponse.json(), reject)
      .then(parsedJSON => {
        window.clearTimeout(fetchTimeout);
        resolve(parsedJSON)
      }, reject);
  });
}
