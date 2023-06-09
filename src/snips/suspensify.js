/* 
! A function that wraps a promise with a 
! Suspense-compatible interface
! As of now, Suspense only works in certain contexts
? The promise can be unwrapped by the 
? return value's `read()` method.
*/
export const suspensify = (promise) => {
  // ! type Status = 'pending' | 'error' | 'success';
  let status = 'pending';
  let response;

  // ? Keep track of the promise status
  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    }
  );

  // ? `read()` sends the data to the proper renderer
  return {
    read() {
      // ! (a) send to <Suspense>
      if (status === 'pending') {
        throw suspender;
      }
      // ! (b) send to <ErrorBoundary>
      else if (status === 'error') {
        throw response;
      }
      // ! (c) continue to render as usual with the data!
      else return response;
    },
  };
};
