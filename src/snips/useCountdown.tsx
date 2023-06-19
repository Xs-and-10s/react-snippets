import { useEffect, useState } from 'react';

export const useCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [secondsLeft]);

  function start(seconds: number) {
    setSecondsLeft(seconds);
  }

  return { secondsLeft, start };
};

function Example() {
  const { secondsLeft, start } = useCountdown();

  start(3);

  return (
    secondsLeft >= 0 && <Div>I am going now. This is the end. Goodbye.</Div>
  );
}

function Div(props: React.ComponentProps<'div'>) {
  return <div {...props}>{props.children}</div>;
}
