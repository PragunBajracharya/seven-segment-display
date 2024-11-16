const numbers = ["0x7E", "0x30", "0x6D", "0x79", "0x33", "0x5B", "0x5F", "0x70", "0x7F", "0x7B"];
export function drawSegment(ctx: CanvasRenderingContext2D | null, val: string, move = 0) {
    if (!ctx) return;
    ctx.clearRect(125 + move, 30, 150, 275);
    ctx.beginPath();

    // A
    ctx.fillStyle = getColor(val, 6);
    ctx.fillRect(150 + move, 30, 100, 25);

    // B
    ctx.fillStyle = getColor(val, 5);
    ctx.fillRect(250 + move, 55, 25, 100);

    // C
    ctx.fillStyle = getColor(val, 4);
    ctx.fillRect(250 + move, 180, 25, 100);

    // D
    ctx.fillStyle = getColor(val, 3);
    ctx.fillRect(150 + move, 280, 100, 25);

    // E
    ctx.fillStyle = getColor(val, 2);
    ctx.fillRect(125 + move, 180, 25, 100);

    // F
    ctx.fillStyle = getColor(val, 1);
    ctx.fillRect(125 + move, 55, 25, 100);

    // G
    ctx.fillStyle = getColor(val, 0);
    ctx.fillRect(150 + move, 155, 100, 25);

    ctx.closePath();
}

export function drawColon(ctx: CanvasRenderingContext2D | null, start = 0) {
    if (!ctx) return;
    ctx.clearRect(start, 30, 25, 275);
    ctx.beginPath();

    // Colon Top
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(start, 100, 25, 25);

    // Colon Bottom
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(start, 205, 25, 25);

    ctx.closePath();
}

export function getColor(val: string, shift: number): string {
    let a: number | string = ((parseInt(val) >> shift) & 1) === 1 ? 255 : 20;
    a = (a + 0x10000).toString(16).substr(-2);
    return "#ff0000" + a;
}

export function rgb2hex(color: string): string {
    const rgb = color.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s]+)?\)/i);
    if (!rgb) return color;

    const [r, g, b] = rgb.slice(1, 4).map(Number);
    let alpha = rgb[4] ? parseFloat(rgb[4]) : 1;
    alpha = Math.round(alpha * 255);
    const hexAlpha = (alpha + 0x10000).toString(16).slice(-2).toUpperCase();
    return `#${(r | (1 << 8)).toString(16).slice(1)}${(g | (1 << 8)).toString(16).slice(1)}${(b | (1 << 8)).toString(16).slice(1)}${hexAlpha}`;
}

export function drawOnCanvas(ctx: CanvasRenderingContext2D | null , timeFormatValue: number) {
    const timeValue: number= timeFormatValue;
    let value = 0;
    if (ctx) {
        console.log(timeValue)
        setInterval(function () {
            const date = new Date();
            value = timeValue

            let hour: number | string[]  = date.getHours(),
                minute = date.getMinutes().toString().split(''),
                second = date.getSeconds().toString().split('');
            if (value === 24) {
                hour = makeDoubleDigit(hour.toString().split(''));
            } else if (value === 12) {
                hour = hour > 12 ? hour % 12 : hour;
                hour = makeDoubleDigit(hour.toString().split(''));
            }
            minute = makeDoubleDigit(minute);
            second = makeDoubleDigit(second);
            drawSegment(ctx, numbers[parseInt((hour as string[])[0])], 0);
            drawSegment(ctx, numbers[parseInt((hour as string[])[1])], 180);
            drawColon(ctx, 485);
            drawSegment(ctx, numbers[parseInt(minute[0])], 410);
            drawSegment(ctx, numbers[parseInt(minute[1])], 590);
            drawColon(ctx, 895);
            drawSegment(ctx, numbers[parseInt(second[0])], 820);
            drawSegment(ctx, numbers[parseInt(second[1])], 1000);
        }, 1000);
    }
}

export function makeDoubleDigit(digits: string[]): string[] {
    return digits.length === 1 ? ["0", digits[0]] : digits;
}