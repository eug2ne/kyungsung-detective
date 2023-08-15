import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({key: 'GameOver'})
  }

  create() {
    // add game over text in center
    const cameraX = this.cameras.main.centerX, cameraY = this.cameras.main.centerY
    this.add.text(cameraX, cameraY, 'Game Over', 
      {
        fontFamily: 'NeoDunggeunmo',
        fontSize: '40px',
        color: '#000'
      }
    )

    // blur background
    this.cameras.main.backgroundColor = '#4488AA'
  }
}