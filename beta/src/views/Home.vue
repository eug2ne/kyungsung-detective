<template>
  <div id="router-view" class="pixel-borders--1">
      <img src="../assets/logo/logo500px.png" alt="logo" />
      <button @click="signIn" class="link-button pixel-borders--2">
        시작하기
      </button>
      <router-link :to="{ name: 'License' }" class="license">license</router-link>
  </div>
</template>

<script>
import { browserLocalPersistence, setPersistence, signInAnonymously } from 'firebase/auth'
import { auth, addData } from '../firestoreDB'
import { useGameStore } from '../game/game'

export default {
  name: 'Home',
  methods: {
    signIn() {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInAnonymously(auth)
            .then(async (userCredential) => {
              console.log(userCredential)
              // login success
              await addData(userCredential)
              // boot useGameStore()
              await useGameStore().boot('k_detective_beta', '시작') // load stage-data from db + save to game-store
              // direct to main.vue
              this.$router.replace('/Game')
            })
            .catch((error) => {
              alert('다음과 같은 이유로 실패했습니다: ' + error.message)
            })
        })
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
}

img {
  display: block;
  margin: auto;
  width: 500px;
  height: 500px;
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