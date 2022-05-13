export default [
  {
    "name": "test npc1",
    "id": "test1npc-0",
    "sprite_func": null,
    "dialogue": {
      "pre_h_repeat": [
        {
          "image": "npc1_neutral",
          "line": "this line is repeated"
        },
        {
          "image": "npc1_neutral",
          "line": "it can be skipped by enter/space"
        }
      ]
    },
    "spritesheet": "npc1_sprite",
    "hint": null,
    "answer": null,
    "x": 500,
    "y": 1000
  },
  {
    "name": "test npc2",
    "id": "test1npc-1",
    "sprite_func": null,
    "dialogue": {
      "hint": [
        {
          "image": "npc1_neutral",
          "lines": ["this line is said only once", "you get a hint when completed"]
        }
      ],
      "post_h_repeat": [
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
      "background_img": null,
      "require": null
    },
    answer: null,
    "x": 600,
    "y": 1100
  }
]