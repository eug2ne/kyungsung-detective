<template>
  <Navbar>
    <li><router-link :to="{ name: 'Map' }">맵</router-link></li>
    <li><router-link :to="{ name: 'Cluenote' }">단서노트</router-link></li>
    <li><router-link :to="{ name: 'Quiz' }">단서판서</router-link></li>
  </Navbar>
  <div>
    <div v-if="ownedItems.includes(7)">여기</div>

    <div id="ownedBox">
      <div>현재 소유한 아이템:</div>
      <div v-for="itemIdx in ownedItems" :key="itemIdx">
        &nbsp;<img :src="items[itemIdx].img" />
      </div>
    </div>
    <div class="hidden">empty space</div>

    <div v-for="(item, index) in items" :key="index">
      <div
        v-if="item.access === 1"
        v-bind:id="index"
        class="item"
        @click="addItem($event)"
        @dblclick="deleteItem($event)"
      >
        <div class="isOwned">{{ isOwned(index) }}</div>
        <img align="middle" :src="item.img" />
        <div>{{ item.name }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
      <div v-else class="lockedItem">아이템을 잠금 해제하세요</div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: { Navbar },
  data() {
    return {
      items: [
        {
          access: 1,
          name: "item1",
          description: "item1 description",
          img: require("../img/item1.png"),
        },
        {
          access: 1,
          name: "item2",
          description: "item2 description",
          img: require("../img/item2.png"),
        },
        {
          access: 1,
          name: "item3",
          description: "item3 description",
          img: require("../img/item3.png"),
        },
        {
          access: 1,
          name: "item4",
          description: "item4 description",
          img: require("../img/item4.png"),
        },
        {
          access: 0,
          name: "item5",
          description: "item5 description",
          img: require("../img/item5.png"),
        },
        {
          access: 0,
          name: "item6",
          description: "item6 description",
          img: require("../img/item6.png"),
        },
      ],
      ownedItems: [],
    };
  },

  methods: {
    addItem(event) {
      var targetId = parseInt(event.currentTarget.id);
      if (!this.ownedItems.includes(targetId)) this.ownedItems.push(targetId);
    },
    deleteItem(event) {
      var targetId = parseInt(event.currentTarget.id);
      for (var i = 0; i < this.ownedItems.length; i++)
        if (this.ownedItems[i] == targetId) this.ownedItems.splice(i, 1);
    },
    isOwned(index) {
      if (this.ownedItems.includes(index)) return "✔소지 중인 아이템입니다";
    },
  },
};
</script>

<style scoped>
#ownedBox {
  width: 95%;
  height: 85px;
  margin: 15px;
  padding: 15px;
  border-style: solid;
  float: left;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  white-space: nowrap;
}

#ownedBox div img {
  width: 70px;
  height: 70px;
}

.hidden {
  float: left;
  width: 100%;
  visibility: hidden;
}

.item {
  width: 250px;
  height: 250px;
  margin: 15px;
  border-style: solid;
  float: left;
  position: relative;
  text-align: center;
}

.item img {
  width: 80%;
  height: 80%;
}

.item:hover .description {
  background-color: #84c0d5;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  border: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.item .description {
  display: none;
}

.isOwned {
  height: 25px;
}

.lockedItem {
  width: 250px;
  height: 250px;
  margin: 15px;
  background-color: gray;
  border-style: solid;
  float: left;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
</style>
