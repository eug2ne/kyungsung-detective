import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('Inventory', {
  state: () => ({ inventory: [], carry_item: [] }),
  actions: {
    toggleItem(item) {
      if (this.carry_item.length == 0) {
        this.carry_item.push(item)
      } else {
        // if passed-item already exist in carry_item, delete item in carry_item
        // else, replace item in carry_item with passed-item
        (this.carry_item[0].id == item.id) ? this.carry_item.splice(0,1)
          : this.carry_item.splice(0,1,item)
      }
    }
  },
  persist: { storage: sessionStorage }
})