import { useDeferredValue } from 'react';

const Example = () => {
  const [tasks] = useTasks();
  const [filters, setFilter] = useFilters(initialFilters);
  const deferredFilters = useDeferredValue(filters);

  const visibleTasks = useMemo(
    () => filterTasks(tasks, deferredFilters),
    [tasks, deferredFilters]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter(name, value);
  };

  return (
    <main>
      {deferredFilters !== filters && <p>Loading...</p>}
      <Filters filters={filterInputs} onChange={handleChange} />
      <Tasks tasks={visibleTasks} />
    </main>
  );
};

/* 
! filtering in this case will be expensive !
*/
function filterTasks(tasks, filters) {}

function useTasks() {}

function useFilters(initial) {}

function Filters() {}

function Tasks() {}
