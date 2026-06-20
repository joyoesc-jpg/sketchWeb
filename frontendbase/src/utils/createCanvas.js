import { Canvas } from "fabric";

export function createCanvas(
    canvasElement
) {

    return new Canvas(
        canvasElement,
        {
            width: 1000,
            height: 800,
            backgroundColor: "white",
            isDrawingMode: false,
            selection: false
        }
    );

}