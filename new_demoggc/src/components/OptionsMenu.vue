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
    methods: {
        mergeOpt() {
            this.$refs.optionsMenu.style.display = 'none'
            this.$emit('clickOption', 'merge')
        },
        wordOpt() {
            this.$refs.optionsMenu.style.display = 'none'
            this.$emit('clickOption', 'word')
        },
        spaceOpt() {
            this.$refs.optionsMenu.style.display = 'none'
            this.$emit('clickOption', null)
        }
    },
    mounted() {
        this.emitter.on('toggleShow', (data) => {
            if (data.show) {
                this.$refs.optionsMenu.style.top = `${data.y}px`
                this.$refs.optionsMenu.style.left = `${data.x+10}px`

                this.$refs.optionsMenu.style.display = 'block'
                this.$refs.optionsMenu.classList.add('visible')
            } else {
                this.$refs.optionsMenu.style.display = 'none'
            }
        })
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
    display: none;
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