import { Suspense, useEffect, useState } from 'react';

type User = {
  name: string;
};
const EffectFetcher = ({ id }: { id: number }) => {
  const [user, setUser] = useState<User>();

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
    <Suspense fallback={<span>Loading...</span>}>
      <div>
        <span>{user && user.name}</span>
      </div>
    </Suspense>
  );
};
