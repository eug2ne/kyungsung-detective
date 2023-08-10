<template>
  <div class="timeline-wrapper">
    <div :class="{ transitionLeft: index%2 == 1, transitionRight: index%2 == 0 }" v-for="(event_id, index) in Object.keys(timeline)" :key="event_id.id">
      <div v-if="timeline[event_id]">
        <div class="timeline unlock">
          <h3>{{ timeline[event_id].title }}</h3>
          <p>{{ timeline[event_id].description }}</p>
        </div>
        <div v-if="timeline[event_id].subClues" class="subclue">
          <div v-for="subclue in timeline[event_id].subClues" :key="subclue.id">
            <h3>{{ subclue.title }}</h3>
            <p>{{ subclue.description }}</p>
          </div>
        </div>
      </div>
      <div class="timeline lock" v-else>
        <h3>{{ "?".repeat(Math.floor(Math.random()*5) + 1) }}</h3>
        <p>????? ???? ????? ??? ????, ??????????? ???????? ????</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: [ 'timeline' ]
}
</script>

<style scoped>
.timeline-wrapper {
  position: relative;
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-self: flex-end;
  justify-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
  z-index: 10;
}

.timeline {
  width: 350px;
  height: fit-content;
  display: block;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #e6c4a2;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -20px 5px 0 rgba(255, 255, 255, 0.4) inset,
    -5px -5px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.transitionLeft {
  rotate: -3deg;
  translate: -20px 5px;
}

.transitionRight {
  rotate: 3deg;
  translate: 0px -5px;
}

.lock {
  text-align: center;
  font-size: 50px;
}

.subclue {
  position: relative;
  width: 330px;
  height: fit-content;
  translate: 20px -25px;
  display: block;
  padding: 20px;
  margin-bottom: -10px;
  background: #3B2F2C;
  padding: 20px;
  z-index: -10;
  color: #ffff;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(0, 0, 0, 0.2) inset;
}

.subclue p {
  color: #ffff;
}

h3 {
  display: inline;
  font-size: 30px;
  padding: 5px;
  text-align: left;
  line-break: loose;
}

p {
  display: inline-block;
  font-size: 18px;
  text-align: left;
  line-break: auto;
  color: #3B2F2C;
  margin: 10px;
  margin-bottom: 20px;
  padding: 5px;
  box-shadow: -5px 0 0 rgba(0, 0, 0, 0.3);
}
</style>