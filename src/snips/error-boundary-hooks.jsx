import { Suspense, useEffect, useState } from 'react';

/* 
  ErrorBoundary catches most errors, 
  but there are a few that slip through the cracks.
  the following trick can be used to get ErrorBoundaries
  to catch the errors.
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

  // a minimal ErrorBoundary for Demo
  class ErrorBoundary extends React.Component {
    state = { hasError: false };
    constructor(props) {
      super(props);
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    /*
    Another important thing to do when dealing with errors
    is to send the error iinfo somewhere where it can
    wake up everyone who's on-call.  For this, ErrorBoundaries
    give us the `componentDidCatch` method.
     */
    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
      return this.props.children;
    }
  }
};

/* 
! A method for errors in async contexts
*/
const useThrowAsyncError = () => {
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
    const promise = fetch('/err')
      .then((res) => res.json())
      .catch((e) => {
        throwAsyncError(e);
      });
    return () => promise.finally(() => 'doCleanup');
  }, []);
}

/* 
! A method for dangerous event callbacks
*/
const useHandlerWithPotentialError = (callback) => {
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

/* 
? DEMO !!
*/
function Demo() {
  return (
    <>
      <ErrorBoundary fallback={<div>Error while fetching!</div>}>
        <Suspense>
          <AsyncErrorComponent />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error while clicking!</div>}>
        <DangerousClickHandlerComponent />
      </ErrorBoundary>
    </>
  );
}
