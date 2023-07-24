<template>
<div class="page-wrapper">
    <div class="contents" id="merge-area">
        <h3>[합치기 규칙]</h3>
        <p>
            - 좌우에 합치기 가능한 글자가 있을 경우에 선택한 글자와 합쳐 새로운 글자를 만들 수 있습니다. <br/>
            - 만들어진 글자는 선택한 칸 중 가장 왼쪽 칸에 합쳐지며, 전체 행이 없어진 칸만큼 왼쪽으로 밀립니다.

            <button id="toggle-merge-rule" @click="show_mergerule = !show_mergerule">합치기 규칙 보기</button>
            <ul v-if="show_mergerule" id="merge-rule">
                <li class="jaeum">ㄱ + ㆍ → ㅋ</li>
                <li class="jaeum">ㄱ + ㄱ → ㄲ</li>
                <li class="jaeum">ㄷ + ㆍ → ㄷ</li>
                <li class="jaeum">ㄷ + ㄷ → ㄸ</li>
                <li class="jaeum">ㅁ + _ → ㅂ</li>
                <li class="jaeum">ㅁ + ㆍ → ㅍ</li>
                <li class="jaeum">ㅇ + ㆍ → ㅎ</li>
                <li class="jaeum">ㅅ + ㆍ → ㅊ</li>
                <li class="jaeum">ㅅ + _ → ㅈ</li>
                <li class="jaeum">ㅅ + ㅅ → ㅆ</li>
                <li class="jaeum">ㅂ + ㅂ → ㅃ</li>
                <li class="jaeum">ㅈ + ㅈ → ㅉ</li>
                <li class="moeum">ㅏ + ㆍ → ㅑ</li>
                <li class="moeum">ㅏ + | → ㅐ</li>
                <li class="moeum">ㅓ + ㆍ → ㅕ</li>
                <li class="moeum">ㅓ + | → ㅔ</li>
                <li class="moeum">ㅗ + ㆍ → ㅛ</li>
                <li class="moeum">ㅜ + ㆍ → ㅠ</li>
                <li class="moeum">ㅐ + ㆍ → ㅒ</li>
                <li class="moeum">ㅔ + ㆍ → ㅖ</li>
            </ul>
        </p>
        <QuizArea :set="this.merge_set" quiz_id="rules_merge"/>
    </div>
    <div class="contents" id="word-area">
        <h3>[단어 조합]</h3>
        <p>
            - 단어 조합을 할 때는 가장 맨 위의 왼쪽 칸을 기준으로 오른쪽으로 2칸, 아래로 3칸(2x3)의 자음 모음을 골라 단어를 만들 수 있습니다. <br>
            - 단어가 만들어지면 6칸이 하나로 합쳐지며, 분해가 불가능합니다.
        </p>
        <QuizArea :set="this.word_set" quiz_id="rules_word"/>
    </div>
    <div class="contents" id="space-area">
        <h3>[빈칸]</h3>
        <p>
            - 빈칸은 빈칸이라는 행동을 했을 때 2x3 범위 내에 있는 글자들을 조합해 단어를 만들 수 없을 때 해당 단위에 있는 모든 칸을 빈칸으로 만들 수 있습니다.<br>
            - 만약 단어 조합에 사용되는 영역의 글자들로 단어를 만들 수 있으면 빈칸을 만들 수 없습니다.
        </p>
        <QuizArea :set="this.space_set" quiz_id="rules_space"/>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
import tutorialJSON from '../assets/tutorial.json'
import QuizArea from '../components/QuizArea.vue'

export default {
    name: 'Tutorial',
    components: { QuizArea },
    setup() {
        const merge_set = ref([])
        const word_set = ref([])
        const space_set = ref([])

        merge_set.value = tutorialJSON.merge
        word_set.value = tutorialJSON.word
        space_set.value = tutorialJSON.space

        return {
            merge_set,
            word_set,
            space_set
        }
    },
    data() {
        return {
            show_mergerule: false  
        }
    }
}
</script>

<style scoped>
h3 {
  font-size: 25px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

#toggle-merge-rule {
    margin: 30px;
    padding: 15px 10px;
    font-size: 15px;
    background: #1aa5cb;
    text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
    color: white;
    box-sizing: border-box;
    box-shadow: 0 25px 0 rgba(255, 255, 255, 0.4) inset,
        0 -5px 0 rgba(0, 0, 0, 0.2) inset, 0 0 0 100px #1aa5cb inset;
    background-color: white;
    border-radius: 10px;
}

#merge-rule {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #3B2F2Ccc;
    height: 500px;   
}

li.jaeum {
    font-size: 15px;
    color: azure;
}

li.moeum {
    font-size: 15px;
    color: yellow;
}
</style>