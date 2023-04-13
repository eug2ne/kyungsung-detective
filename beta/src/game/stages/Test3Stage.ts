import Phaser from "phaser"
import _ from "lodash"
import { useGameStore } from '../game.js'
import Update from "./Update"
import Stage from "./Stage.js"
import Village from "../scenes/Village_Scene.js"

const default_config = {
  player_config: { 'sceneKey': 'Village' , 'x': 570, 'y': 130 },
  scenes_config: {
    'Village': {
      npc: {},
      item: {}
    }
  }
}

const qevent_config = {}

const event_config = {}

export default class Test3Stage extends Stage {
  constructor(manager: Phaser.Plugins.PluginManager) {
    super(manager, [ new Village() ], default_config, event_config, qevent_config, 'Test3Stage', null)
  }
}