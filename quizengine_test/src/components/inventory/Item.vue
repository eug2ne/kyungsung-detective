<template>
  <div @click="clickItem" :class="{ wrapper:true, owned:this.isOwned }">
    <h3>{{ name }}</h3>
    <p>{{ descript }}</p>
    <img src="@/assets/item/item1.png" alt="loading">
  </div>
</template>

<script>
export default {
    props: ['name', 'descript'],
    methods: {
        clickItem() {
            this.$emit('addItem', {'name':this.name, 'descript':this.descript})
        }
    }
}
</script>

<style>
div.wrapper {
    display: block;
    width: 150px;
    height: 150px;
    justify-content: center;
    align-content: center;
    margin: 20px;
}

div.wrapper * {
    display: inline-block;
    padding: 10px;
}

div.wrapper h3 {
    font-size: 30px;
}

div.wrapper p {
    font-size: 20px;
}
</style>