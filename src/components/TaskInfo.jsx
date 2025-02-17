import { useDispatch } from "react-redux";
import { TaskCarrusel } from "./TaskCarrusel";
import { TaskMordal } from "./TaskMordal";
import { GrFormClose, GrEdit, GrTrash } from "react-icons/gr";
import { deleteTask, resetFilter } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export const TaskInfo = ({ open, setOpenModal, task }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    dispatch(resetFilter());
  };

  return (
    <section>
      {open && (
        <TaskMordal open={open} onClose={setOpenModal}>
          <figure className="absolute -top-10 left-0 w-full">
            <TaskCarrusel task={task} />
          </figure>

          <div className="w-full sm:w-[40%] absolute mt-2 top-[60%] sm:top-0 sm:right-0 text-white px-4 sm:px-2 ">
            <div className="flex justify-between mb-2 ">
              <h1 className="text-lg sm:text-xl text-amber-300">
                {task.title}
              </h1>
              <button
                onClick={() => setOpenModal(false)}
                className="text-3xl sm:text-4xl flex justify-center items-center rounded-xl"
              >
                <GrFormClose className="text-white" />
              </button>
            </div>

            <article className="font-light">
              <p className="text-sm  py-2 overflow-y-scroll h-40 font-light">
                {task.description}
              </p>
              <span className="text-amber-100">{task.date}</span>
            </article>

            <footer className="flex gap-3 sm:gap-10 mt-10 sm:mt-20 justify-end">
              <Link to={`/edit/${task.id}`}>
                <button
                  className="flex rounded-sm bg-white items-center gap-2 border-e p-2 sm:p-3 text-gray-700 hover:bg-gray-300"
                  title="Edit Product"
                >
                  Edit
                  <GrEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="flex bg-white items-center gap-2 p-2 sm:p-3 text-gray-700 hover:bg-gray-300 rounded-sm"
                title="Delete Product"
              >
                Delete
                <GrTrash />
              </button>
            </footer>
          </div>
        </TaskMordal>
      )}
    </section>
  );
};
