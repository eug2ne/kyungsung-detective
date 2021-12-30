<template>
  <div id="Answer-area">
      <h2 ref="h2">{{ this.$data[this.id].answer }}</h2>
      <p v-if="showdef">{{ this.$data[this.id].definition }}</p>
  </div>
</template>

<script>
export default {
    name: 'AnswerArea',
    props: [ 'id' ],
    data() {
        return {
            quiz_1: {
                'answer' : '_ _    _ _ _',
                'first' : 'ㅂ ㅁ    ㅈ ㅂ ㅇ',
                'definition' : '[합성어] 숨기어 남에게 드러내거나 알리지 말아야 할 정보가 흘러나오는 근원'
            },
            quiz_2: {
                'answer' : '_ _ _ _',
                'first' : 'ㅎ ㄹ ㅈ ㅈ',
                'definition' : '무슨 일을 하는 데에 가장 중요한 부분을 완성함을 비유적으로 이르는 말'
            },
            showdef: false
        }
    },
    mounted() {
        this.emitter.on('hint_first', () => {
            this.$refs.h2.innerHTML = this.$data[this.id].first
        }),
        this.emitter.on('hint_def', () => {
            this.showdef = true
        })
    }
}
</script>

<style scoped>
#Answer-area {
    width: 600px;
    height: 200px;
    justify-self: center;
    text-align: center;
    background-color: #FFDFD9;
    margin-bottom: 20px;
}

h2 {
    font-size: 45px;
    margin: 30px;
}

p {
    font-size: 25px;
    margin: 15px;
    padding: 10px;
}
</style>