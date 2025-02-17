import { useState } from "react";
import { TaskInfo } from "./TaskInfo";

export const TaskCard = ({ task }) => {
  const [open, setOpenModal] = useState(false);

  return (
    <article
      className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg w-full max-w-[260px] h-56 mx-auto"
      onClick={() => setOpenModal(!open)}
    >
      <img
        alt=""
        src={task.portada}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-[62%]  lg:pt-[60%]">
        <div className="py-2 px-3 sm:py-4">
          <time className="block text-xs text-white/90">{task.date}</time>

          <a href="#">
            <h3 className="mt-1 text-base sm:text-lg text-white">
              {task.title}
            </h3>
          </a>
        </div>
      </div>

      <TaskInfo open={open} setOpenModal={setOpenModal} task={task} />
    </article>
  );
};
