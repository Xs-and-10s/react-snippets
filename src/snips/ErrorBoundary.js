// ! a minimal ErrorBoundary for Demo
// ? consider using react-error-boundary instead ?
export class ErrorBoundary extends React.Component {
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
