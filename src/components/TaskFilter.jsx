import { GrClearOption, GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTasks,
  resetFilter,
  
} from "../features/tasks/taskSlice";
import { useState } from "react";

export const TaskFilter = () => {
  const [filters, setFilters] = useState({ search: "", date: "" });
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();


  const handleSearch = (e) => {


    let { value, name } = e.target;

    setFilters(() => ({
      [name]: value,
    }));

    if (!value) {
      dispatch(resetFilter());
      return;
    }
  
    const filteredTasks  =
    name === "search"
        ? tasks.filter((task) =>
            task.title.toLowerCase().includes(value.toLowerCase())
          )
          : tasks.filter((task) => task.date === value);
          
          
           dispatch(filterTasks({ filteredTasks }));
    
  };

  const handleReset = (e) => {
    dispatch(resetFilter())
    setFilters({ search: "", date: "" });
    };

  // const handleChangeSearch = (e) => {
  //   const { value, name } = e.target;

  //   console.log(value)

  //   if (value.trim() === "") {
  //     // Restablece la lista filtrada si el valor del input está vacío
  //     dispatch(resetFilter());
  //     return;
  //   }

  //   const taskfound =
  //     name === "search"
  //       ? tasks.filter((task) =>
  //         task.title.toLowerCase().includes(value.toLowerCase()))
  //       : tasks.filter((task) => task.date === value);

  //       console.log(taskfound)
  //       if(taskfound.length > 0)
  //         {
         
  //         dispatch(filterTasks(...taskfound))
  //       }
        
  //   //  taskfound.lenght > 0
  //   //    ? dispatch(filterTasks({ field: name, value }))
  //   //    : dispatch(resetFilter());
  // };

  return (
    <div className="w-80 sm:w-11/12 flex sm:flex-nowrap mx-auto  flex-wrap gap-4  my-4">
      <div className="w-[300px] relative">
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search for...{" "}
        </label>

        <input
          name="search"
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full text-gray-300 rounded-md border-gray-200 py-2.5 pe-10 px-2 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800  "
          onChange={handleSearch}
          value={filters.search}
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="sr-only">Search</span>

            <GrSearch />
          </button>
        </span>
      </div>

      <div className="w-[200px]">
        <input
          onChange={handleSearch}
          name="date"
          value={filters.date}
          id="date-picker"
          type="date"
          className="bg-gray-800 border border-gray-800 rounded-md p-2 w-full   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-400 "
        />
      </div>
      <button
        onClick={handleReset}
        className="flex items-center   gap-1  bg-gray-800 rounded-md text-center px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-black focus:relative"
      >
        Clear
        <GrClearOption />
      </button>
    </div>
  );
};
