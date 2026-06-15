import { drawPen } from "./penBrush";
import { drawCharcoal } from "./charcoalBrush";
import { drawWatercolor } from "./watercolorBrush";
import { drawOil } from "./oilBrush";

export const brushes = {
    pen: drawPen,
    charcoal: drawCharcoal,
    watercolor: drawWatercolor,
    oil: drawOil
};