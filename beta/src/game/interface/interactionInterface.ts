import Phaser from "phaser"
import Item from '../GameObjects/Item'
import NPC from "../GameObjects/NPC"
import dialogueInterface from "./dialogueInterface"

type PluginInterface = {
  game: Phaser.Game
}

type InteractionConfig = {
  default: {
    dialogue: [
      string|{ line: string, image?: string, name?: string }
    ],
    interaction_options: [ string ]
  }
  dialogue_config: any,
  options_config: [ { answer: string|null, to: string|null } ]
}

interface GameObjectInterface extends PluginInterface {
  game: Phaser.Game
  gameObject: Item|NPC
}

export default class interactionInterface implements GameObjectInterface {
  game: Phaser.Game
  gameObject: Item | NPC
  dialogue: dialogueInterface
  config: InteractionConfig

  constructor(Game: Phaser.Game, GameObject: Item|NPC, DialogueInterface: dialogueInterface, config: InteractionConfig) {
    this.game = Game
    this.gameObject = GameObject
    this.dialogue = DialogueInterface
    this.config = config
  }

  createInteraction(key: string) {
    // create dialogue for choosing interaction-option
  }
}