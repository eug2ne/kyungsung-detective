<template>
  <div class="accsModal" v-if="this.subclue.title ? true:false">
    <img v-if="this.subclue.backgroung_img" src="" alt="" srcset="">
    <h3>{{ this.subclue.title }}</h3>
    <p>{{ this.subclue.description }}</p>
  </div>
</template>
<script>
import _ from 'lodash'
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore'

export default {
  name: 'AccsModal',
  data() {
    return {
      subclue: {}
    }
  },
  mounted() {
    this.emitter.on('quizAccomplish', (data) => {
      const load = async () => {
      // get current user
      const user = auth.currentUser
      // import user-config from db
      const UsersRef = collection(db, 'Users')
      const user_Ref = doc(UsersRef, user.uid)
      const user_Snap = await getDoc(user_Ref)

      const [ story, index ] = data.story.split('-')
      this.subclue = user_Snap.data().Clues[story][index].subClues.find((ele) => {
        return ele.quiz_id == data.id
      })
    }

    load()

    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit('toGame', data.id)
      }, 10000 ) // show quiz-accomplish event on Quiz
    })
    })
  }
}
</script>
<style scoped>
.accs-modal {
  position: fixed;
  top: 250px;
  right: 420px;
  z-index: 2000;
  width: 300px;
  height: 150px;
  background-color: #fff1ea;
  border-radius: 10px;
  box-shadow: 0 0 0 3px rgba(221, 96, 96, 0.8), 5px 5px 0 5px #c9a7a7,
    0 0 0 10px #e1cfcf;
  text-align: center;
  text-shadow: 4px 4px #e73939ae;
  font-size: 30px;
}

.accs-modal h2 {
  margin-top: 50px;
}
</style>