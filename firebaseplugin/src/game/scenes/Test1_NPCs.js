import npc1_sprite from '../assets/npc_sprite/npc1_sprite.png'
import npc1_neutral from '../assets/npc_log/npc1_neutral.png'

export default [
  {
    "name": "test npc1",
    "id": "test1-0",
    "type": "static",
    "lines": {
      "once": null,
      "repeat": [
        "this line is repeated",
        "it can be skipped by enter/space key"
      ]
    },
    "scenetexture": npc1_sprite,
    "logtexture": npc1_neutral,
    "hint": null,
    "x": 500,
    "y": 1000
  },
  {
    "name": "test npc2",
    "id": "test1-1",
    "type": "static",
    "lines": {
      "once": [
        "this line is said only once",
        "you get a hint from this one"
      ],
      "repeat": [
        "this line is repeated",
        "it can be skipped by enter/space key"
      ]
    },
    "scenetexture": npc1_sprite,
    "logtexture": npc1_neutral,
    "hint": {
      "title": "sample hint",
      "description": "sample description",
      "quiz_link": null
    },
    "x": 600,
    "y": 1100
  }
]