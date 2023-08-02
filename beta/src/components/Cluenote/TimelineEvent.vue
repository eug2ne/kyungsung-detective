<template>
  <div style="position: relative;">
    <div class="event" :class="{ focus: this.focus }"
      @mouseenter.prevent="this.focus = true" @mouseleave.self="this.focus = false"
    >
      <h3 class="title">event title</h3>
      <p class="description">event description</p>
    </div>
    <ul class="wrapper related">
      <li class="subclue" :class="{ minimized: !this.focus }">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
      <li class="subclue" :class="{ minimized: !this.focus }">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
      <li class="subclue" :class="{ minimized: !this.focus }" style="margin: 0 auto;z-index: 10;">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
    </ul>
  </div>
  <div style="position: relative;">
    <div class="event" :class="{ focus: this.focus }"
      @mouseenter.prevent="this.focus = true" @mouseleave.self="this.focus = false"
    >
      <h3 class="title">event title</h3>
      <p class="description">event description</p>
    </div>
    <ul class="wrapper related">
      <li class="subclue" :class="{ minimized: !this.focus }">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
      <li class="subclue" :class="{ minimized: !this.focus }">
        <h3 class="title" :class="{ minimized: !this.focus }">related subclue</h3>
        <p v-if="this.focus" class="description">related subclue description</p>
      </li>
    </ul>
  </div>
  <div style="position: relative;">
    <div class="event" :class="{ focus: this.focus }"
      @mouseenter.prevent="this.focus = true" @mouseleave.self="this.focus = false"
    >
      <h3 class="title">event title</h3>
      <p class="description">event description</p>
    </div>
    <ul class="wrapper related"></ul>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      focus: false
    }
  }
}
</script>
<style scoped>
.event {
  width: 230px;
  height: 230px;
  margin: 0 135px;
  padding: 5px;
  background-color: #e6bda2;
  z-index: 10;
}

.related {
  position: absolute;
  top: 200px;
  width: 500px;
  justify-content: space-between;
  align-content: space-between;
  z-index: 1;
}

.minimized {
  width: 230px;
  height: fit-content;
  font-size: 20px;
  text-align: center;
  padding: 0;
  border-radius: 5px;
}

.expanded {
  flex-direction: row;
  align-content: space-between;
  z-index: 10;
}
</style>