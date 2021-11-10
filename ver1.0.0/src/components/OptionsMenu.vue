<template>
<div id="optionsMenu" v-if="show">
    <ul id="optionsMenuList">
        <li @click="merge" class="option" id="merge">합치기</li>
        <li @click="word" class="option" id="word">단어 조합</li>
        <li @click="space" class="option" id="space">빈칸</li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'OptionsMenu',
    data() {
        return {
            show: false
        }
    },
    methods: {
        merge() {

        },
        word() {

        },
        space() {

        }
    },
    mounted() {
        this.emitter.on('toggleShow', (data) => {
            this.show = data
        })
    }
}
</script>

<style scoped>
#targetMenu {
    position: fixed;
    z-index: 1000;
    width: 100px;
    background-color: aliceblue;
}
</style>
