<template>
    <div class="backdrop" @click.self="this.$emit('ErrorPopupVanish')">
        <div id="error-popup" class="popup">
            <h3>{{ message.title }}</h3>
            <p v-for="s in descriptSplit" :key="s.index">
                {{ s }} 
            </p>
        </div>
    </div>
</template>

<script>
import ErrorsJSON from './Errors.json'

export default {
    name: 'ErrorPopup',
    props: [ 'type' ],
    emits: [ 'ErrorPopupVanish' ],
    data() {
        return {
            message: ErrorsJSON[this.type]
        }
    },
    computed: {
        descriptSplit() {
            return this.message.descript.split('. ')
        }
    }
}
</script>

<style scoped>
.backdrop {
    width: 100%;
    height: 100%;
}

.popup {
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