<template>
  <div class="slot pixel-borders--2" v-for="slot_key in Object.keys(this.slot_data)" :key="slot_key.key"
    :class="{ auto: slot_key === 'auto', empty: !this.slot_data[slot_key] }">
    <div v-if="slot_key === 'auto'">
      <h3>자동 저장 슬롯</h3>
      <p>스테이지: {{ this.STAGE_MAP[this.slot_data[slot_key].Stage.key] }}</p>
      <p>마지막 저장 시간: {{ this.slot_data[slot_key].lastUpdated.toDate() }}</p>
    </div>
    <div v-else-if="slot_data[slot_key]">
      <div class="hover">
        <ul class="wrapper">
          <li><button class="pixel-borders--2" @click="clickSlot(slot_key, 'save')">
            저장하기
          </button></li>
          <li><button class="pixel-borders--2" @click="clickSlot(slot_key, 'load')">
            불러오기
          </button></li>
        </ul>
      </div>
      <p>스테이지: {{ this.STAGE_MAP[this.slot_data[slot_key].Stage.key] }}</p>
      <p>마지막 저장 시간: {{ this.slot_data[slot_key].lastUpdated.toDate() }}</p>
    </div>
    <div v-else @click="clickSlot(slot_key, 'save')">
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
  data() {
    return {
      STAGE_MAP: {
        'BreakfastStage': '아침식사',
        'Test1Stage': '첫번째 시험',
        'Test2Stage': '두번째 시험',
        'Test3Stage': '세번째 시험'
      }
    }
  },
  methods: {
    async clickSlot(slot_key, mode) {
      if (slot_key === 'auto') return

      if (mode === 'save') {        
        // save stage-config, cluenote, inventory to slot
        this.slot_data[slot_key] = {
          Stage: { key: useGameStore().stage.key },
          lastUpdated: Timestamp.fromDate(new Date())
        }
        await useGameStore().saveSlot('k_detective_beta', '시작', slot_key)
      } else if (mode === 'load') {
        // rollback to slot-data
        await useGameStore().loadSlot('k_detective_beta', '시작', slot_key)
        
        // reload page
        this.emitter.emit('reload')
      }
    }
  }
}
</script>
<style scoped>
.slot {
  position: relative;
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

.hover {
  display: none;
}

.slot:hover .hover {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  opacity: 0.8;
}

.hover .wrapper {
  padding: 20px;
  justify-self: stretch;
  justify-content: space-around;
  justify-items: center;
  align-content: center;
  align-items: center;
}

button {
  padding: 10px;
  font-size: 25px;
  background-color: #00ffe5;
}

button:hover {
  background-color: #00c3ff;
  opacity: 1;
}
</style>