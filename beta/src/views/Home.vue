<template>
  <div id="router-view" class="pixel-borders--1">
    <div>
      <img src="../assets/logo/logo500px.png" alt="logo" />
      <router-link :to="{ name: 'Login' }" class="link-button pixel-borders--2"
        >시작하기
      </router-link>
      <router-link :to="{ name: 'License' }" class="license">license</router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
div {
  text-align: center;
}

img {
  display: block;
  margin: auto;
}

.link-button {
  margin: 30px;
  padding: 15px 10px;
  font-size: 35px;
  background: #1aa5cb;
  display: inline-block;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
  color: white;
  box-sizing: border-box;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 25px 0 rgba(255, 255, 255, 0.4) inset,
    0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 100px #1aa5cb inset;
  background-color: white;
  border-radius: 10px;
}

.license {
  text-decoration: underline;
  position: absolute;
  bottom: 0%;
  left: 0%;
  margin: 10px 30px;
}
</style>