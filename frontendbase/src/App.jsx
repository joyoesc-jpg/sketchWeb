import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import EditorPage from "./pages/EditorPage";
import GalleryPage from "./pages/GalleryPage";
import LogInPage from "./pages/LogInPage";
import { LogIn } from "./utils/dbUtils";

function App() {

  const [idUser, setIdUser] = useState(-1);
  const [idProject, setIdProject] = useState(-1);

  const saveIdProject = id => {
    localStorage.setItem("idProject", id);
    setIdProject(id);
  }

  const saveIdUser = id => {
    localStorage.setItem("idUser", id);
    setIdUser(id);
  }

  useEffect(()=>{
    const idU = new Number(localStorage.getItem("idUser"));
    const idP = new Number(localStorage.getItem("idProject"));
    if(idU){
      setIdUser(idU);
    }else{
      localStorage.setItem("idUser", -1);
    }

    if(idP){
      setIdProject(idP);
    }else{
      localStorage.setItem("idProject", -1);
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <GalleryPage 
              idUser={idUser}
              setIdProject={saveIdProject}
            />
          }/>
          <Route path="/edit" element={
            <EditorPage
              idUser={idUser}
              idProject={idProject}
              setIdProject={saveIdProject}
            />
          }/>
          <Route path="/login" element={
            <LogInPage setIdUser={saveIdUser}/>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;