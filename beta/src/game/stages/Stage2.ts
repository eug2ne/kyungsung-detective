import Phaser from "phaser"
import _ from 'lodash'
import cluenoteInterface from '../interface/cluenoteInterface'
import { useGameStore } from '../game.js'
import { extend } from "lodash"

type player_config = {
  sceneKey: string, x: number, y: number
}

type scenes_config = {
  [key: string]: {
    npc: {
      [key: string]: { dialogueKey: string, options?: [ string ] }
    },
    item: {
      [key: string]: { interactionKey: string, options?: [ string ] }
    }
  }
}

type StageType = {
  key: string,
  cluenote: cluenoteInterface,
  default_config: {
    player_config: player_config,
    scenes_config: scenes_config
  },
  player_config: player_config,
  scenes_config: scenes_config,
  scenes: [ Phaser.Scene ],
  next?: Stage
}

interface StageInterface extends StageType {
  key: string,
  cluenote: cluenoteInterface,
  default_config: {
    player_config: player_config,
    scenes_config: scenes_config
  },
  player_config: player_config,
  scenes_config: scenes_config,
  scenes: [ Phaser.Scene ],
  next?: Stage
}

export default class Stage extends Phaser.Plugins.BasePlugin implements StageInterface {
  key: string
  cluenote: cluenoteInterface
  default_config: {
    player_config: player_config,
    scenes_config: scenes_config
  }
  player_config: player_config
  scenes_config: scenes_config
  scenes: [ Phaser.Scene ]
  p_index?: number
  next?: Stage

  constructor(
    key: string,
    manager: Phaser.Plugins.PluginManager,
    default_config: {
      player_config: player_config,
      scenes_config: scenes_config
    },
    p_index?: number,
    next?: Stage) {
      super(manager)
      this.key = key
      this.default_config = default_config,
      this.p_index = p_index
      this.next = next
  }
}