<template>
  <div id="owned-item">
    <h4>소지하고 있는 아이템</h4>
    <div v-if="owned.length > 0">
      <div v-for="ownedId in owned" :key="ownedId.id" id="owned-itemlist">
        <img
          :src="require(`@/assets/item/${itemlist[ownedId].imgURL}`)"
          alt="loading"
        />
      </div>
    </div>
    <div v-else>
      <p>아직 소지하고 있는 아이템이 없습니다.</p>
    </div>
  </div>

  <div id="inventory">
    <component
      @addItem="toggleOwned"
      v-for="item in itemlist"
      :key="item.id"
      :item="item"
      :owned="owned"
      :is="'Item'"
    />
    <!-- 존재하는 아이템 총 개수 = 6 -->
    <component
      v-for="n in 6 - Object.keys(this.itemlist).length"
      :is="'None'"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Item from "../components/inventory/Item.vue";
import None from "../components/inventory/None.vue";

export default {
  data() {
    return {
      itemlist: ref([]),
      owned: ref([]),
    };
  },
  components: { Item, None },
  beforeMount() {
    fetch("http://localhost:3000/itemlist")
      .then((response) => response.json())
      .then((data) => (this.itemlist = data))
      .catch((error) => console.log(error.message));
  },
  methods: {
    toggleOwned(data) {
      var array = this.owned;
      var index = array.indexOf(data.id);
      if (index === -1) array.push(data.id);
      else array.splice(index, 1);
    },
  },
};
</script>

<style scoped>
#owned-item {
  width: 930px;
  height: 210px;
  margin: 15px;
  padding: 20px;
  border: 7px #275a68 solid;
  font-size: 25px;
}

#owned-item div {
  height: 140px;
  display: table-cell;
  vertical-align: middle;
  color: gray;
}

#owned-itemlist {
  display: inline;
}

#owned-itemlist img {
  width: 100px;
  height: 100px;
  margin: 20px 10px;
}

#inventory {
  display: flex;
  flex-wrap: wrap;
  width: 965px;
}
</style>
