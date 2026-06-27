import { useState } from "react";
import { useNavigate } from "react-router";

import Toolbar from "../components/Toolbar";
import CanvasBoard from "../components/CanvasBoard";

import "./EditorPage.css";
import { UpdateProject } from "../utils/dbUtils";

function EditorPage() {


    const navigate = useNavigate();
    const idUser = new Number(localStorage.getItem("idUser"));
    const idProject = new Number(localStorage.getItem("idProject"));
    console.log(idProject);
    if(idUser == -1){
        navigate("/login");
    }else if(idProject == -1){
        navigate("/");
    }

    if(idUser == -1 || idProject == -1){
        navigate("/");
    }

    const [strokes, setStrokes] = useState([]);
    
    const [color, setColor] =
        useState("#000000");

    const [size, setSize] =
        useState(10);

    const [opacity, setOpacity] =
        useState(1);

    const [brushType, setBrushType] =
        useState("pen");

    const [undoAction, setUndoAction] =
        useState(null);

    const [redoAction, setRedoAction] =
        useState(null);

    const [exportPNGAction, setExportPNGAction] =
        useState(null);

    const [exportPreviewAction, setExportPreviewAction] =
        useState(null);

    const [
        exportTimelapseAction,
        setExportTimelapseAction
    ] = useState(null);

    const saveProject = async(e) => {
        const data = new FormData();
        data.append("idProject", idProject);


        const strokesString = JSON.stringify({strokes: strokes});
        const strokesFile = new Blob([strokesString], {type:"application/json"});
        data.append("strokes", strokesFile);

        const previewCanvas = exportPreviewAction();
        const previewFile = await fetch(previewCanvas)
            .then(res => res.blob())
        data.append("preview", previewFile);

        try{
            const res = await UpdateProject(data);
        }catch(e){
            console.log("Error en la base de datos");
            console.log(e);
        }
    }

    const exitAction = () => {
        localStorage.setItem("idProject", -1);
        navigate("/");
    };

    return (

        <div className="editor-page">

            <Toolbar
                color={color}
                setColor={setColor}

                size={size}
                setSize={setSize}

                opacity={opacity}
                setOpacity={setOpacity}

                brushType={brushType}
                setBrushType={setBrushType}

                undoAction={undoAction}
                redoAction={redoAction}

                exportPNGAction={
                    exportPNGAction
                }

                exportTimelapseAction={
                    exportTimelapseAction
                }
                saveProjectAction={saveProject}
                exitAction={exitAction}
            />

            <CanvasBoard
                color={color}
                size={size}
                opacity={opacity}
                brushType={brushType}

                setStrokes={setStrokes}

                setUndo={setUndoAction}
                setRedo={setRedoAction}

                setExportPNG={
                    setExportPNGAction
                }

                setExportPreview={
                    setExportPreviewAction
                }

                setExportTimelapse={
                    setExportTimelapseAction
                }
            />

        </div>
    );
}

export default EditorPage;