<template>
<div class="area" id="merge-area">
    <h3>[합치기 규칙]</h3>
    <p>
        - 좌우에 합치기 가능한 글자가 있을 경우에 <br> 선택한 글자와 합쳐 새로운 글자를 만들 수 <br> 있습니다.<br>
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
    <QuizArea :set="this.merge_set" id="rules_merge"/>
</div>
<div class="area" id="word-area">
    <h3>[단어<br>조합]</h3>
    <p>
        - 단어 조합을 할 때는 가장 맨 위의 왼쪽 칸을 기준으로 오른쪽으로 2칸, 아래로 3칸(2x3)의 자음 모음을 골라 단어를 만들 수 있습니다. <br>
        - 단어가 만들어지면 6칸이 하나로 합쳐지며, 분해가 불가능합니다.
    </p>
    <QuizArea :set="this.word_set" id="rules_word"/>
</div>
<div class="area" id="space-area">
    <h3>[빈칸]</h3>
    <p>
        <br>
        - 빈칸은 빈칸이라는 행동을 했을 때 2x3 범위 내에 있는 글자들을 조합해 단어를 만들 수 <br> 없을 때 해당 단위에 있는 모든 칸을 빈칸으로 만들 수 있습니다.<br>
        - 만약 단어 조합에 사용되는 영역의 글자들로 단어를 만들 수 있으면 빈칸을 만들 수 없습니다.
    </p>
    <QuizArea :set="this.space_set" id="rules_space"/>
</div>
<OptionsMenu @clickOption="showChoice"/>
</template>

<script>
import { ref } from 'vue'
import tutorialJSON from '../assets/tutorial.json'
import QuizArea from '../components/QuizArea.vue'
import OptionsMenu from '../components/OptionsMenu.vue'

export default {
    name: 'Tutorial',
    components: { QuizArea, OptionsMenu },
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
            show_mergerule: true   
        }
    }
}
</script>

<style scoped>
div.area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1000px;
    margin: 20px;
    padding: 20px;
    background-color: #FFDFD980;
}

h3 {
    display: block;
    font-size: 30px;
    width: 130px;
}

p {
    display: block;
    font-size: 20px;
    margin: 30px;
    width: 420px;
}

#toggle-merge-rule {
    display: block;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 0;
    width: auto;
    font-size: 25px;
    text-decoration: underline;
    color: #275A68;
}

#merge-rule {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    padding: 15px;
    background-color: #3B2F2Ccc;
    height: 650px;   
}

li.jaeum {
    color: azure;
}

li.moeum {
    color: yellow;
}
</style>