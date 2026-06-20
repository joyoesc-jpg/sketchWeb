import { useState } from "react";

import Toolbar from "../components/Toolbar";
import CanvasBoard from "../components/CanvasBoard";

import "./EditorPage.css";

function EditorPage() {

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

    const [
        exportTimelapseAction,
        setExportTimelapseAction
    ] = useState(null);

    const [saveAction, setSaveAction] = useState(null);
    const [saveAndExitAction, setSaveAndExitAction] = useState(null);

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
                saveAction={saveAction}
                saveAndExitAction={saveAndExitAction}
            />

            <CanvasBoard
                color={color}
                size={size}
                opacity={opacity}
                brushType={brushType}

                setUndo={setUndoAction}
                setRedo={setRedoAction}

                setExportPNG={
                    setExportPNGAction
                }

                setExportTimelapse={
                    setExportTimelapseAction
                }
                setSave={setSaveAction}
                setSaveAndExit={setSaveAndExitAction}
            />

        </div>
    );
}

export default EditorPage;