type GameUpdateFunction = <Stage extends any>(stage?: Stage) => { clear: boolean, message?: string }

export default class Update {
  public readonly condition: any // NPC/Item state | quiz_id
  public update: GameUpdateFunction // update scene-config | add data to cluenote >> return stage-clear (boolean)
  
  constructor(condition: any, update: GameUpdateFunction) {
    this.condition = condition
    this.update = update
  }
}