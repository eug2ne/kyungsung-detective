<template>
  <router-link :to="{ name: 'Home' }" class="x-button">x</router-link>
  <div class="auth-contents">
    <h2>로그인</h2>
    <div class="bl-line"></div>
    <input type="email" placeholder="아이디(이메일)" v-model="email" /> <br />
    <input type="password" placeholder="비밀번호" v-model="password" /> <br />
    <button class="pixel-borders--1" @click="clickOnEmailLogin">로그인</button>
    <div class="link">
      <router-link :to="{ name: 'SignUp' }"> 회원가입 하러 가기</router-link>
    </div>
    <div class="gr-line"></div>
    <p class="title">간편 로그인</p>
    <img
      src="..\..\assets\btn_google_signin.png"
      alt="google-login"
      @click="clickOnGoogleLogin"
      class="link-img"
    />
  </div>
</template>

<script>
import { emailLogin, googleLogin } from '../../firestoreDB'

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async clickOnEmailLogin() {

      await emailLogin(this.email, this.password)
    },
    async clickOnGoogleLogin() {
      await googleLogin()
    }
  },
}
</script>

<style>
.auth-contents {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 130%;
}

button,
input {
  font-family: "NeoDunggeunmo";
}

.link-img,
button {
  cursor: pointer;
}

.auth-contents h2 {
  font-size: 30px;
}

.auth-contents input,
.auth-contents button {
  height: 40px;
  width: 280px;
  margin: 5px;
  padding: 0 10px;
  font-size: 20px;
}

.auth-contents button {
  margin: 10px;
  box-shadow: -3px -3px 0 rgba(0, 0, 0, 0.2) inset;
  border-radius: 5px;
}

.auth-contents img {
  width: 220px;
  display: block;
  margin: auto;
}

.auth-contents .link {
  text-decoration: underline;
}

.auth-contents .title {
  margin: 10px;
  font-size: 20px;
}

.bl-line {
  width: 350px;
  height: 2px;
  background: black;
  margin: 20px 0;
}

.gr-line {
  width: 280px;
  height: 2px;
  background: rgb(161, 161, 161);
  margin: 25px auto;
}
</style>