import React from 'react';

type IfProps = {
  isTrue: boolean;
  thenRender: () => React.ReactNode;
  otherwise?: () => React.ReactNode;
};
export const If = ({ isTrue, thenRender, otherwise }: IfProps) => {
  if (true === isTrue) {
    return thenRender();
  }
  if (otherwise) {
    return otherwise();
  }
  return false;
};

function Examples() {
  const iWontRender: string = "I won't render";
  const thisIsFine: string = '...';

  return (
    <>
      <If
        isTrue={2 + 2 === 5}
        thenRender={() => <Div>Newspeak</Div>}
        otherwise={() => <Div>That's incorrect</Div>}
      />
      <If isTrue={1 + 1 === 2} thenRender={() => <Div>You and I</Div>} />
      <If
        isTrue={iWontRender === thisIsFine}
        thenRender={() => <div>nothing</div>}
      />
    </>
  );
}

function Div(props: React.ComponentProps<'div'>) {
  return <div {...props}>{props.children}</div>;
}
