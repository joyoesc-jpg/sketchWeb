export function drawCharcoal(
    ctx,
    lastPoint,
    currentPoint,
    pressure,
    rgba,
    size
) {

    const width =
        size * pressure;

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

        ctx.stroke();

        ctx.globalAlpha = 0.2;
    }

    for(let i = 0; i < 100; i++) {

        const x =
            currentPoint.x +
            (Math.random() - 0.5) * width * 2;

        const y =
            currentPoint.y +
            (Math.random() - 0.5) * width * 2;

        const radius =
            Math.random() * width * 0.15;

        ctx.beginPath();


        ctx.fillStyle = rgba;

        ctx.fill();
    }
}