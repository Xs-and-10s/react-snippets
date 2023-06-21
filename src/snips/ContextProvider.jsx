import { createContext, useReducer /* , useState */ } from 'react';

export const ItemsContext = createContext({});
export const ItemActionsContext = createContext({});

export const ItemsProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, getInitialItems());

  return (
    <ItemActionsContext.Provider value={dispatch}>
      <ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>
    </ItemActionsContext.Provider>
  );
};

export function Item({ item }) {
  // const [editing, setEditing] = useState(false);
  const dispatch = useContext(ItemActionsContext);

  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        id={`toggle-${item.id}`}
        onChange={() => dispatch(update({ id: item.id, packed: !item.packed }))}
      />
    </li>
  );
}

function Example() {
  const items = useContext(ItemsContext);

  return (
    <main>
      <header>Items</header>
      <section>
        <ul>
          {items.map((item) => {
            return <Item item={item} />;
          })}
        </ul>
      </section>
    </main>
  );
}

function update() {}

function reducer() {}

function getInitialItems() {}
