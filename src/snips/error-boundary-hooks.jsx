import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

/* 
?  ErrorBoundary catches most errors, 
?  but there are a few that slip through the cracks.
!  the following trick can be used to get ErrorBoundaries
!  to catch the errors.
*/
const ComponentErrorBoundaryTrick = () => {
  // create some random state that we'll use to throw errors
  const [, setState] = useState();

  const onSomethingThatErrors = () => {
    try {
      // something went wrong
    } catch (e) {
      // trigger state update with updater function
      setState(() => {
        // throw the error, and the error boundary will catch it
        // it will be triggered during state update
        throw e;
      });
    }
  };
};

///////////////////////////////////////

/* 
! A method for errors in async contexts
*/
export const useThrowAsyncError = () => {
  {
    const [, setState] = useState();
    return (error) => {
      setState(() => {
        throw error;
      });
    };
  }
};
function AsyncErrorComponent() {
  const throwAsyncError = useThrowAsyncError();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const promise = fetch('/err', { signal })
      .then((res) => res.json())
      .catch((e) => {
        throwAsyncError(e);
      });
    return () => {
      promise.finally(() => 'doCleanup');
      controller.abort();
    };
  }, []);
}

////////////////////////////////////////

/* 
! A method for dangerous event callbacks
*/
export const useHandlerWithPotentialError = (callback) => {
  const [, setState] = useState();
  return (...args) => {
    try {
      callback(...args);
    } catch (e) {
      setState(() => {
        throw e;
      });
    }
  };
};
function DangerousClickHandlerComponent() {
  const onClick = () => {
    // do something dangerous here
  };
  const onClickWithErrorHandler = useHandlerWithPotentialError(onClick);

  return <button onClick={onClickWithErrorHandler}>click me!</button>;
}

///////////////////////////////////////

/* 
? Examples !!
*/
function Examples() {
  return (
    <>
      <ErrorBoundary fallback={<div>Error while fetching!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncErrorComponent />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error while clicking!</div>}>
        <DangerousClickHandlerComponent />
      </ErrorBoundary>
    </>
  );
}
