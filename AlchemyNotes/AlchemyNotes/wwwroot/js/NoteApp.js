const noteVueApp = Vue.createApp({
    data() {
        return {
            pens: [],
            blub: 'lol'
        }
    },
    computed: {
        ...Pinia.mapStores(useLolStore),
    },
    watch: {
        pens(newPens) {
            if (newPens.length == 0)
                this.pens.push(this.getStandardBlackPen());
        },
        blub(newVal, oldVal) {
            console.log(newVal);
        }
    },
    methods: {
        getStandardBlackPen() {
            return new Pen("#000000", 1);
        },

        changeVal() {
            this.blub = "xxx";
        }
    },
    components: {
        'somecomponent' : SomeComponent
    }
});


const pinia = Pinia.createPinia();
noteVueApp.use(pinia);

const noteApp = noteVueApp.mount('#noteapp');


