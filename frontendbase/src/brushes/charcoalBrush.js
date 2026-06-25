export function drawCharcoal(
    ctx,
    lastPoint,
    currentPoint,
    pressure,
    rgba,
    size
) {
    ctx.save();

    const width = size * pressure;

    for(let i = 0; i < 25; i++) {

        const offsetX =
            (Math.random() - 0.5) * width;

        const offsetY =
            (Math.random() - 0.5) * width;

        const thickness =
            Math.random() * width * 0.3;

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
            Math.max(1, thickness);

        ctx.lineCap = "round";

        ctx.strokeStyle = rgba;

        ctx.globalAlpha = 0.2;

        ctx.stroke();
    }

    ctx.restore();
}