import { TaskFilter } from "./TaskFilter";
import { TaskList } from "./TaskList";
import { TaskMordal } from "./TaskMordal";

export const TaskHome = () => {
  return (
    <>
      <TaskMordal />
      <TaskFilter />
      <TaskList />
    </>
  );
};
