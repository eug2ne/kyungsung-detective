<template>
  <div class="popup" id="accsModal" v-if="this.subclue.title ? true:false">
    <div class="image-box">
      <img v-if="this.subclue.backgroung_img" src="" alt="" srcset="">
    </div>
    <div class="text-box">
      <h3>{{ this.subclue.title }}</h3>
      <p>{{ this.subclue.description }}</p>
    </div>
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
#accsModal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 300px;
  z-index: 1050;
  top: 100px;
  text-align: left;
  text-shadow: 0 0 0 #ffff;
  background-color: rgb(106, 230, 255);
  padding: 25px;
}

#accsModal .image-box {
  width: 425px;
  height: 250px;
  margin-left: 5px;
}

#accsModal .text-box {
  width: 425px;
  min-height: 200px;
  height: fit-content;
  display: flex;
  margin-right: 5px;
  padding: 5px;
  border-radius: 5px;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
}

h3 {
  font-size: 30px;
  margin: 10px;
}

p {
  display: inline;
  font-size: 20px;
  margin: 10px;
  padding: 5px;
  box-shadow: -5px 0 0 rgba(0, 0, 0, 0.3);
}
</style>