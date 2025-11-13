<template>
  <div>
    <Toolbar />
    <DrawingCanvas />
  </div>
</template>

<script>
import Toolbar from '../components/canvas/Toolbar.vue'
import DrawingCanvas from '../components/canvas/DrawingCanvas.vue'
export default { components: { DrawingCanvas, Toolbar } }
</script>
