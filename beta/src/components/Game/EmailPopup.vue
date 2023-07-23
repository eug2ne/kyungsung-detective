<template>
  <div class="backdrop" v-if="this.show">
    <span @click="this.show=false" class="x-button">x</span>
    <div id="email-popup" class="popup">
        <h3>'경성 탐정' 뉴스레터를 시작했습니다!</h3>
        <p>
          2주일에 1번, 베타판 업데이트 소식이나 개발 과정에서의 소소한 에피소드들을 담은 뉴스레터를 보내드릴 예정입니다.
          <br>
          '경성 탐정' 소식을 빠르게 받아보고 싶으시다면 이메일 주소를 남겨주세요!
        </p>

        <input type="email" v-model="email" placeholder="address@email.com" @click="this.email = ''">
        <button @click="sendEmailFeedback">>></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EmailPopup',
  data() {
    return {
      show: true,
      email: ''
    }
  },
  methods: {
    sendEmailFeedback() {
      // check email validity
      const email_regex = /^[^\s@]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
      if (!email_regex.test(this.email)) {
        this.email = '이메일 주소를 다시 확인해주시기 바랍니다.'
        return
      }

      // send email+feedback via forms-url
      const url = 'https://docs.google.com/forms/d/e/1FAIpQLScOSzVu791TRBbvThziaMD5AHOa92IVRb2u8WTq7v9tNuxcTA/formResponse?&submit=Submit?usp=pp_url&entry.2067990364='
        +this.email
        +'&entry.1870031164='
        +this.feedback

      axios.post(url)

      this.show = false
    }
  }
}
</script>

<style scoped>
.backdrop {
  width: 100%;
  height: 100%;
}

.popup {
  width: 600px;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  color: black;
  background-color: #fbffc0;
}

h3 {
  font-size: 30px;
  margin-bottom: 15px;
  text-align: left;
  text-decoration: underline;
  text-decoration-color: #303aff;
  text-decoration-thickness: 5px;
}

p {
  font-size: 15px;
  text-align: left;
  line-break: strict;
  margin: 0px 12px;
}

button {
  position: absolute;
  left: 80%;
  top: 70%;
  height: 45px;
  padding: 0px 5px;
  font-size: 50px;
  text-align: right;
  color: white;
  text-shadow: -3px 0 #000;
  background-color: #303aff;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 0px #404040;
}

input[type=email] {
  width: 80%;
  margin: 10px 0px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #303aff;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px 20px;
  font-family: 'NeoDunggeunmo';
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #303aff;
  resize: none;
}

input[type=email]:focus, textarea:focus {
  outline: none;
  border: 2px solid #303aff;
  border-radius: 5px;
}
</style>