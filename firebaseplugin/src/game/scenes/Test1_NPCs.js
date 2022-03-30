export default [
  {
    "name": "test npc1",
    "id": "test1-0",
    "sprite_func": null,
    "dialogue": {
      "once": null,
      "repeat": [
        {
          "image": "npc1_neutral",
          "line": "this line is repeated"
        },
        {
          "image": "npc1_neutral",
          "line": "it can be skipped by enter/space"
        },
        {
          "image": "npc1_neutral",
          "line": "try it yourself!"
        }
      ]
    },
    "spritesheet": "npc1_sprite",
    "hint": null,
    "x": 500,
    "y": 1000
  },
  {
    "name": "test npc2",
    "id": "test1-1",
    "sprite_func": null,
    "dialogue": {
      "once": [
        {
          "image": "npc1_neutral",
          "lines": ["this line is said only once", "you get a hint when completed"]
        }
      ],
      "repeat": [
        {
          "image": "npc1_neutral",
          "lines": ["you already got the hint"]
        }
      ]
    },
    "spritesheet": "npc1_sprite",
    "hint": {
      "title": "sample hint",
      "description": "sample description",
      "quiz_link": null,
      "background_img": null
    },
    "x": 600,
    "y": 1100
  }
]