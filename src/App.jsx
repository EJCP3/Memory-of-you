import { TaskHeader } from "./components/TaskHeader";
import { TaskForm } from "./components/TaskForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskHome } from "./components/TaskHome";

function App() {

  return (
    <main className="w-11/12 container mx-auto p-10 lg-w-[1100px]">
      <BrowserRouter>
      <TaskHeader />
     
        <Routes>
       
          <Route path="/" element={ <TaskHome />}/>
          <Route path="/create" element={ <TaskForm />}/>
          <Route path="/edit/:id" element={ <TaskForm />}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
