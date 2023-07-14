type ButtonProps = (
  | {
      as: 'a';
      href: string;
    }
  | {
      as: 'button';
      onClick: () => void;
    }
) & {
  children?: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  if (props.as === 'a') {
    return (
      <a href={`${props.href}`}>{props.children ? props.children : null}</a>
    );
  } else if (props.as === 'button') {
    return (
      <button onClick={props.onClick}>
        {props.children ? props.children : null}
      </button>
    );
  } else {
    return null;
  }
};

function Example() {
  <>
    <Button as="a" href="/">
      Home
    </Button>
    <Button as="button" onClick={handleClick}>
      Login
    </Button>
  </>;
}

function handleClick() {}
