<template>
  <td ref="td" @click="toggleTarget" :class="{ target:isTarget, choice:isChoice, answer:isAnswer }" :aria-rowindex="rowIndex" :aria-colindex="colIndex">
      {{ letter }}
  </td>
</template>

<script>
export default {
  name: 'Letter',
  props: ['rowIndex', 'colIndex', 'letter'],
  data() {
    return {
      isTarget: false,
      isChoice: false,
      isAnswer: false
    }
  },
  methods: {
    toggleTarget(event) {
      this.isTarget = !this.isTarget
      this.emitter.emit('toggleShow', this.isTarget)

      if (this.isTarget) {
        this.emitter.emit('targetClickOn', event.target)
      }
    }
  },
  mounted() {
    this.emitter.on('targetClickOn', (data) => {
      if (this.$refs.td != data) {
        this.isTarget = false
      }
    })
  }
}
</script>

<style scoped>
td {
  height: 90px;
  width: 90px;
  margin: 10px;
  background-color: #E4B7AF;
}

td.target {
  background-color: #B0EEFF;
}

td.choice {
  background-color: #E4B7AF;
}

td.answer {
  background-color: #FF7D6C;
}
</style>
