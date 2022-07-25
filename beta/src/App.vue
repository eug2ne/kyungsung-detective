<template>
  <router-view />
</template>

<script>
import { auth } from './firestoreDB'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'app',
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // login success
        this.$router.replace('Map')
      } else {
        // before login
      }
    })
  }
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
  min-height: 725px;
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
</style>
