import React from 'react';

type Item = {
  id: number;
  value: string;
  info: string;
};

type ListProps = {
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
};
export const List = ({ items, renderItem }: ListProps) => {
  return (
    <ul>
      {items.map((item: Item): React.JSX.Element => {
        return <li key={item.id}>{renderItem(item)}</li>;
      })}
    </ul>
  );
};

function Example() {
  const items = [
    { id: 1, value: 'A', info: 'lorem ipsum' },
    { id: 2, value: 'B', info: 'lorem ipsum' },
    { id: 3, value: 'C', info: 'lorem ipsum' },
  ];
  return (
    <>
      <h1>Examples of Lists</h1>
      <h2>List of items</h2>
      <List items={items} renderItem={(item) => <span>{item.value}</span>} />
      <h2>List of items with extra info</h2>
      <List
        items={items}
        renderItem={(item) => (
          <div>
            <span>{item.value}</span>
            <span>: {item.info}</span>
          </div>
        )}
      />
    </>
  );
}
