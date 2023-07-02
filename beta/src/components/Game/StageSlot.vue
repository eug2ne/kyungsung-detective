<template>
  <div class="slot pixel-borders--2" v-for="slot_key in Object.keys(this.slot_data)" :key="slot_key.key"
    :class="{ auto: slot_key === 'auto', empty: !this.slot_data[slot_key] }" @click="clickSlot(slot_key)">
    <div v-if="slot_key === 'auto'">
      <h3>자동 저장 슬롯</h3>
      <p>스테이지: {{ this.stageName(this.slot_data[slot_key].Stage.key) }}</p>
      <p>마지막 저장 시간: {{ this.slot_data[slot_key].lastUpdated.toDate() }}</p>
    </div>
    <div v-else-if="slot_data[slot_key]">
      <p>스테이지: {{ this.stageName(this.slot_data[slot_key].Stage.key) }}</p>
      <p>마지막 저장 시간: {{ this.slot_data[slot_key].lastUpdated.toDate() }}</p>
    </div>
    <div v-else>
      <h3>비어있는 슬롯입니다.</h3>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useGameStore } from '@/game/game'
import { db } from '@/firestoreDB'
import { collection, doc, getDocs, Timestamp } from 'firebase/firestore'

export default {
  name: 'StageSlot',
  props: [ 'mode' ],
  async setup() {
    const slot_data = ref({ auto: null, 0: null, 1: null, 2: null, 3: null })

    // import all slot-doc from slots-collection
    const USER_DOC = doc(db, `BetaUsers/${useGameStore().UID}`)
    const USER_SLOTS = collection(USER_DOC, 'Games/k_detective_beta/Slots')
    const QUERY_SNAP = await getDocs(USER_SLOTS)
    
    QUERY_SNAP.forEach((doc) => {
      slot_data.value[doc.id] = doc.data()
    })
    
    return {
      slot_data
    }
  },
  methods: {
    async clickSlot(slot_key) {
      if (slot_key === 'auto') return

      if (this.mode === 'save') {        
        // save stage-config, cluenote, inventory to slot
        this.slot_data[slot_key] = {
          Stage: { key: useGameStore().stage.key },
          lastUpdated: Timestamp.fromDate(new Date())
        }
        await useGameStore().saveSlot('k_detective_beta', '시작', slot_key)
      } else if (this.mode === 'load') {
        // rollback to slot-data
        await useGameStore().loadSlot('k_detective_beta', '시작', slot_key)
        
        // reload page
        this.emitter.emit('reload')
      }
    },
    stageName(stageKey) {
      const stageMap = {
        'BreakfastStage': '아침식사',
        'Test1Stage': '첫번째 시험',
        'Test2Stage': '두번째 시험',
        'Test3Stage': '세번째 시험'
      }

      return stageMap[stageKey]
    }
  }
}
</script>
<style scoped>
.slot {
  margin: 10px 0;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #ebd661;
}

.auto {
  background-color: #4a9bd5;
}

.empty {
  background-color: #dfe0c294;
}

h3 {
  text-decoration: underline;
  text-decoration-color: white;
  text-decoration-thickness: 3px;
}
</style>