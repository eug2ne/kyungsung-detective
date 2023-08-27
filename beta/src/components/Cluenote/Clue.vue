<template>
  <div class="wrapper clue lock" v-if="!clue">
    <!-- if clue not exist, show locked-image -->
    <h3 class="title">아직 획득하지 못 한 단서입니다.</h3>
  </div>
  <div class="wrapper clue" v-else>
    <div style="width: 450px">
      <h3 class="title">{{ this.clue.title }}</h3>
      <p class="description">{{ this.clue.description }}</p>
      <!-- <div class="source" :class="{ 'npc': this.clue.source.type === 'NPC', 'item': this.clue.source.type === 'Item' }">
        <p class="description">(출처: {{ this.clue.source.name }})</p>
      </div> -->
    </div>
    <div class="wrapper">
      <div class="background" @hover.prevent="mouseOverSubclue($event)"
        :class="{ rotateLeft: index%2 == 0, rotateRight: index%2 == 1 }" v-for="(subclue_key, index) in Object.keys(clue.subClues)" :key="subclue_key.id">
        <SubClue :subclue="clue.subClues[subclue_key]" />
      </div>
    </div>
  </div>
</template>

<script>
import SubClue from './SubClue.vue'

export default {
  name: 'Clue',
  props: [ 'clue' ],
  emits: [ 'hoverSubclue' ],
  components: { SubClue },
  methods: {
    mouseOverSubclue(e) {
      const t_left = e.target.getBoundingClientRect().left
      const t_top = e.target.getBoundingClientRect().top

      this.$emit('hoverSubclue', t_left, t_top)
    }
  }
}
</script>

<style scoped>
.clue {
  width: fit-content;
  min-height: 290px;
  height: fit-content;
  align-items: stretch;
  justify-content: flex-start;
  margin: 40px 20px;
  padding: 15px;
}

.lock {
  background-color: #ff7d6c;
}

.lock p {
  cursor: pointer;
  text-decoration: white underline;
  font-weight: bold;
}

.unlock {
  background-color: #4b8292;
}

.unknown {
  width: 350px;
  min-height: 250px;
  height: fit-content;
  background-color: #e8ded5;
}
</style>