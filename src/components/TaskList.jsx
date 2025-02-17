import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "./TaskCard";
import { useEffect } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { resetFilter } from "../features/tasks/taskSlice";

export const TaskList = () => {
  const filteredTasks = useSelector((state) => state.tasks.filteredTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
  }, [resetFilter]);

  return (
    <section className="w-11/12 grid gap-2 grid-cols-1 sm:grid-cols-2 mx-auto place-items-center lg:grid-cols-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className=" flex  justify-center items-center text-2xl mt-4 text-center col-span-4 gap-1 text-gray-500">
          Memory not found <TbFaceIdError className="w-10" />
        </p>
      )}
    </section>
  );
};
