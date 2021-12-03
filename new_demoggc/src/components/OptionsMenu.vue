<template>
<div id="optionsMenu" v-if="show">
    <ul id="optionsMenuList">
        <li @click="mergeOpt" class="option" id="merge">합치기</li>
        <li @click="wordOpt" class="option" id="word">단어 조합</li>
        <li @click="spaceOpt" class="option" id="space">빈칸</li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'OptionsMenu',
    data() {
        return {
            show: false,
            top: '0px',
            left: '0px',
            targetTd: null
        }
    },
    methods: {
        mergeOpt() {
            this.emitter.emit('showChoices', {'target':this.targetTd, 'type':'merge'})
        },
        wordOpt() {
            this.emitter.emit('showChoices', {'target':this.targetTd, 'type':'word'})
        },
        spaceOpt() {
            this.emitter.emit('showChoices', {'target':this.targetTd, 'type':null})
        }
    },
    mounted() {
        this.emitter.on('toggleShow', (data) => {
            this.show = data
        }),
        this.emitter.on('updateTarget', (data) => {
            this.targetTd = data
        })
    }
}
</script>

<style scoped>
#optionsMenu {
    display: block;
    position: absolute;
    z-index: 1000;
    width: 100px;
    background-color: aliceblue;
}

ul .option {
    padding: 8px 10px;
    font-size: 15px;
    cursor: pointer;
}

ul .option:hover {
    background-color: beige;
}
</style>
