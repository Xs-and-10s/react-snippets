import { useTransition } from 'react';

const Example = () => {
  const [tasks] = useTasks();
  const [filters, setFilter] = useFilters(initialFilters);
  const [filterInputs, setFilterInputs] = useFilters(initialFilters);
  const [isPending, startTransition] = useTransition();

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterInputs(name, value);
    startTransition(() => {
      setFilter(name, value); // expensive
    });
  };

  return (
    <main>
      {isPending && <p>Loading...</p>}
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
