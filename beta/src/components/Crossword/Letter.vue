<template>
  <div class="letter" :draggable="true" @click.self="clickLetter">
    {{ this.letter }}
  </div>
</template>
<script>
export default {
  name: 'Letter',
  props: [ 'letter' ],
  methods: {
    clickLetter() {
      this.emitter.emit('input-letter', this.letter)
    }
  }
}
</script>
<style>
.letter {
  width: 50px;
  height: 50px;
  margin: 10px;
  font-size: 30px;
  font-family: 'DOSIyagiMedium';
  justify-self: center;
  align-self: center;
  text-align: center;
  line-height: 50px;
  background-color: #ffff;
  border: thick double #ff1e1e;
}
</style>
