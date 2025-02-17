import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filteredTasks: []
};



export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
   
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      
    },
    editTask: (state, action) => {
      const { id, title, description, portada, imágenes, date } =
        action.payload;

      const foundTask = state.tasks.find((task) => task.id === id);

      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
        foundTask.portada = portada;
        foundTask.imágenes = imágenes;
        foundTask.date = date;
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));


    },
    deleteTask: (state, action) => {
      const stateFound = state.tasks.find((task) => task.id === action.payload);
      if (stateFound) {
        state.tasks.splice(state.tasks.indexOf(stateFound), 1);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));

      }
    },
    filterTasks: (state, action) => {
    
      state.filteredTasks = state.tasks.filter(task => 
        task.title.includes(action.payload) || 
        task.description.includes(action.payload)
      );
    },
    
    resetFilter: (state) => {
      state.filteredTasks = state.tasks;
    },
  },
});

export const { addTask, deleteTask, editTask, filterTasks, resetFilter, setTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
