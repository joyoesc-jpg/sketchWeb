export function drawOil(
    ctx,
    lastPoint,
    currentPoint,
    pressure,
    rgba,
    size
) {

    const width =
        size * pressure;

    const dx =
        currentPoint.x - lastPoint.x;

    const dy =
        currentPoint.y - lastPoint.y;

    const distance =
        Math.sqrt(dx * dx + dy * dy);

    const steps =
        Math.max(1, Math.floor(distance / 2));

    for(let i = 0; i < steps; i++) {

        const t = i / steps;

        const x =
            lastPoint.x + dx * t;

        const y =
            lastPoint.y + dy * t;

        const radius =
            width * (
                0.5 +
                Math.random() * 0.5
            );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = rgba;

        ctx.fill();
    }
}