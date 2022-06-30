<template>
  <div @click="clickItem" :class="{ wrapper: true, owned: item.owned }">
    <h3>{{ item.name }}</h3>
    <img
      :src="require(`@/assets/item/${item.texture}`)"
      alt="loading"
      class="item"
    />
    <p class="hover">{{ item.descript }}</p>
  </div>
</template>

<script>
export default {
  props: [ 'item' ],
  methods: {
    clickItem() {
      this.$emit('addItem', {
        item: this.item
      })
    }
  }
}
</script>

<style>
.wrapper {
  flex: 0 0 190px;
  height: 280px;
  background: white;
  margin: 10px;
  padding: 10px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 10px 0 rgba(255, 255, 255, 0.4) inset,
    0 -10px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 310px #93d4ec inset;
  border-style: solid;
  border-width: 4px;
  border-color: #2983a3;
  border-image-slice: 4;
  border-image-width: 2;
  border-image-outset: 0;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%232983a3' /></svg>");
}

.wrapper h3 {
  font-weight: normal;
  height: 120px;
  width: 190px;
  font-size: 30px;
  padding: 20px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #ffffff;
}

.wrapper .hover {
  display: none;
  font-size: 20px;
}

.wrapper:hover .hover {
  background: #93d4ec;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 0 rgba(255, 255, 255, 0.4) inset,
    0 -10px 0 rgba(0, 0, 0, 0.2) inset;
}

.wrapper img {
  width: 130px;
  height: 130px;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translateX(-50%);
}

.item {
  background: #ebf6fa;
  border: 2px solid #70acc2;
  border-radius: 5px;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1) inset;
}

.owned {
  filter: brightness(80%);
}
</style>