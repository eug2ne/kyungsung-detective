<template>
  <div @click="clickItem" :class="{ wrapper: true, owned: isOwned() }">
    <h3>{{ item.name }}</h3>
    <p>{{ item.descript }}</p>
    <img :src="require(`@/assets/item/${item.imgURL}`)" alt="loading" />
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
  height: 380px;
  background: #b0eeff;
  margin: 15px;
  padding: 10px;
  position: relative;
}

.wrapper h3 {
  font-size: 30px;
  padding: 20px;
  text-align: center;
}

.wrapper p {
  font-size: 20px;
  margin: 10px;
  position: absolute;
  top: 28%;
}

.wrapper img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
}
.owned {
  background-color: #84c0d5;
}
</style>