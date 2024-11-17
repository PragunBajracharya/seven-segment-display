'use client';

import {useEffect, useRef, useState} from "react";

import TimeFormatSelector from "@/app/components/TimeFormatSelector";
import Canvas from "@/app/components/Canvas";
import {drawOnCanvas} from "@/app/utils/display";

export default function Home() {
    const [timeFormat, setTimeFormat] = useState<"12" | "24">("12")

    const handleTimeFormatChange = (value: "12" | "24") => {
        setTimeFormat(value);
    }

    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const resizeCanvas = () => {
                canvas.width = 1400;
                canvas.height = canvas.clientHeight;
            };
            window.addEventListener("resize", resizeCanvas);
            resizeCanvas();

            return () => window.removeEventListener("resize", resizeCanvas);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        let timer: NodeJS.Timeout | null = null;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            timer = drawOnCanvas(ctx, parseInt(timeFormat));
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timeFormat]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <TimeFormatSelector timeFormatChange={handleTimeFormatChange} timeFormatValue={timeFormat}/>
            <Canvas ref={canvasRef}/>
        </div>
    );
}
