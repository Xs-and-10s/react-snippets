import { ReactNode } from 'react';

type RenderStates = 'pending' | 'error' | 'success';

type CasesProps<T extends string> = {
  match: T;
  [x: string]: ReactNode;
};
const Cases = ({ match, ...rest }: CasesProps<RenderStates>) => {
  if (rest[match]) {
    return rest[match];
  }
  return false;
};

function Example() {
  return (
    <>
      <Cases
        match={'pending'}
        pending={<Div>loading...</Div>}
        error={<Div>Something went wrong.</Div>}
        success={<Div>Bingo.</Div>}
      />
      <Cases
        match={'error'}
        pending={<Div>loading...</Div>}
        error={<Div>Something went wrong.</Div>}
        success={<Div>Bingo.</Div>}
      />
      <Cases
        match={'success'}
        pending={<Div>loading...</Div>}
        error={<Div>Something went wrong.</Div>}
        success={<Div>Bingo.</Div>}
      />
    </>
  );
}

function Div(props: React.ComponentProps<'div'>) {
  return <div {...props}>{props.children}</div>;
}
