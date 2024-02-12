<template>
  <span>버그 제보는 monthly5Rock@gmail.com으로</span>
  <router-view></router-view>
</template>

<script>
import { auth, db } from './firestoreDB'
import { useGameStore } from './game/game'
import { onAuthStateChanged } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

export default {
  name: 'app',
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // check user-doc exist
        const USER_DOC = doc(db, `BetaUsers/${user.uid}`)
        const USER_SNAP = await getDoc(USER_DOC)

        if (!USER_SNAP.exists()) {
          // direct to home.vue
          this.$router.replace('/')
          return
        }

        // login success
        if (!useGameStore().$state.booted) {
          // boot useGameStore()
          await useGameStore().boot('k_detective_beta', '시작')
        } // load stage-data from db + save to game-store
        // direct to main.vue
        this.$router.replace('/Game')
      } else {
        // before login / user-auth data expired
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

@font-face {
  font-family: 'DOSIyagiMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSIyagiMedium.woff2')
    format('woff2');
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

img {
  display: inherit;
  width: inherit;
  height: inherit;
}

ul {
  list-style-type: none;
}

#router-view {
  width: 1270px;
  min-height: 730px;
  padding: 25px;
  position: relative;
  top: -5px;
  border-width: 5px;
}

.page-wrapper {
  width: 995px;
  margin: 0 auto;
}

.rotate {
  transform: rotate(-360deg);
  transition-duration: 1s;
}

.icon, .icon:focus {
  display: inline-block;
  width: fit-content;
  height: 45px;
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 15px;
}

.backdrop {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: transparent;
  backdrop-filter: blur(10px);
}

.popup {
  position: absolute;
}

.wrapper {
  display: flex;
  flex-direction: row;
}

.group {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin: 0 10px;
  padding: 5px;
  text-align: left;
}

.description {
  display: inline-block;
  font-size: 20px;
  text-align: left;
  line-height: 30px;
  line-break: auto;
  letter-spacing: -1px;
  word-break: keep-all;
  padding: 10px;
  text-align: left;
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