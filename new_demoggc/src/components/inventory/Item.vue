<template>
  <div @click="clickItem" :class="{ wrapper: true, owned: isOwned() }">
    <h3>{{ item.name }}</h3>
    <img :src="require(`@/assets/item/${item.imgURL}`)" alt="loading" />
    <p class="hover">{{ item.descript }}</p>
  </div>
</template>

<script>
export default {
  props: ["item", "owned"],
  methods: {
    clickItem() {
      this.$emit("addItem", {
        id: this.item.id,
      });
    },
    isOwned() {
      var array = this.owned;
      var index = array.indexOf(this.item.id);
      if (index === -1) return false;
      else return true;
    },
  },
};
</script>

<style>
.wrapper {
  flex: 0 0 210px;
  height: 310px;
  background: #b0eeff;
  margin: 15px;
  padding: 10px;
  position: relative;
}

.wrapper h3 {
  height: 120px;
  width: 190px;
  font-size: 28px;
  padding: 20px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.wrapper .hover {
  display: none;
  font-size: 20px;
  margin: 10px;
}

.wrapper:hover .hover {
  background: #b0eeff;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.wrapper img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
}

.owned {
  filter: brightness(80%);
}
</style>