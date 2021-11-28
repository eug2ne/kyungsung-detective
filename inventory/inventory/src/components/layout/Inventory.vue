<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <div
        v-if="item.access === 1"
        v-bind:id="index"
        class="item"
        @click="addItem($event)"
        @dblclick="deleteItem($event)"
      >
        {{ item.name }}
        <div>{{ item.description }}</div>
      </div>
      <div v-else class="lockedItem">아이템을 잠금 해제하세요</div>
    </div>

    <div id="ownedBox">
      현재 소유한 아이템:
      <b v-for="(item, index) in items" :key="index">
        <b v-if="item.owned === 1">&nbsp;{{ item.name }}&nbsp;</b>
      </b>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          access: 1,
          name: "item1",
          description: "item1 description",
          owned: "",
        },
        {
          access: 1,
          name: "item2",
          description: "item2 description",
          owned: "",
        },
        {
          access: 1,
          name: "item3",
          description: "item3 description",
          owned: "",
        },
        {
          access: 1,
          name: "item4",
          description: "item4 description",
          owned: "",
        },
        {
          access: 0,
          name: "item5",
          description: "item5 description",
          owned: "",
        },
        {
          access: 0,
          name: "item6",
          description: "item6 description",
          owned: "",
        },
      ],
    };
  },
  methods: {
    addItem(event) {
      var thisId = event.currentTarget.id;
      this.items[thisId].owned = 1;
      console.log(this.items[thisId].owned);
    },
    deleteItem(event) {
      var thisId = event.currentTarget.id;
      this.items[thisId].owned = 0;
      console.log(this.items[thisId].owned);
    },
  },
};
</script>

<style scoped>
.item {
  width: 100px;
  height: 100px;
  margin: 15px;
  padding: 130px;
  background-color: #b0eeff;
  border-style: solid;
  float: left;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  white-space: nowrap;
}
.lockedItem {
  width: 100px;
  height: 100px;
  margin: 15px;
  padding: 130px;
  background-color: gray;
  border-style: solid;
  float: left;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  white-space: nowrap;
}

.item:hover div {
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

.item div {
  display: none;
}

#ownedBox {
  width: auto;
  height: 50px;
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
</style>
