<template>
  <div id="item">
    <a id="item1" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템1
      <div>아이템1 설명</div>
    </a>
    <a id="item2" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템2
      <div>아이템2 설명</div>
    </a>
    <a id="item3" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템3
      <div>아이템3 설명</div>
    </a>
    <a id="item4" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템4
      <div>아이템4 설명</div>
    </a>
    <a id="item5" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템5
      <div>아이템5 설명</div>
    </a>
    <a id="item6" @click="addItem($event)" @dblclick="deleteItem($event)"
      >아이템6
      <div>아이템6 설명</div>
    </a>
    <div id="owned">
      현재 소유한 아이템:
      <li :key="item" v-for="item in items">{{ item }}</li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    addItem(event) {
      if (!this.items.includes(event.currentTarget.id))
        this.items.push(event.currentTarget.id);
    },
    deleteItem(event) {
      //  targetId = event.currentTarget.id;
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] == event.currentTarget.id) this.items.splice(i, 1);
      }
    },
  },
};
</script>

<style scoped>
#item a {
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

#item a:hover div {
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

#item a div {
  display: none;
}

#owned {
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
