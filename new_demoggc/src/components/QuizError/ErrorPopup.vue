<template>
    <div class="backdrop" v-if="this.show" @click.self="vanishPopup">
        <div id="error-popup">
            <h3>{{ message.title }}</h3>
            <p v-for="s in descriptSplit" :key="s.index">
                {{ s }} 
            </p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import ErrorsJSON from './Errors.json'

export default {
    name: 'ErrorPopup',
    props: [ 'type' ],
    data() {
        return {
            show: false,
            message: ref({})
        }
    },
    computed: {
        descriptSplit() {
            return this.message.descript.split('. ')
        }
    },
    watch: {
        type: function(newVal) {
            this.show = true
            this.message = ErrorsJSON[newVal]
            this.$data[newVal] = true
        }
    },
    methods: {
        vanishPopup() {
            this.show = false
            this.$emit('ErrorPopupVanish')
        }
    }
}
</script>

<style scoped>
.backdrop {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: transparent;
    backdrop-filter: blur(10px);
}

#error-popup {
    position: absolute;
    width: 400px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    color: white;
    background-color: #807159;
}

h3 {
    font-size: 25px;
    margin-bottom: 15px;
}

p {
    font-size: 15px;
}
</style>