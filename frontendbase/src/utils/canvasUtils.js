import { brushes } from "../brushes";
import { hexToRgba } from "./colorUtils";

export function redrawCanvas(
    ctx,
    strokes
) {

    if (!ctx) return;

    ctx.clearRect(
        0,
        0,
        1000,
        600
    );

    ctx.fillStyle = "white";

    ctx.fillRect(
        0,
        0,
        1000,
        600
    );

    strokes.forEach((stroke) => {

        const brush =
            brushes[stroke.brush];

        if (!brush) return;

        const points =
            stroke.points;

        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            const lastPoint =
                points[i - 1];

            const currentPoint =
                points[i];

            const rgba =
                hexToRgba(
                    stroke.color,
                    stroke.opacity
                );

            brush(
                ctx,
                lastPoint,
                currentPoint,
                currentPoint.pressure,
                rgba,
                stroke.size
            );
        }
    });
}