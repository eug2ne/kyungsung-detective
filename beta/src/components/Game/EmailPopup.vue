<template>
  <div class="backdrop" v-if="this.show">
    <span @click="this.show=false" class="x-button">x</span>
    <div id="email-popup">
        <h3>'경성 탐정'을 즐겁게 플레이 하셨나요?</h3>
        <p>
          '경성 탐정'은 앞으로 여러분의 피드백을 기반으로, 여러 번의 업데이트를 통해 게임 시스템을 완성해나갈 예정입니다.
          <br>
          베타판 업데이트, 정식판 출시 소식 등 '경성 탐정' 소식을 빠르게 받아보고 싶으시다면 이메일 주소를 남겨주세요!
        </p>

        <input type="email" v-model="email" placeholder="address@email.com">
        <button>>></button>
        <textarea v-model="feedback" placeholder="팀에게 피드백을 남겨주시면 큰 도움이 됩니다!"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailPopup',
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.backdrop {
  display: flex;
  position: absolute;
  left: 10%;
  width: 80%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: transparent;
  backdrop-filter: blur(5px);
}

#email-popup {
  position: absolute;
  width: 600px;
  height: 430px;
  padding: 20px;
  border-radius: 10px;
  color: black;
  background-color: #5ad5fa;
}

h3 {
  font-size: 30px;
  margin-bottom: 15px;
  text-align: left;
  text-shadow: 1.5px 0 #ffff, 0 1.5px #ffff;
}

p {
  font-size: 15px;
  text-align: left;
  line-break: strict;
  margin: 0px 12px;
}

button {
  position: absolute;
  left: 52%;
  top: 47%;
  height: 45px;
  padding: 0px 5px;
  font-size: 50px;
  text-align: right;
  color: white;
  text-shadow: -3px 0 #000;
  background-color: #fa5a5a;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 0px #404040;
}

input[type=email] {
  width: 50%;
  margin: 10px 0px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #fa5a5a;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px 20px;
  font-family: 'NeoDunggeunmo';
  font-size: 20px;
  border: none;
  border-bottom: 2px solid #fa5a5a;
  resize: none;
}

input[type=email]:focus, textarea:focus {
  outline: none;
  border: 2px solid #fa5a5a;
  border-radius: 5px;
}
</style>