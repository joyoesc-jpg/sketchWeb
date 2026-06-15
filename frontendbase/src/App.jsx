import { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import Toolbar from "./components/Toolbar";
import React from "react";


function App() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [brushType, setBrushType] = useState("pen");
  const [undoAction, setUndoAction] =
    useState(null);

  const [redoAction, setRedoAction] =
      useState(null);

  const [exportPNGAction, setExportPNG] =
      useState(null);

  const [exportTimelapseAction, setExportTimelapse] =
      useState(null);

  return (
    <>
      <h1>Sketch Web</h1>

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
        exportPNGAction={exportPNGAction}
        exportTimelapseAction={exportTimelapseAction}
      />

      <CanvasBoard
          color={color}
          size={size}
          opacity={opacity}
          brushType={brushType}
          setUndo={setUndoAction}
          setRedo={setRedoAction}
          setExportPNG={setExportPNG}
          setExportTimelapse={setExportTimelapse}          
      />
    </>
  );
}


export default App;