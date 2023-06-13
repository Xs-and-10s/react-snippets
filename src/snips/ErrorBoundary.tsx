import { Component, ErrorInfo, ReactNode } from 'react';

// ! a minimal ErrorBoundary for Demo
// ? consider using react-error-boundary instead ?
interface Props {
  children: ReactNode;
  fallback: ReactNode;
}
interface State {
  hasError: boolean;
}
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  /*
  Another important thing to do when dealing with errors
  is to send the error info somewhere where it can
  wake up everyone who's on-call.  For this, ErrorBoundaries
  give us the `componentDidCatch` method.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Example() {
  return (
    <ErrorBoundary fallback={<div>Error caught!</div>}>
      <ErrorThrower msg={'ErrorBoundary: show fallback'} />
    </ErrorBoundary>
  );
}

function ErrorThrower({ msg }: { msg: string }) {
  try {
    throw new Error(msg);
  } catch (e) {
    throw e;
  }
  return <div>Never going to get here</div>;
}
