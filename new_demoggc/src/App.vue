<template>
  <Navbar/>
  <div id="router-view" class="pixel-borders--1">
    <router-view />
    <router-link :to="{ name: 'License' }" class="license"
      >license
    </router-link>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar }
}
</script>

<style>
@import "./styles/pixel-borders.css";

@font-face {
  font-family: "Sam3KRFont";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/Sam3KRFont.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "NeoDunggeunmo";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "NeoDunggeunmo";
  font-size: 16px;
  line-height: 200%;
}

#router-view {
  width: 995px;
  padding: 25px;
  padding-top: 60px;
  position: relative;
  top: -5px;
  border-width: 5px;
}

h3 {
  font-weight: normal !important;
}

li {
  font-size: 27px;
  padding: 20px;
  position: relative;
  text-align: center;
  display: flex;
  transition: 0.4%;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  display: inherit;
  width: inherit;
  height: inherit;
}

.license {
  text-decoration: underline;
  position: absolute;
}
</style>
