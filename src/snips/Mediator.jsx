import { useState } from 'react';

export const Mediator = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((n) => n + 1);
  };
  const decrementCount = () => {
    setCount((n) => n - 1);
  };

  // Pass state add event handlers as props to children
  return children({ count, incrementCount, decrementCount });
};

// ? child Component
const Counter = ({ count, incrementCount, decrementCount }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

function Example() {
  return (
    <Mediator>
      {({ count, incrementCount, decrementCount }) => (
        <Counter
          count={count}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
        />
      )}
    </Mediator>
  );
}
