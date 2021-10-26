// create letter div
var letter = Vue.createApp({
    data() {
        return {
            letter: null,
            target: false,
            row: null,
            col: null,
            answer: false
        }
    },
    methods: {
        target(e) {
            // @click
            this.target = e.target
        }
    }
})
