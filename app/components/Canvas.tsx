'use client'

import {forwardRef} from "react";


const Canvas = forwardRef<HTMLCanvasElement, object>((props, ref) => {
    return (
        <canvas
            ref={ref}
            className="w-full h-96 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            aria-label="Visual representation of selected time format"
        ></canvas>
    )
});
Canvas.displayName = 'Canvas';
export default Canvas;