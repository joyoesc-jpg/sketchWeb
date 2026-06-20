import { brushes } from "../brushes";
import { hexToRgba } from "./colorUtils";

export function attachDrawingEvents(
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
) {
    canvas.upperCanvasEl.addEventListener(
        "pointerdown",
        (e) => {

            drawingRef.current = true;

            lastPointRef.current = {
                x: e.offsetX,
                y: e.offsetY
            };

            currentStrokeRef.current = {
                brush: brushTypeRef.current,
                color: colorRef.current,
                opacity: opacityRef.current,
                size: sizeRef.current,
                points: []
            };
        }
    );

    canvas.upperCanvasEl.addEventListener(
        "pointermove",
        (e) => {

            if (!drawingRef.current)
                return;

            const currentPoint = {
                x: e.offsetX,
                y: e.offsetY
            };

            const lastPoint =
                lastPointRef.current;

            const pressure =
                e.pointerType === "pen"
                    ? Math.max(
                        e.pressure,
                        0.1
                    )
                    : 1;

            if (
                currentStrokeRef.current
            ) {

                currentStrokeRef.current.points.push(
                    {
                        x: currentPoint.x,
                        y: currentPoint.y,
                        pressure,
                        timestamp:
                            performance.now()
                    }
                );

            }

            const rgba =
                hexToRgba(
                    colorRef.current,
                    opacityRef.current
                );

            const brush =
                brushes[
                    brushTypeRef.current
                ];

            if (brush) {

                brush(
                    ctx,
                    lastPoint,
                    currentPoint,
                    pressure,
                    rgba,
                    sizeRef.current
                );
            }

            lastPointRef.current =
                currentPoint;
        }
    );    

    canvas.upperCanvasEl.addEventListener(
        "pointerup",
        () => {

            drawingRef.current =
                false;

            lastPointRef.current =
                null;

            if (
                currentStrokeRef.current
            ) {

                strokesRef.current.push(
                    currentStrokeRef.current
                );
                redoStackRef.current = [];

            }

            currentStrokeRef.current =
                null;
        }
    );
}

