import { replay } from "./replayUtils";

export async function exportTimelapse(
    exportCanvas,
    strokes
) {

    const exportCtx =
        exportCanvas.getContext("2d");

    const stream =
        exportCanvas.captureStream(60);

    const recorder =
        new MediaRecorder(
            stream,
            {
                mimeType: "video/webm"
            }
        );

    const chunks = [];

    recorder.ondataavailable =
        (event) => {

            if (
                event.data.size > 0
            ) {

                chunks.push(
                    event.data
                );

            }
        };

    exportCtx.fillStyle =
        "#ffffff";

    exportCtx.fillRect(
        0,
        0,
        exportCanvas.width,
        exportCanvas.height
    );

    recorder.start();

    exportCtx.fillStyle =
        "white";

    exportCtx.fillRect(
        0,
        0,
        exportCanvas.width,
        exportCanvas.height
    );

    await replay(
        exportCtx,
        strokes
    );

    recorder.stop();

    recorder.onstop = () => {

        const blob =
            new Blob(
                chunks,
                {
                    type:
                        "video/webm"
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "timelapse.webm";

        link.click();

        URL.revokeObjectURL(
            url
        );
    };
}


export function exportPNG(sourceCanvas) {

    const exportCanvas =
        document.createElement("canvas");

    exportCanvas.width = 1000;
    exportCanvas.height = 600;

    const exportCtx =
        exportCanvas.getContext("2d");

    exportCtx.fillStyle =
        "white";

    exportCtx.fillRect(
        0,
        0,
        1000,
        600
    );

    exportCtx.drawImage(
        sourceCanvas,
        0,
        0
    );

    const link =
        document.createElement("a");

    link.download =
        "drawing.png";

    link.href =
        exportCanvas.toDataURL(
            "image/png"
        );

    link.click();
}