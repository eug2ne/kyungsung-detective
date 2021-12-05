<template>
  <div id="owned-item">
    <h2>소지하고 있는 아이템</h2>
    <div v-if="this.owned.name" class="wrapper" id="owned">
      <h3>{{ this.owned.name }}</h3>
      <p>{{ this.owned.descript }}</p>
      <img src="@/assets/item/item1.png" alt="loading">
    </div>
    <div v-else class="wrapper">
      <p>아직 소지하고 있는 아이템이 없습니다.</p>
    </div>
  </div>
  <div id="inventory">
    <component @addItem="toggleOwned" v-for="item in itemlist" :key="item.id"
    :name="item.name"
    :descript="item.descript"
    :is="item.name === undefined ? 'None':'Item'"/>
  </div>
</template>

<script>
import itemlist from '../assets/itemlist.json'
import Item from './inventory/Item.vue'
import None from './inventory/None.vue'

export default {
  data() {
    return {
      itemlist,
      owned: {'name':null, 'descript':null}
    }
  },
  components: { Item, None },
  methods: {
    toggleOwned(data) {
      if (this.owned.name == data.name) {
        this.owned.name = null
        this.owned.descript = null
      } else {
        this.owned = data
      }
    }
  }
}
</script>

<style>
div#inventory {
  display: flex;
  flex-direction: row;
  width: 450px;
  height: 300px;
}

div#owned-item {
  margin: 30px;
}

div.wrapper#owned {
  display: flex;
  flex-direction: row;
}
</style>
