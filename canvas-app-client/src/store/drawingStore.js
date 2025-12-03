

import { defineStore } from 'pinia'


export const useDrawingStore = defineStore('drawing', {
    state: () => ({
        brushColor: '',
        brushSize: 5, 
        mode: 'draw', // 'draw' ou 'erase'
    }),
});
