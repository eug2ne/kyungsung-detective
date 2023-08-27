<template>
  <div id="timeline" class="wrapper">
    <h2 class="title" style="text-align: center">사건 시간선</h2>
    <div class="background" @hover.prevent="mouseOverEvent($event)" :class="{ rotateLeft: index%2 == 0, rotateRight: index%2 == 1 }"
      v-for="(event_id, index) in Object.keys(timeline)" :key="event_id.id">
      <div class="event" :class="{ unlock: timeline[event_id], lock: !timeline[event_id] }"
        :draggable="timeline[event_id] ? true : false" @dragstart.self="dragEvent($event, timeline[event_id])">
        <div v-if="timeline[event_id]">
          <h3 class="title">
            {{ timeline[event_id].title }}
          </h3>
          <p class="description">
            {{ timeline[event_id].description }}
          </p>
        </div>
        <div v-else>
          <h3 class="title">
            {{ "?".repeat(Math.floor(Math.random()*5) + 1) }}
          </h3>
          <p class="description">
            ????? ???? ????? ??? ????, ??????????? ???????? ????
          </p>
        </div>
      </div>
      <!-- event.subclue group -->
      <div class="group" v-if="timeline[event_id]&&timeline[event_id].subClues">
        <SubClue :subclue="timeline[event_id].subClues[subclue_key]"
          v-for="subclue_key in Object.keys(timeline[event_id].subClues)" :key="subclue_key.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import SubClue from './SubClue.vue'

export default {
  name: 'Timeline',
  props: [ 'timeline' ],
  emits: [ 'hoverEvent' ],
  components: { SubClue },
  methods: {
    mouseOverEvent(e) {
      const t_left = e.target.getBoundingClientRect().left
      const t_top = e.target.getBoundingClientRect().top

      this.$emit('hoverEvent', t_left, t_top)
    },
    dragEvent(e, event) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('eventIndex', event.index)
    }
  }
}
</script>

<style scoped>
#timeline {
  width: fit-content;
  min-height: 290px;
  height: fit-content;
  align-items: stretch;
  justify-content: flex-start;
  margin: 40px 10px;
  padding: 15px;
  background-color: #dddddd;
}

.background {
  background-color: #f1f5f9;
}

.event {
  display: block;
  position: relative;
  width: 350px;
  min-height: 200px;
  height: fit-content;
  padding: 20px;
  margin: 15px 0 0 15px;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px -5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.unlock {
  background-color: #fff9e2;
}

.lock {
  background-color: #85929e;
}

.subclue {
  width: 330px;
  min-height: 0;
  height: fit-content;
  margin-bottom: -10px;
  padding: 10px;
  color: #ffff;
  background-color: #3B2F2C;
  translate: 20px -25px;
}

.background:hover .subclue {
  padding-top: 20px;
}
</style>