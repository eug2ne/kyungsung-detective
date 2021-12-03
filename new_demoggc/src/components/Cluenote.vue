<template>
  <Navbar>
    <li><router-link :to="{ name: 'Map' }">맵</router-link></li>
    <li><router-link :to="{ name: 'Inventory' }">인벤토리</router-link></li>
  </Navbar>
  <div>
    <div @click="slideIn()">사건 목록(클릭)</div>
    <div id="caselist" :style="slideStyle">
      <div class="xButton" @click="slideOut()">✖</div>
      <div>사건1</div>
      <div>사건2</div>
    </div>

    <table>
      <colgroup>
        <col width="250px" />
        <col width="125px" />
        <col width="125px" />
        <col width="250px" />
        <col width="125px" />
        <col width="125px" />
        <col width="250px" />
      </colgroup>
      <tr>
        <td class="clue" v-if="clues[0].access === 1">{{ clues[0].name }}</td>
        <td class="lockedClue" v-else>단서를 잠금 해제하세요</td>
        <td class="cellStyle1"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td class="cellStyle3"></td>
        <td class="cellStyle4"></td>

        <td class="clue" v-if="clues[2].access === 1">
          {{ clues[2].name }}
        </td>
        <td class="lockedClue" v-else>단서를 잠금 해제하세요</td>
        <td class="cellStyle1"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="clue" v-if="clues[1].access === 1">{{ clues[1].name }}</td>
        <td class="lockedClue" v-else>단서를 잠금 해제하세요</td>
        <td class="cellStyle2"></td>
        <td></td>
        <td></td>
        <td class="cellStyle3"></td>
        <td class="cellStyle4"></td>
        <td class="clue" v-if="clues[4].access === 1">{{ clues[4].name }}</td>
        <td class="lockedClue" v-else>단서를 잠금 해제하세요</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="cellStyle3"></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="clue" v-if="clues[3].access === 1">{{ clues[3].name }}</td>
        <td class="lockedClue" v-else>단서를 잠금 해제하세요</td>
        <td class="cellStyle4"></td>
        <td class="cellStyle4"></td>
        <td class="cellStyle4"></td>
        <td class="cellStyle2"></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: { Navbar },
  data() {
    return {
      clues: [
        { access: 1, name: "clue1" },
        { access: 1, name: "clue2" },
        { access: 0, name: "clue3" },
        { access: 0, name: "clue4" },
        { access: 0, name: "clue5" },
      ],
      slideStyle: [],
    };
  },
  created() {
    this.clue3Mtd();
    this.clue5Mtd();
  },
  methods: {
    clue3Mtd() {
      if (this.clues[0].access === 1 && this.clues[1].access === 1)
        this.clues[2].access = 1;
    },
    clue5Mtd() {
      if (this.clues[2].access === 1 && this.clues[3].access === 1)
        this.clues[4].access = 1;
    },
    slideIn() {
      this.slideStyle.pop();
      this.slideStyle.push({ left: "0%", transition: "3s" });
    },
    slideOut() {
      this.slideStyle.pop();
      this.slideStyle.push({ left: "-100%", transition: "3s" });
    },
  },
};
</script>

<style scoped>
#caselist {
  width: 300px;
  height: 100%;
  left: 0px;
  top: 50px;
  background: lightgoldenrodyellow;
  border: 2px solid black;
  position: absolute;
  left: -100%;
}

.slideStyle {
  transition: 3s ease-out;
}

div .xButton {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0px;
  text-align: center;
}

table {
  margin: 20px;
}

td {
  height: 130px;
  border: 0;
  outline: 0;
  text-align: center;
}

.clue {
  background-color: #b0eeff;
  border: 3px solid black;
}

.lockedClue {
  background-color: gray;
  border: 3px solid black;
}

.cellStyle1 {
  background-image: linear-gradient(black, black), linear-gradient(black, black);
  background-size: 100% 3px, 3px 50%;
  background-repeat: no-repeat;
  background-position: 50%, right bottom;
}

.cellStyle2 {
  background-image: linear-gradient(black, black), linear-gradient(black, black);
  background-size: 100% 3px, 3px 50%;
  background-repeat: no-repeat;
  background-position: 50%, right top;
}

.cellStyle3 {
  background-image: linear-gradient(black, black);
  background-size: 3px 100%;
  background-repeat: no-repeat;
  background-position: right;
}

.cellStyle4 {
  background-image: linear-gradient(black, black);
  background-size: 100% 3px;
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>