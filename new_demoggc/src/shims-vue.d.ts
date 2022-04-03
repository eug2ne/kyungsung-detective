/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.js'
declare module '*.png'
declare module 'lodash'
declare module 'phaser'
declare module 'firebase/firestore'
