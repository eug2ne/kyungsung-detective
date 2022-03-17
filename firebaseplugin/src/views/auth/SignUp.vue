<template>
  <router-link :to="{ name: 'Home' }" class="x-button">x</router-link>
  <div class="auth-contents">
    <h2>회원가입</h2>
    <div class="bl-line"></div>
    <p>이름을 입력해 주세요.</p>
    <input type="text" placeholder="이름" v-model="displayName" id="displayName"/> <br />
    <p>이메일을 입력해 주세요.</p>
    <input type="email" placeholder="아이디(이메일)" v-model="email" /> <br />
    <p>
      비밀번호를 입력해 주세요. <br />
      (6글자 이상)
    </p>
    <input type="password" placeholder="비밀번호" v-model="password" /> <br />
    <p>비밀번호를 한 번 더 입력해 주세요.</p>
    <input type="password" placeholder="비밀번호" v-model="passwordCheck" />
    <br />
    <button class="pixel-borders--1" @click="signUp">가입하기</button>
  </div>
</template>

 <script>
import firebase, { auth, db } from '../../firestoreDB'

export default {
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      passwordCheck: '',
    }
  },
  methods: {
    signUp() {
      let self = this
      if (this.password === this.passwordCheck) {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            function (result) {
              result.user.updateProfile({
                displayName: document.getElementById("displayName").value
              })
              self.addUser()
              self.$router.replace("/login")
            },
            function (err) {
              alert("에러 : " + err.message)
            }
          )
      } else {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    addUser(){
      const user = auth.currentUser
      db.collection('Users').doc(user.uid).set({
        uid: user.uid,
    	  displayName: this.displayName,
        email: user.email,
      })
    }
  },
}
</script>

<style scoped>
.auth-contents p {
  text-align: left;
  margin-left: 35px;
  font-size: 18px;
}

.auth-contents input {
  margin-bottom: 25px;
}
</style>