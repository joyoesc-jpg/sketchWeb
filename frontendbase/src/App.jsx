import { BrowserRouter, Route, Routes } from "react-router";
import EditorPage from "./pages/EditorPage";
import GalleryPage from "./pages/GalleryPage";
import LogInPage from "./pages/LogInPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <GalleryPage />
          }/>
          <Route path="/edit" element={
            <EditorPage/>
          }/>
          <Route path="/login" element={
            <LogInPage/>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;