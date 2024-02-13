<template>
<div class="contents">
    <!-- answer-area -->
    <AnswerArea :answerData="this.example.answer_data" />

    <div class="contents">
    <CrosswordArea :cwData="this.example.crossword_data"/>
    </div>
</div>
</template>

<script>
import example from '../assets/loadlists/example.json'
import AnswerArea from '@/components/Crossword/AnswerArea.vue'
import CrosswordArea from '@/components/Crossword/CrosswordArea.vue'

export default {
    name: 'Tutorial',
    components: { AnswerArea, CrosswordArea },
    data() {
        return {
            example: example
        }
    }
}
</script>