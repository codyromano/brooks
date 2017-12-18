function ajaxPromise(url, method = 'GET') {

  const request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.onload = () => resolve(request.responseText);
    request.onerror = () => reject(request);

    request.open('GET', url, true);
    request.send();
  });
}

/*
function handleJSONResponse(resolve, reject, request) {
  console.log(request);

  if (request.status < 200 || request.status >= 400) {
    reject(request);
    return false;
  }
  try {
    const parsed = JSON.parse(request.responseText);
    resolve(parsed);
    return true;

  } catch (err) {
    reject(err);
  }
  return false;
}
*/

const getJSON = url => new Promise((resolve, reject) => {
  ajaxPromise(url).then(
    response => {
      try {
        console.log(response);
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
