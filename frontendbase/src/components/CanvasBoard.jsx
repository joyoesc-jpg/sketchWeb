import { useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { brushes } from "../brushes";
import { hexToRgba } from "../utils/colorUtils";
import {redrawCanvas} from "../utils/canvasUtils";
import { replay }from "../utils/replayUtils";
import {exportTimelapse, exportPNG, getPNG} from "../utils/exportUtils";
import {createCanvas} from "../utils/createCanvas";
import {attachDrawingEvents} from "../utils/drawingEvents";
import "./CanvasBoard.css";

function CanvasBoard({
    color,
    size,
    opacity,
    brushType,
    importedStrokes,
    setCurrentStrokes,
    setUndo,
    setRedo,
    setExportPNG,
    setExportPreview,
    setExportTimelapse,
    ref
}) {

    const canvasElementRef = useRef(null);

    const drawingRef = useRef(false);
    const lastPointRef = useRef(null);

    const strokesRef = useRef([]);
    const currentStrokeRef = useRef(null);

    const ctxRef = useRef(null);
    const exportCanvasRef = useRef(null);

    const redoStackRef = useRef([]);

    const colorRef = useRef(color);
    const sizeRef = useRef(size);
    const opacityRef = useRef(opacity);
    const brushTypeRef = useRef(brushType);

    
    useEffect(() => {
        colorRef.current = color;
    }, [color]);

    useEffect(()=>{
        setCurrentStrokes(strokesRef);
    }, strokesRef);

    useEffect(() => {
        sizeRef.current = size;
    }, [size]);

    useEffect(() => {
        opacityRef.current = opacity;
    }, [opacity]);

    useEffect(() => {
        brushTypeRef.current = brushType;
    }, [brushType]);

    const undo = () => {

        if (strokesRef.current.length === 0)
            return;

        const stroke =
            strokesRef.current.pop();

        redoStackRef.current.push(
            stroke
        );

        redrawCanvas(
            ctxRef.current,
            strokesRef.current
        );
    };

    const redo = () => {

        if (redoStackRef.current.length === 0)
            return;

        const stroke =
            redoStackRef.current.pop();

        strokesRef.current.push(
            stroke
        );

        redrawCanvas(
            ctxRef.current,
            strokesRef.current
        );
    };

    ///Redibujado del canvas.
    useEffect(() => {
        const canvas =
            createCanvas(
                canvasElementRef.current
            );

        const ctx =
            canvas.lowerCanvasEl.getContext("2d");

        ctxRef.current = ctx;   
        
        const exportCanvas =
            document.createElement("canvas");

        exportCanvas.width = 1000;
        exportCanvas.height = 800;

        exportCanvasRef.current =
            exportCanvas;

        exportCanvas.captureStream()

        attachDrawingEvents(
            canvas,
            {
                ctx,

                drawingRef,
                lastPointRef,

                currentStrokeRef,
                strokesRef,

                colorRef,
                sizeRef,
                opacityRef,
                brushTypeRef,
                redoStackRef
            }
        );

        window.redrawCanvas = () => {
            redrawCanvas(
                ctxRef.current,
                strokesRef.current
            );
        };

        return () => {
            canvas.dispose();
        };

    }, []);

    ///Funciones del toolbar
    useEffect(() => {
        setUndo(() => undo);
        setRedo(() => redo);
        setExportPNG(
            () => () => {

                exportPNG(
                    ctxRef.current.canvas
                );

            }
        );

        setExportPreview(
            () => () => {

                return getPNG(
                    ctxRef.current.canvas, true
                );

            }
        );

        setExportTimelapse(
            () => () => {

                exportTimelapse(
                    exportCanvasRef.current,
                    strokesRef.current
                );

            }
        );
    }, []);

    ///Listeners de eventos de teclado (Ctrl + z, Ctrl + c,...)
    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.ctrlKey && e.key === "z") {

                e.preventDefault();

                undo();
            }
            if (
                e.ctrlKey &&
                e.shiftKey &&
                e.key.toLowerCase() === "z"
            ) {

                redo();

            }

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, []);    

    ///Manejar trazos importados
    useEffect(()=>{
        if(importedStrokes){
            strokesRef.current.push(...importedStrokes.current);
            redrawCanvas(
                ctxRef.current,
                strokesRef.current
            )
        }
    }, [importedStrokes]);

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasElementRef}
                className="drawing-canvas"
            />
        </div>
    );
}

export default CanvasBoard;