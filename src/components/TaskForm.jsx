import { useEffect, useState } from "react";
import { TaskSaveImg } from "./TaskSaveImg";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, resetFilter } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { v4 as uuid } from "uuid";

export const TaskForm = () => {
  const tasks = useSelector((state) => state.tasks);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cover, setCover] = useState();
  const [carrusel, setCarrusel] = useState([]);
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    portada: "",
    imágenes: [],
    date: "",
  });

  useEffect(() => {
    if (params.id) {
      const taskToEdit = tasks.tasks.find((task) => task.id === params.id);
      if (taskToEdit) {
        setTask(taskToEdit);
        setCover(taskToEdit.portada || null);
        setCarrusel(taskToEdit.imágenes || []);
      }
    }
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "portada" && files.length > 0) {
      const fileUrl = files[0];

      if (fileUrl) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          setCover(imageData);
          setTask((prevTask) => ({ ...prevTask, portada: imageData })); // 
        };
        reader.readAsDataURL(fileUrl);
      }
    } else {
      setTask((prevTask) => ({ ...prevTask, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    params.id
      ? dispatch(editTask(task))
      : dispatch(addTask({ ...task, id: uuid() }));

    dispatch(resetFilter());
    navigate("/");
  };

  const handleFilesChange = (updatedFiles) => {
    const newImageFiles = updatedFiles.map((file) => file.preview);

    const uniqueNewImages = newImageFiles.filter(
      (newImage) => !carrusel.includes(newImage)
    );

    const updatedCarrusel = [...carrusel, ...uniqueNewImages];
    setCarrusel(updatedCarrusel);
    setTask({ ...task, imágenes: updatedCarrusel });
  };

  const handleDelete = (indexToDelete) => {

    const newFiles = carrusel.filter((_, index) => index !== indexToDelete);

    setCarrusel(newFiles);
    setTask({ ...task, imágenes: newFiles });
  };

  return (
    <section>
      <div className="w-[300px] sm:w-11/12 sm:mx-auto  pr-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {params.id ? "Edit" : "Create"} Memories
          </h1>
          <p className="mt-4 text-gray-500">
            Fill in the details to {params.id ? "Edit" : "Create"} a new
            Memories.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter title"
              onChange={handleChange}
              value={task.title}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              id="description"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter description"
              value={task.description}
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full max-w-[90%] mx-auto sm:max-w-[400px]">
            <label className="w-full">
              <input
                type="file"
                name="portada"
                className="w-full text-sm text-gray-500
        file:mr-2 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-medium file:opacity-40
        file:bg-gray-400 file:text-white
        hover:file:cursor-pointer hover:file:bg-gray-300
        hover:file:text-gray-700"
                onChange={handleChange}
              />
            </label>
            {cover && (
              <img
                src={cover}
                className="w-full h-auto max-h-[200px] sm:max-h-full rounded-lg object-cover"
              />
            )}
          </div>

          {/* Images URLs */}
          <div>
            <TaskSaveImg
              carrusel={carrusel}
              onFilesChange={handleFilesChange}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {carrusel.length > 0 ? (
                carrusel.map((image, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <img
                      src={image}
                      alt={`Imagen ${index}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete className="w-6 h-6" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xl mx-auto font-light">
                  The pictures are still missing
                </p>
              )}
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="sr-only">
              Date
            </label>
            <input
              value={task.date}
              name="date"
              id="date"
              type="date"
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-sm"
            >
              {params.id ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
