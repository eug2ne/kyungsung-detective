<template>
  <nav>
    <button class="navbar" id="terminate">
      <img src="../assets/refresh.png" alt="">
    </button>
    <ul class="navbar">
      <slot></slot>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
nav {
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

ul {
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
}
</style>
