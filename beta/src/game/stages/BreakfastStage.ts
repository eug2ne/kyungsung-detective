import Phaser from "phaser"
import { useGameStore } from '../game.js'
import Stage from "./Stage.js"
import Update from './Update'
import Breakfast from '../scenes/Breakfast.js'
import Test1Stage from "./Test1Stage"

const default_config = {
  player_config: { 'sceneKey': 'Breakfast' , 'x': 663, 'y': 472 },
  scenes_config: {
    'Breakfast': {
      npc: { 'breakfast_maid': { dialogueKey: 'default-question', options: 'option-default' } },
      item: { 'breakfast_item0': { interactionKey: 'read', options: null }, 'breakfast_item1': { interactionKey: 'eat', options: 'option-default' } }
    }
  }
}

const event_config = {
  'breakfast-event-item0': [
    new Update({ id: 'breakfast_item0', data: 'item0-read' }, () => {
      // update scenes_config after reading newspaper
      if (useGameStore().stage.scenes_config['Breakfast'].npc['breakfast_maid'].options === 'option-no-plan') {
        // if player eat breakfast before reading newspaper, update to option-clear
        useGameStore().$patch({
          stage: { scenes_config: { 'Breakfast': { 'npc': { 'breakfast_maid': { dialogueKey: 'default-question', options: 'option-clear' } } } } }
        })
      } // else, pass (maintain option-default)

      return false
    })
  ],
  'breakfast-event-item1': [
    new Update({ id: 'breakfast_item1', data: 'item1-eat' }, (stage: any) => {
      // update scenes_config after eating breakfast
      if (!stage.event_config['breakfast-event-item0']) {
        // if player read newspaper before eating breakfast, update to option-clear
        useGameStore().$patch({
          stage: { scenes_config: { 'Breakfast': { 'npc': { 'breakfast_maid': { dialogueKey: 'default-question', options: 'option-clear' } } } } }
        }) 
      } else {
        // else, update to option-no-plan
        useGameStore().$patch({
          stage: { scenes_config: { 'Breakfast': { 'npc': { 'breakfast_maid': { dialogueKey: 'default-question', options: 'option-no-plan' } } } } }
        })
      }

      return false
    })
  ],
  'breakfast-event-npc0': [
    new Update({ id: 'breakfast_maid', data: 'option-clear'}, () => {
      // after talking to maid when option-clear >> stage clear
      return true
    })
  ]
}

export default class BreakfastStage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Breakfast() ], default_config, event_config, null, 'BreakfastStage', new Test1Stage(manager))
  }
}