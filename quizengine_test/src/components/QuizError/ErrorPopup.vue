<template>
    <div v-if="this.show" class="backdrop" @click.self="vanishPopup">
        <div id="error-popup"
            :class="{ wordspaceerror:wordspace, mergeerror:merge, worderror:word, spaceerror:space }">
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
    data() {
        return {
            show: false,
            message: ref({}),
            wordspace: false,
            merge: false,
            word: false,
            space: false
        }
    },
    computed: {
        descriptSplit() {
            return this.message.descript.split('. ')
        }
    },
    methods: {
        vanishPopup() {
            this.show = false
        }
    },
    mounted() {
        this.emitter.on('showPopup', (error) => {
            this.show = true
            this.message = ErrorsJSON[error]
            this.$data[error] = true
        })
    }
}
</script>

<style scoped>
#error-popup {
    width: 400px;
    align-self: center;
    text-align: center;
    padding: 20px;
    margin: 100px auto;
    z-index: 1000;
    border-radius: 10px;
}

h3 {
    font-size: 25px;
    margin-bottom: 15px;
}

p {
    font-size: 15px;
}

.wordspaceerror {
    background-color: #FF7D6C;
}

.mergeerror {
    background-color: #D65349;
}

.worderror {
    color: white;
    background-color: #914D44;
}

.spaceerror {
    color: white;
    background-color: #3B2F2C;
}

.backdrop {
    position: fixed;
    width: 950px;
    height: 100vh;
}
</style>