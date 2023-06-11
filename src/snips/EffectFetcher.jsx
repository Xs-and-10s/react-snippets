import { useEffect } from 'react';

const EffectFetcher = ({ id }) => {
  const [user, setUser] = setState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <span>{user.name}</span>
    </div>
  );
};