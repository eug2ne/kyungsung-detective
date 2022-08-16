import Phaser from "phaser"
import Stage from "./Stage"
import Breakfast from '../scenes/Breakfast.js'

const default_config = {
  'p_scene': { 'sceneKey': 'Breakfast' , 'x': 663, 'y': 472 },
  'scenes': {
    'Breakfast': {
      'npc': { 'breakfast_maid': 'pre_c_repeat' },
      'item': [ 'breakfast_item0', 'breakfast_item1' ]
    }
  }
}

export default class BreakfastStage extends Stage {
  constructor() {
    super([ Breakfast ], default_config, 'BreakfastStage')
  }
  
  clear(): void {
    if (this.scenes_config.npc['breakfast_maid'] == 'answer') {
      // stage clear
      Breakfast.events.on('end-talking', () => {
        // after talking to breakfast_maid
        console.log('stage clear!')
      })
    }
  }

  event(): void {
    // update player_config after eating breakfast
    Breakfast.events.on('to-update.breakfast_maid.post_c_repeat', () => {
      this.player_config.scenes['Breakfast'].npc['breakfast_maid'] = 'post_c_repeat'
    })

    // update player_config after reading newspaper
    Breakfast.events.on('to-update.breakfast_maid.answer.==post_c_repeat', () => {
      if (this.player_config.scenes['Breakfast'].npc['breakfast_maid'] == 'post_c_repeat') {
        this.player_config.scenes['Breakfast'].npc['breakfast_maid'] = 'answer'
      } else {
        // pass
      }
    })
  }
}