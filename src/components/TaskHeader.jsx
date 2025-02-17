import { AiOutlineHome } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export const TaskHeader = () => {
  return (
    <header className=" ">
      <nav className=" relative px-4 py-5   w-11/12 mx-auto bg-white border border-gray-200 rounded-[2rem] flex   mb-6  dark:bg-neutral-900 dark:border-neutral-700  justify-between  ">
        <div className="flex">
          <h1 className="text-sm  px-2 font-bold text-white sm:text-xl">
            Memory of you
          </h1>
        </div>

        <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200">
          <li className="flex items-center">
            <Link to="/">
              <a className="flex h-10 items-center gap-1.5 bg-gray-100 px-2 transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white">
                <AiOutlineHome />

                <span className="text-xs font-medium"> Home </span>
              </a>
            </Link>
          </li>

          <li className="relative flex items-center">
            <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-800"></span>
            <Link to="/create">
              <a className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-900 dark:hover:text-white">
                Add
                <IoMdAdd className="ml-2" />
              </a>
            </Link>
          </li>
        </ol>
      </nav>
    </header>
  );
};
