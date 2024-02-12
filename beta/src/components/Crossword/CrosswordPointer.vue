<template>
  <div class="pointer"
    @keydown.up="pointerUp" @keydown.left="pointerUp" @keydown.down="pointerDown" @keydown.right="pointerDown"
    :style="{
      top: `${this.coord.y*65+60}px`,
      left: `${this.coord.x*65-87}px`,
    }">
    <img :src="this.pointer_image" alt="pointer">
    <div class="arrow" v-for="(value, dir) in this.direction" :key="dir.id"
      :class="{
        top: dir === 'top',
        bottom: dir === 'bottom',
        left: dir === 'left',
        right: dir === 'right'
      }"
    >
      <img v-if="value" :src="this.arrow_image" alt="arrow">
    </div>
    <div v-if="show_blob" class="blob">
      <span class="x-button minimized" @click="show_blob = false">x</span>
      <p v-if="!event_history.pointer_move" class="description">
        방향키로 움직여 <br> 보세요.
      </p>
      <p v-else-if="!event_history.letter_input" class="description">
        글자 모음에서 <br> 글자를 클릭하세요.
      </p>
      <p v-else class="description">
        SPACE로 단어를 <br> 지울 수 있습니다.
      </p>
      <img :src="this.pointer_blob">
    </div>
  </div>
</template>

<script>
import pointer_image from '@/assets/pointer-square.svg'
import arrow_image from '@/assets/pointer-arrow.svg'
import blob_image from '@/assets/pointer-blob.svg'

export default {
  name: 'CrosswordPointer',
  emits: [ 'inputLetter' ],
  props: [ 'config' ],
  emits: [ 'spaceDown', 'inputLetter' ],
  data() {
    return {
      pointer_image: pointer_image,
      arrow_image: arrow_image,
      pointer_blob: blob_image,
      coord: {
        x: 0,
        y: 0
      },
      direction: {
        top: true,
        bottom: true,
        left: true,
        right: true
      },
      event_history: {
        pointer_move: false,
        letter_input: false,
        letter_delete: false
      },
      show_blob: true
    }
  },
  created() {
    // set default coord data
    this.coord.x = this.config.center.x
    this.coord.y = this.config.center.y
    // set direction
    this.direction.left = this.coord.x-(this.config.center.x-this.config.width.left) > 0
    this.direction.right = (this.config.center.x+this.config.width.right)-this.coord.x > 0
    this.direction.top = this.coord.y-(this.config.center.y-this.config.height.top) > 0
    this.direction.bottom = (this.config.center.y+this.config.height.bottom)-this.coord.y > 0

    // add key-press event listener
    window.addEventListener('keydown', this.handleKeyPress)
  },
  mounted() {
    // input letter
    this.emitter.on('input-letter', (letter) => {
      // record event history
      this.event_history.letter_input = true
      if (!this.event_history.letter_delete) {
        // show blob
        this.show_blob = true
        this.event_history.letter_delete = true
      }
      // emit input letter event
      this.$emit('inputLetter', this.coord, letter)
    })
  },
  unmounted() {
    // remove key-press event listener
    window.addEventListener('keydown', this.handleKeyPress)
  },
  methods: {
    handleKeyPress(e) {
      // only handle arrow-key inputs
      if (!(e.keyCode === 32||37 <= e.keyCode <= 40)) return

      // prevent default event
      e.preventDefault()

      if (e.keyCode === 32 /* space key */) {
        // record event history
        this.event_history.delete_letter = true
        // emit space down event
        this.$emit('spaceDown', this.coord.x+1, this.coord.y+1)
      } else {
       // move pointer
       this.event_history.pointer_move = true // record event history
       if (this.direction.top&&e.keyCode === 38) {
          // move pointer up
          this.coord.y -= 1
        } else if (this.direction.bottom&&e.keyCode === 40) {
          // move pointer down
          this.coord.y += 1
        } else if (this.direction.left&&e.keyCode === 37) {
          // move pointer left
          this.coord.x -= 1
        } else if (this.direction.right&&e.keyCode === 39) {
          // move pointer right
          this.coord.x += 1
        }

        // set direction
        if (this.coord.x === this.config.center.x&&this.coord.y === this.config.center.y) {
          // pointer on center
          this.direction.left = this.coord.x-(this.config.center.x-this.config.width.left) > 0
          this.direction.right = (this.config.center.x+this.config.width.right)-this.coord.x > 0
          this.direction.top = this.coord.y-(this.config.center.y-this.config.height.top) > 0
          this.direction.bottom = (this.config.center.y+this.config.height.bottom)-this.coord.y > 0
        } else if (this.coord.y != this.config.center.y) {
          // pointer on vertical crossword
          // disable left, right
          this.direction.left = false
          this.direction.right = false
          this.direction.top = this.coord.y-(this.config.center.y-this.config.height.top) > 0
          this.direction.bottom = (this.config.center.y+this.config.height.bottom)-this.coord.y > 0
        } else {
          // pointer on horizontal crossword
          // disable top, bottom
          this.direction.top = false
          this.direction.bottom = false
          this.direction.left = this.coord.x-(this.config.center.x-this.config.width.left) > 0
          this.direction.right = (this.config.center.x+this.config.width.right)-this.coord.x > 0
        }
      }
    }
  }
}
</script>

<style>
.pointer {
  position: absolute;
  width: 170px;
  height: 170px;
  margin-top: -10px;
  margin-left: 37px;
  transform-origin: center;
  z-index: 20;
  pointer-events: none;
}

.arrow {
  position: inherit;
  width: 50px;
  height: 50px;
}

.arrow.top {
  top: 0;
  left: 60px;
}

.arrow.bottom {
  bottom: 0;
  left: 60px;
  transform: rotate(180deg);
}

.arrow.left {
  top: 60px;
  left: 0;
  transform: rotate(-90deg);
}

.arrow.right {
  top: 60px;
  right: 0;
  transform: rotate(90deg);
}

.blob {
  position: inherit;
  top: -30px;
  left: 115px;
  width: 200px;
  height: 70px;
}

.blob .description {
  position: absolute;
  left: -5px;
  top: -30px;
  z-index: 10;
}

.blob img {
  position: absolute;
  left: -20px;
  transform: scale(3.5);
}

.x-button.minimized {
  position: absolute;
  top: -30px;
  right: 10px;
  margin: 0;
  padding: 0;
  font-size: 25px;
  text-shadow: 1px 1px #a3a3a3;
  line-height: 100%;
  cursor: pointer;
  pointer-events: auto;
  z-index: 15;
}
</style>