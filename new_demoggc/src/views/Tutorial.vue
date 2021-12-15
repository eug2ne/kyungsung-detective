<template>
    <div>
    <h3>합치기 규칙을 사용해 새로운 글자를 만드십시오.</h3>
    <p>
    - 좌우에 합치기 가능한 글자가 있을 경우에 선택한 글자와 합쳐 새로운 글자를 만들 수 있습니다. <br>
    <img src="../assets/tutorial/tutorial1.jpg" alt="">
    <img src="../assets/tutorial/tutorial11.jpg" alt="">
    <br>
    - 만들어진 글자는 선택한 칸 중 가장 왼쪽 칸에 합쳐지며, 전체 행이 없어진 칸만큼 왼쪽으로 밀립니다. <br>
    <img src="../assets/tutorial/tutorial10.jpg" alt="">
    </p>
    <h4>합치기 규칙</h4>
    <img src="../assets/tutorial/tutorial2.jpg" alt="">

    <h3>단어 조합을 사용해 단어를 조합하시오.</h3>
    <p>
    - 단어 조합을 할 때는 가장 맨 위의 왼쪽 칸을 기준으로 오른쪽으로 2칸, 아래로 3칸(2x3)의 자음 모음을 골라 단어를 만들 수 있습니다. <br>
    <img src="../assets/tutorial/tutorial9.jpg" alt="">
    <img src="../assets/tutorial/tutorial8.jpg" alt="">
    <br>
    - 단어가 만들어지면 6칸이 하나로 합쳐지며, 분해가 불가능합니다. <br>
    <img src="../assets/tutorial/tutorial7.jpg" alt="">
    </p>

    <h3>빈칸 규칙을 사용해 빈칸을 만드십시오.</h3>
    <p>
    - 빈칸은 빈칸이라는 행동을 했을 때 2x3 범위 내에 있는 글자들을 조합해 단어를 만들 수 없을 때 해당 단위에 있는 모든 칸을 빈칸으로 만들 수 있습니다.<br>
    <img src="../assets/tutorial/tutorial6.jpg" alt="">
    <br>
    - 만약 단어 조합에 사용되는 영역의 글자들로 단어를 만들 수 있으면 빈칸을 만들 수 없습니다. <br>
    <img src="../assets/tutorial/tutorial5.jpg" alt="">
    </p>

    <h3>기타 규칙</h3>
    <img src="../assets/tutorial/tutorial3.jpg" alt="">
    <img src="../assets/tutorial/tutorial4.jpg" alt="">
    </div>

</template>

<script>
import { ref } from 'vue'
import QuizArea from '../components/QuizArea.vue'
import Letter from '../components/Letter.vue'

export default {
    name: 'Tutorial',
    components: { QuizArea, Letter },
    data() {
        return {
            merge_set:ref([]),
            word_set:ref([]),
            space_set:ref([])
        }
    },
    beforeMount() {
        fetch('http://localhost:3000/tutorial')
            .then(response => response.json())
            .then((data) => {
                this.merge_set = data['merge']
                this.word_set = data.word
                this.space_set = data.space
            })
            .catch(error => console.log(error.message))
    }
}
</script>

<style scoped>
div {
    display: inline;
    width: 100%;
    position: relative;
}

h3 {
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
}

img {
    width: 500px;
    margin: 10px;
}

p {
    font-size: 20px;
    margin-left: 30px;
    margin-bottom: 30px;
}
</style>