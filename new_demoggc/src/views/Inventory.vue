<template>
  <div id="owned-item" class="pixel-borders--2">
    <h4>소지하고 있는 아이템</h4>
    <div v-if="owned.length > 0">
      <div v-for="ownedId in owned" :key="ownedId.id" id="owned-itemlist">
        <img
          :src="require(`@/assets/item/${ownedId.texture}`)"
          alt="loading"
          class="item"
        />
      </div>
    </div>
    <div v-else>
      <p>아직 소지하고 있는 아이템이 없습니다.</p>
    </div>
  </div>

  <div id="inventory">
    <component
      @addItem="toggleOwned"
      v-for="item in itemlist"
      :key="item.id"
      :item="item"
      :is="'Item'"
    />
    <component
      v-for="n in 6 - Object.keys(itemlist).length"
      :key="n.id"
      :is="'None'"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from '../firestoreDB'
import { collection, doc, getDoc } from 'firebase/firestore'
import Item from '../components/inventory/Item.vue'
import None from '../components/inventory/None.vue'

export default {
  data() {
    return {
      owned: ref([])
    }
  },
  components: { Item, None },
  setup() {
    const itemlist = ref([])
    
    const user = auth.currentUser

    // get itemlist from db
    const load = async () => {
      const UsersRef = collection(db, 'Users')
      const user_Ref = doc(UsersRef, user.uid)
      const user_Snap = await getDoc(user_Ref)

      itemlist.value = user_Snap.data().inventory
      console.log(itemlist.value)
    }

    load()
    
    return {
      itemlist
    }
  },
  methods: {
    toggleOwned(item) {
      var index = this.owned.indexOf(item);
      if (item in this.owned) {
        // delete item in owned
        array.splice(index, 1)
        item.owned = false
      } else {
        // delete item in owned
        this.owned[0].owned = false
        this.owned.splice(0, 1)

        // add new item to owned
        array.push(item)
        item.owned = true
      }
    },
  }
}
</script>

<style>
#owned-item {
  width: 865px;
  height: 210px;
  padding: 30px 40px;
  margin: 0 35px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0 0 10px #4d9bb9 inset, 0 0 0 210px #e9f6fb inset;
  background: white;
  position: relative;
  border-width: 4px;
  border-color: #1c576d;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%231c576d' /></svg>");
}

#owned-item:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-style: solid;
  border-width: 4px;
  border-color: #1c576d;
  border-image-slice: 4;
  border-image-width: 2;
  border-image-outset: 0;
  border-image-source: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M2 2h2v2H2zM4 0h2v2H4zM10 4h2v2h-2zM0 4h2v2H0zM6 0h2v2H6zM8 2h2v2H8zM8 8h2v2H8zM6 10h2v2H6zM0 6h2v2H0zM10 6h2v2h-2zM4 10h2v2H4zM2 8h2v2H2z' fill='%231c576d' /></svg>");
}

#owned-item h4 {
  font-size: 30px;
}

#owned-item div p {
  height: 140px;
  width: 900px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  color: gray;
  font-size: 25px;
}

#owned-itemlist {
  display: inline;
}

#owned-itemlist img {
  width: 90px;
  height: 90px;
  margin: 20px 10px;
  box-shadow: -4px -4px 0 rgba(0, 0, 0, 0.1) inset;
  background: white;
}

#inventory {
  display: flex;
  flex-wrap: wrap;
  padding: 0 42px;
}
</style>
