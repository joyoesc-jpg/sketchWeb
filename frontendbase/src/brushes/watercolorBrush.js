export function drawWatercolor(
    ctx,
    lastPoint,
    currentPoint,
    pressure,
    rgba,
    size
) {

    const width =
        size * pressure * 5;

    const previousAlpha =
        ctx.globalAlpha;

    for(let i = 0; i < 30; i++) {

        const offsetX =
            (Math.random() - 0.5) * width;

        const offsetY =
            (Math.random() - 0.5) * width;

        ctx.globalAlpha =
            Math.random() * 0.03;

        ctx.beginPath();

        ctx.moveTo(
            lastPoint.x + offsetX,
            lastPoint.y + offsetY
        );

        ctx.lineTo(
            currentPoint.x + offsetX,
            currentPoint.y + offsetY
        );

        ctx.lineWidth =
            Math.random() * width;

        ctx.lineCap = "round";

        ctx.strokeStyle = rgba;

        ctx.stroke();
    }

    ctx.globalAlpha =
        previousAlpha;
}