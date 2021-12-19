const useLolStore = Pinia.defineStore('lol', {
    state: () => {
        return {
            x: 5
        }
    },
    getters: {
        doubleIt: (state) => state.x * 2,
    },
    actions: {
        plus() { this.x++; }
    }
});