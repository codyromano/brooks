function ajaxPromise(url, method = 'GET') {

  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.onload = () => resolve(request.responseText);
    request.onerror = () => reject(request);

    request.open('GET', url, true);
    request.send();
  });
}

const getJSON = url => new Promise((resolve, reject) => {
  ajaxPromise(url).then(
    response => {
      try {
        const parsed = JSON.parse(response);
        resolve(parsed);

      } catch (err) {
        reject(err);
      }
    },
    errorResponse => {
      reject(errorResponse);
    }
  );
});

export default getJSON;
