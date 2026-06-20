import { brushes } from "../brushes";
import { hexToRgba } from "./colorUtils";

export async function replay(
    ctx,
    strokes
) {

    if (!ctx) return;

    ctx.fillStyle = "white";

    ctx.fillRect(
        0,
        0,
        1000,
        800
    );

    for (const stroke of strokes) {

        const brush =
            brushes[stroke.brush];

        if (!brush) continue;

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

            await new Promise(
                resolve =>
                    setTimeout(resolve, 5)
            );
        }
    }
}