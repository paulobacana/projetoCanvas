import { useDrawingStore } from '../store/drawingStore.js';

export default function useCanvasDrawing(canvas) {

    const ctx = canvas.getContext('2d');
    const drawingStore = useDrawingStore();

    let desenhado = false;


    function resizeCanvas() {
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.putImageData(img, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    function getPositionMouseInsideContext(e){
        const rect = canvas.getBoundingClientRect();
        const source = e.touches ? e.touches[0] : e;
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    function start(e){
        desenhado = true;
        const {x, y} = getPositionMouseInsideContext(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function move(e){
        if(!desenhado) return;

        const {x, y} = getPositionMouseInsideContext(e);
        ctx.lineWidth = drawingStore.brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = drawingStore.brushColor;
        ctx.globalCompositeOperation = drawingStore.mode === 'erase' ? 'destination-out' : 'source-over';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function stop(){
        desenhado = false;
        ctx.beginPath();
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);

    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('touchmove', move);

    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchend', stop);
    canvas.addEventListener('mouseleave', stop);


}