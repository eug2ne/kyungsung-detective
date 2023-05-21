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
    this.emitter.on('quizAccomplish', (route) => {
      const load = async () => {
        // get current user
        const user = auth.currentUser
        // import user-config from db
        const UsersRef = collection(db, 'BetaUsers')
        const user_Ref = doc(UsersRef, user.uid)

        this.subclue = await getDoc(user_Ref)
          .then((res) => {
            return res.get(`Clues.${route}`).at(-1)
          })

        console.log(this.subclue)
      }

      load()
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