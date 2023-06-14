import {
  MouseEvent,
  MouseEventHandler,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { ErrorBoundary } from './ErrorBoundary';

/* 
?  ErrorBoundary catches most errors, 
?  but there are a few that slip through the cracks.
!  the following basic trick can be used to get ErrorBoundaries
!  to catch the errors.  I know of two variations: 
    * one for catching promise errors
    * another for catching onclick errors
*/
const ComponentErrorBoundaryTrick = () => {
  // create some random state that we'll use to throw errors
  const [, setState] = useState();
  // something that could error
  return () => {
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
! A method for errors in `.catch(e)` contexts
*/
export const useThrowAsyncError = () => {
  const [, setState] = useState();
  return <T,>(error: T extends Error ? T : never) => {
    setState(() => {
      throw error;
    });
  };
};
function AsyncErrorExample() {
  const [, setData] = useState();
  const throwAsyncError = useThrowAsyncError();

  useEffect(() => {
    fetch('/err')
      .then((res) => res.json())
      .catch((e) => {
        /* 
        ! use the hook to throw the error ! 
        */
        throwAsyncError<typeof e>(e);
      })
      .then((d) => setData(d));

    return () => {
      /* do cleanup here if necessary */
    };
  }, []);

  return <div>Fetching</div>;
}

////////////////////////////////////////

/* 
! A method for dangerous event callbacks
*/
export const useThrowableMouseHandler = <T,>(
  callback: MouseEventHandler<T>
) => {
  const [, setState] = useState();
  return (event: MouseEvent<T>) => {
    try {
      callback(event);
    } catch (e) {
      setState(() => {
        throw e;
      });
    }
  };
};
function DangerousClickHandlerExample() {
  const onClickWithErrorHandler = useThrowableMouseHandler<HTMLButtonElement>(
    (evt) => {
      evt.preventDefault();
      /* 
      ! do something dangerous here that could throw an error !
      */
      throw new Error('');
    }
  );

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
          <AsyncErrorExample />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Error while clicking!</div>}>
        <DangerousClickHandlerExample />
      </ErrorBoundary>
    </>
  );
}
