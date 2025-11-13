
<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useCanvasDrawing from '../../composables/useCanvasDrawing.js';

const canvas = ref(null);

onMounted(() => {
  useCanvasDrawing(canvas.value);
});

</script>


<style>
.canvas {
  display: block;
  width: 100vw;
  height: 100vh;
  touch-action: none;
}
</style>