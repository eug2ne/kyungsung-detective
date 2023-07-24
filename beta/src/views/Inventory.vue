<template>
<div class="page-wrapper">
  <div id="owned-item" class="pixel-borders--2">
    <h4>소지하고 있는 아이템 :</h4>
    <div v-if="this.carry_item.length > 0">
      <div v-for="carryId in this.carry_item" :key="carryId.id" id="carry-itemlist">
        <img
          :src="require(`@/assets/item/${carryId.texture}`)"
          alt="carry-item"
          class="item"
        />
      </div>
    </div>
    <div v-else>
      <p>아직 소지하고 있는 아이템이 없습니다.</p>
    </div>
  </div>

  <div id="inventory" class="page-wrapper">
    <component
      @addItem="toggleCarry"
      v-for="item in this.inventory"
      :key="item.id"
      :item="item"
      :is="'Item'"
    />
    <component
      v-for="n in 6 - Object.keys(this.inventory).length"
      :key="n.id"
      :is="'None'"
    />
  </div>
</div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useGameStore } from '../game/game'
import Item from '../components/inventory/Item.vue'
import None from '../components/inventory/None.vue'

export default {
  components: { Item, None },
  computed: {
    ...mapWritableState(useGameStore, ['inventory', 'carry_item'])
  },
  methods: {
    toggleCarry(item) {
      if (this.carry_item.length > 0) {
        this.carry_item = (this.carry_item[0].id == item.id) ? []:[item]
      } else {
        this.carry_item = [item]
      }
    },
  }
}
</script>

<style>
#owned-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 680px;
  height: 210px;
  padding: 30px 40px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 0 10px #4d9bb9 inset, 0 0 0 210px #e9f6fb inset;
  background: white;
  position: relative;
  border-width: 4px;
  border-color: #1c576d;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%231c576d' /></svg>");
}

#owned-item:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-style: solid;
  border-width: 4px;
  border-color: #1c576d;
  border-image-slice: 4;
  border-image-width: 2;
  border-image-outset: 0;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%231c576d' /></svg>");
}

#owned-item h4 {
  font-size: 30px;
  width: 210px;
  margin: 10px;
}

#owned-item div p {
  height: 140px;
  width: 380px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  color: gray;
  font-size: 25px;
}

#owned-itemlist {
  display: inline;
}

#owned-itemlist img {
  width: 120px;
  height: 120px;
  margin: 10px;
  box-shadow: -4px -4px 0 rgba(0, 0, 0, 0.1) inset;
  background: white;
}

#inventory {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: start;
  align-items: flex-start;
}
</style>
