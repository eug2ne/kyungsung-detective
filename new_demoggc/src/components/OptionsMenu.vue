<template>
<div id="optionsMenu" ref="optionsMenu">
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
    props: [ 'x', 'y' ],
    methods: {
        mergeOpt() {
            this.$emit('clickOption', {'option':'merge'})
        },
        wordOpt() {
            this.$emit('clickOption', {'option':'word'})
        },
        spaceOpt() {
            this.$emit('clickOption', {'option':null})
        }
    },
    mounted() {
        this.$refs.optionsMenu.style.left = `${this.x+10}px`    
        this.$refs.optionsMenu.style.top = `${this.y}px`
    },
    updated() {
        this.$refs.optionsMenu.style.left = `${this.x+10}px`    
        this.$refs.optionsMenu.style.top = `${this.y}px`
    }
}
</script>

<style scoped>
#optionsMenu {
    position: fixed;
    z-index: 1000;
    width: 100px;
    height: fit-content;
    background-color: aliceblue;
}

#optionsMenuList {
    display: flex;
    flex-direction: column;
    align-items: center;
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