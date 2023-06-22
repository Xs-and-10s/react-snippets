import React from 'react';

type UnlessProps = {
  it: boolean;
  render: () => React.ReactNode;
  otherwise?: () => React.ReactNode;
};
/**
 * ! Works primarily as a guard clause, but potentially however
 * ! you can creatively find a use!
 * ? `Unless` is basically the inversion of `If`
 * ? if `it` is true, then don't render, unless `otherwise` prop exists.
 */
export const Unless = ({ it, render, otherwise }: UnlessProps) => {
  if (it === false) {
    return render();
  }
  if (otherwise) {
    return otherwise();
  }
  return null;
};

function RenderNothingExample() {
  const isReady = true;

  return <Unless it={isReady} render={() => <Div>Won't render</Div>} />;
}

function RenderSpinnerExample() {
  const isReady = false;

  return <Unless it={isReady} render={() => <Div>Spinner</Div>} />;
}

function OtherwiseRenderExample() {
  const isLoading: boolean = true;
  const hasAnError: boolean = false;

  return (
    <Unless
      it={isLoading || hasAnError}
      render={() => <Div>The Happy Path Not Taken</Div>}
      otherwise={() => <Div>The Path Sometimes Taken</Div>}
    />
  );
}

function Div(props: React.ComponentProps<'div'>) {
  return <div {...props}>{props.children}</div>;
}
