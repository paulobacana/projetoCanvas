<script setup>
import { ref, onMounted, watch } from 'vue'
import { PencilIcon, PaintBrushIcon } from '@heroicons/vue/24/outline'
import { BackspaceIcon } from '@heroicons/vue/24/solid'
import { useDrawingStore } from '../../store/drawingStore.js';

const drawingStore = useDrawingStore();
const selectedColor = ref('black');
const brushSize = ref(5); // tamanho inicial do pincel

// atualiza o cursor da borracha
function updateEraserCursor() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    if (drawingStore.mode === 'erase') {
        const size = brushSize.value;
        const cursor = `
            url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><rect width='${size}' height='${size}' fill='none' stroke='black'/></svg>") 
            ${size/2} ${size/2},
            auto
        `;
        canvas.style.cursor = cursor;
    } else {
        canvas.style.cursor = 'default';
    }
}

function selectColor(color, hex) {
    selectedColor.value = color;
    drawingStore.brushColor = hex;
}

function selectMode(mode) {
    drawingStore.mode = mode;
    updateEraserCursor();
}

function updateBrushSize(event) {
    const size = parseInt(event.target.value);
    brushSize.value = size;
    drawingStore.brushSize = size;
    if (drawingStore.mode === 'erase') {
        updateEraserCursor();
    }
}

watch(() => drawingStore.mode, updateEraserCursor);
watch(brushSize, updateEraserCursor);

// inicializa o cursor quando o componente é montado
onMounted(() => {
    updateEraserCursor();
});

</script>

<template>
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 md:px-0 md:w-auto">
        <div class="bg-white shadow-lg rounded-full px-3 py-2 md:px-6 md:py-3 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2 md:gap-4 max-w-[95vw] md:max-w-none mx-auto">

            <!-- Botões de ferramenta -->
            <div class="flex items-center gap-1 md:gap-3">
                <button @click="selectMode('draw')" :class="['p-1.5 md:p-2', 'rounded-full', { 'ring-2 ring-offset-2 ring-blue-500': drawingStore.mode === 'draw' }]">
                    <PaintBrushIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-500" />
                </button>

                <button @click="selectMode('pen')" :class="['p-1.5 md:p-2', 'rounded-full', { 'ring-2 ring-offset-2 ring-blue-500': drawingStore.mode === 'pen' }]">
                    <PencilIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-500" />
                </button>

                <button @click="selectMode('erase')" :class="['p-1.5 md:p-2', 'rounded-full', { 'ring-2 ring-offset-2 ring-red-500': drawingStore.mode === 'erase' }]">
                    <BackspaceIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-red-500" />
                </button>
            </div>

            <!--barra -->
            <div class="flex flex-wrap md:flex-nowrap items-center gap-1 md:gap-3 bg-white rounded-full px-2 py-1">

                <button @click="selectColor('black', '#000000')" :class="['p-1', 'rounded-full', { 'ring-2 ring-offset-1 md:ring-offset-2 ring-blue-500': selectedColor === 'black' }]">
                    <span class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black block"></span>
                </button>

                <button @click="selectColor('white', '#FFFFFF')" :class="['p-1', 'rounded-full', { 'ring-2 ring-offset-1 md:ring-offset-2 ring-blue-500': selectedColor === 'white' }]">
                    <span class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border border-gray-300 block"></span>
                </button>

                <button @click="selectColor('blue', '#2563EB')" :class="['p-1', 'rounded-full', { 'ring-2 ring-offset-1 md:ring-offset-2 ring-blue-500': selectedColor === 'blue' }]">
                    <span class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 block"></span>
                </button>

                <button @click="selectColor('red', '#DC2626')" :class="['p-1', 'rounded-full', { 'ring-2 ring-offset-1 md:ring-offset-2 ring-red-500': selectedColor === 'red' }]">
                    <span class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-600 block"></span>
                </button>

                <!-- separador vertical-->
                <div class="hidden md:block w-px h-6 md:h-8 bg-gray-200"></div>

                <div class="flex items-center gap-1 md:gap-2">
                    <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        :value="brushSize"
                        @input="updateBrushSize"
                        class="w-16 md:w-24 h-1.5 md:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600"
                    >
                    <span class="text-xs md:text-sm text-gray-600 min-w-[16px] md:min-w-[20px] tabular-nums">{{ brushSize }}</span>
                </div>
            </div>

        </div>
    </div>
</template>
