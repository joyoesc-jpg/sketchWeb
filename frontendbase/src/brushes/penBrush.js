export function drawPen(
    ctx,
    lastPoint,
    currentPoint,
    pressure,
    rgba,
    size
) {

    ctx.beginPath();

    ctx.moveTo(
        lastPoint.x,
        lastPoint.y
    );

    ctx.lineTo(
        currentPoint.x,
        currentPoint.y
    );

    ctx.lineWidth =
        size * pressure;

    ctx.lineCap = "round";

    ctx.strokeStyle = rgba;

    ctx.stroke();
}