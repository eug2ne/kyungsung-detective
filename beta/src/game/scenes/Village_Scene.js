import Phaser from 'phaser'
import { useGameStore } from '../game'
import Item2 from "../GameObjects/Item2"
import NPC from "../GameObjects/NPC"
import vback from '@/game/assets/villagescene/마을최종-2800.png'
// import float-image
import vhouse_float from '@/game/assets/villagescene/마을최종-housefloat.png'
import vlighttree_float from '@/game/assets/villagescene/마을최종-lighttree.png'
import vdarktree_float from '@/game/assets/villagescene/마을최종-darktree.png'
import vtree_float from '@/game/assets/villagescene/마을최종-2800-tree.png'

import house1_body1 from '@/game/assets/villagescene/house1_body1.png'
import house1_body2 from '@/game/assets/villagescene/house1_body2.png'
import house1_body3 from '@/game/assets/villagescene/house1_body3.png'
import house1_body4 from '@/game/assets/villagescene/house1_body4.png'
import house1_body5 from '@/game/assets/villagescene/house1_body5.png'
import house1_body6 from '@/game/assets/villagescene/house1_body6.png'
import house1_body7 from '@/game/assets/villagescene/house1_body7.png'
import house1_body8 from '@/game/assets/villagescene/house1_body8.png'
import house1_body9 from '@/game/assets/villagescene/house1_body9.png'
import house2_body1 from '@/game/assets/villagescene/house2_body1.png'
import house2_body2 from '@/game/assets/villagescene/house2_body2.png'
import house2_body3 from '@/game/assets/villagescene/house2_body3.png'
import house2_body4 from '@/game/assets/villagescene/house2_body4.png'
import house2_body5 from '@/game/assets/villagescene/house2_body5.png'
import house3_body1 from '@/game/assets/villagescene/house3_body1.png'
import house3_body2 from '@/game/assets/villagescene/house3_body2.png'
import house3_body3 from '@/game/assets/villagescene/house3_body3.png'
import house3_body4 from '@/game/assets/villagescene/house3_body4.png'
import house3_body5 from '@/game/assets/villagescene/house3_body5.png'
import house4_body1 from '@/game/assets/villagescene/house4_body1.png'
import house4_body2 from '@/game/assets/villagescene/house4_body2.png'
import house4_body3 from '@/game/assets/villagescene/house4_body3.png'
import house4_body4 from '@/game/assets/villagescene/house4_body4.png'
import house4_body5 from '@/game/assets/villagescene/house4_body5.png'
import house5_body1 from '@/game/assets/villagescene/house5_body1.png'
import house5_body2 from '@/game/assets/villagescene/house5_body2.png'

import vfield from '@/game/assets/villagescene/논밭.png'
import vfield_1_1 from '@/game/assets/villagescene/논밭_1_1.png'
import vfield_1_2 from '@/game/assets/villagescene/논밭_1_2.png'
import vfield_2_1 from '@/game/assets/villagescene/논밭_2_1.png'
import vfield_2_2 from '@/game/assets/villagescene/논밭_2_2.png'
import vfield_2_3 from '@/game/assets/villagescene/논밭_2_3.png'
import vfield_2_4 from '@/game/assets/villagescene/논밭_2_4.png'
import vfield_3_1 from '@/game/assets/villagescene/논밭_3_1.png'
import vfield_3_2 from '@/game/assets/villagescene/논밭_3_2.png'
import vfield_3_3 from '@/game/assets/villagescene/논밭_3_3.png'
import vfield_4_1 from '@/game/assets/villagescene/논밭_4_1.png'
import vfield_4_2 from '@/game/assets/villagescene/논밭_4_2.png'
import vfield_4_3 from '@/game/assets/villagescene/논밭_4_3.png'
import vcutted_tree from '@/game/assets/villagescene/다리자른나무.png'
import vtree from '@/game/assets/villagescene/나무충돌.png'
import vgrass_1 from '@/game/assets/villagescene/풀_1.png'
import vgrass_2 from '@/game/assets/villagescene/풀_2.png'
import vgrass_3 from '@/game/assets/villagescene/풀_3.png'
import vgrass_4 from '@/game/assets/villagescene/풀_4.png'
import vgrass_5 from '@/game/assets/villagescene/풀_5.png'
import vgrass_6 from '@/game/assets/villagescene/풀_6.png'
import vgrass_7 from '@/game/assets/villagescene/풀_7.png'
import vgrass_8 from '@/game/assets/villagescene/풀_8.png'
import vgrass_9 from '@/game/assets/villagescene/풀_9.png'
import vgrass_10 from '@/game/assets/villagescene/풀_10.png'
import vgrass_11 from '@/game/assets/villagescene/풀_11.png'
import vgrass_12 from '@/game/assets/villagescene/풀_12.png'
import mat from '@/game/assets/villagescene/mat.png'

// import npc spritesheet
import missing1mom_sprite from '@/game/assets/npc_sprite/missing1mom_spritesheet.png'
import missing1bro_sprite from '@/game/assets/npc_sprite/missing1bro_spritesheet.png'
import missing1sis_sprite from '@/game/assets/npc_sprite/missing1sis_spritesheet.png'
import missing2mom_sprite from '@/game/assets/npc_sprite/missing2mom_spritesheet.png'
import missing3mom_sprite from '@/game/assets/npc_sprite/missing3mom_spritesheet.png'
import missing3bro_sprite from '@/game/assets/npc_sprite/missing3bro_spritesheet.png'
import missing4mom_sprite from '@/game/assets/npc_sprite/missing4mom_spritesheet.png'
import villager1_sprite from '@/game/assets/npc_sprite/villager1_spritesheet.png'
import villager2_sprite from '@/game/assets/npc_sprite/villager2_spritesheet.png'
import villager3_sprite from '@/game/assets/npc_sprite/villager3_spritesheet.png'
import villager4_sprite from '@/game/assets/npc_sprite/villager4_spritesheet.png'
import police_sprite from '@/game/assets/npc_sprite/police_spritesheet.png'
import inspector_sprite from '@/game/assets/npc_sprite/inspector_spritesheet.png'

// import npc + sami log image
import missing1_angry from '@/game/assets/npc_log/missing1_angry.png'
import missing1_cry from '@/game/assets/npc_log/missing1_cry.png'
import missing1_neutral from '@/game/assets/npc_log/missing1_neutral.png'
import missing1_smile from '@/game/assets/npc_log/missing1_smile.png'
import missing1_surprise from '@/game/assets/npc_log/missing1_surprise.png'
import missing1bro_smile1 from '@/game/assets/npc_log/missing1bro_smile1.png'
import missing1bro_smile2 from '@/game/assets/npc_log/missing1bro_smile2.png'
import missing1bro_surprise from '@/game/assets/npc_log/missing1bro_surprise.png'
import missing1bro_worry from '@/game/assets/npc_log/missing1bro_worry.png'
import missing1mom_angry from '@/game/assets/npc_log/missing1mom_angry.png'
import missing1mom_neutral from '@/game/assets/npc_log/missing1mom_neutral.png'
import missing1mom_worry from '@/game/assets/npc_log/missing1mom_worry.png'
import missing1sis_neutral from '@/game/assets/npc_log/missing1sis_neutral.png'
import missing1sis_surprise from '@/game/assets/npc_log/missing1sis_surprise.png'
import missing1sis_sus from '@/game/assets/npc_log/missing1sis_sus.png'
import missing2_neutral from '@/game/assets/npc_log/missing2_neutral.png'
import missing2_pain from '@/game/assets/npc_log/missing2_pain.png'
import missing2_smile from '@/game/assets/npc_log/missing2_smile.png'
import missing2_surprise from '@/game/assets/npc_log/missing2_surprise.png'
import missing2mom_worry from '@/game/assets/npc_log/missing2mom_worry.png'
import missing3_angry from '@/game/assets/npc_log/missing3_angry.png'
import missing3_neutral from '@/game/assets/npc_log/missing3_neutral.png'
import missing3_smile from '@/game/assets/npc_log/missing3_smile.png'
import missing3_surprise from '@/game/assets/npc_log/missing3_surprise.png'
import missing3_think from '@/game/assets/npc_log/missing3_think.png'
import missing3bro_cry1 from '@/game/assets/npc_log/missing3bro_cry1_100x100.png'
import missing3mom_neutral from '@/game/assets/npc_log/missing3mom_neutral.png'
import missing3mom_sorry from '@/game/assets/npc_log/missing3mom_sorry.png'
import missing3mom_worry from '@/game/assets/npc_log/missing3mom_worry.png'
import missing4_neutral from '@/game/assets/npc_log/missing4_neutral.png'
import missing4_sick from '@/game/assets/npc_log/missing4_sick.png'
import missing4mom_sad from '@/game/assets/npc_log/missing4mom_sad_100x100.png'
import missing4mom_surprise from '@/game/assets/npc_log/missing4mom_surprise_100x100.png'
import missing4mom_worry from '@/game/assets/npc_log/missing4mom_worry_100x100.png'
import villager1_smile from '@/game/assets/npc_log/villager1_smile_100x100.png'
import villager2_smile from '@/game/assets/npc_log/villager2_smile.png'
import villager2_worry from '@/game/assets/npc_log/villager2_worry.png'
import villager3_neutral from '@/game/assets/npc_log/villager3_neutral.png'
import villager4_neutral from '@/game/assets/npc_log/villager4_neutral.png'
import police_neutral from '@/game/assets/npc_log/police_neutral.png'
import inspector_neutral from '@/game/assets/npc_log/inspector_neutral.png'
import sami_neutral from '@/game/assets/sami_log/sami_무표정.png'
import sami_surprise from '@/game/assets/sami_log/sami_화.png'

const npcs_JSON = [
  {
    name: "김정숙 양 어머니",
    id: "test3_missing1mom",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "missing1mom_worry",
              line: "김정숙 양 어머니에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing1mom_worry",
            line: "오늘 학교 끝나고 집에 돌아와서..."
          },
          "(하교 후 13:00 이후)",
          {
            image: "missing1_smile",
            line: "다녀왔습니다~"
          },
          {
            image: "missing1mom_neutral",
            line: "왔니. 오빠한테도 인사해라."
          },
          {
            image: "missing1bro_smile1",
            line: "정숙이 오랜만이네~"
          },
          {
            image: "missing1_surprise",
            line: "어.."
          },
          {
            image: "missing1mom_neutral",
            line: "마침 잘됐다. 너 저번에도 수학 숙제 안 해가서 혼났지. 오빠가 이참에 정숙이 숙제하는 것 좀 봐줘라."
          },
          {
            image: "missing1_angry",
            line: "뭐? 싫어!"
          },
          {
            image: "missing1mom_angry",
            line: "이 녀석이! 또 숙제 안 해가서 선생님한테 혼나고 싶어?"
          },
          {
            image: "missing1_angry",
            line: "오늘은 수학 숙제 없어!"
          },
          {
            image: "missing1mom_neutral",
            line: "그래? 그럼 선자 엄마한테 물어봐도 없다고 하겠네?"
          },
          {
            image: "missing1_surprise",
            line: "윽.."
          },
          {
            image: "missing1mom_angry",
            line: "그럴 줄 알았어! 맨날 모험이랍시고 산이며 들이며 쏘다니니까 숙제를 못 하는 거 아냐?!"
          },
          {
            image: "missing1mom_angry",
            line: "어휴, 선자 반만이라도 닮아봐라. 그렇게 붙어다니는 동안 그런 거 닮을 생각은 하지도 않았어?"
          },
          {
            image: "missing1mom_angry",
            line: "빨리 교과서 가져와서 펴! 앞으로는 숙제 다 하기 전까지는 놀라나가는 거 금지야!"
          },
          {
            image: "missing1_surprise",
            line: "힝.."
          },
          "그렇게 큰애한테 애를 맡기고 저는 일하러 나갔어요. 그게 제가 기억하는 정숙이의 마지막 모습이에요..",
          {
            image: "missing1mom_worry",
            line: "산이라도 들어갔다가 다친 건 아닌지..제발 무사했으면 좋겠어요.."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing1mom", data: "missing1mom-time"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing1mom_neutral",
            line: "우리 딸이 여간 활발한게 아니라, 평소에도 들이나 산에 쏘다니다가 다쳐서 오는 일이 종종 있었거든요."
          },
          {
            image: "missing1mom_worry",
            line: "이번에는 산에 들어갔다가 너무 심하게 다쳐서 못 돌아오고 있는 거 아닐까요..?"
          },
          {
            image: "missing1mom_worry",
            line: "만약 그런거면....아이고, 이를 어째..다쳐가지고 움직이지도 못 하면..곧 어두워질텐데.."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "김정숙 양을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing1mom_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "김정숙 양 오빠",
    id: "test3_missing1bro",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "missing1bro_worry",
              line: "김정숙 양 오빠에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing1bro_worry",
            line: "오늘 대학교 기숙사에 있다가 오랜만에 집에 왔어요."
          },
          {
            image: "missing1bro_worry",
            line: "오전 중에 도착해서 짐을 다 풀고 점심 먹고나니까 막내가 학교에서 돌아왔고, 마침 어머니가 공부를 좀 봐달라고 해서 그 뒤로 막내 공부를 봐줬어요."
          },
          "(15:00 가량)",
          {
            image: "missing1bro_smile1",
            line: "자, 이제 차근차근 혼자서 풀어봐."
          },
          {
            image: "missing1_angry",
            line: "몰라, 하나도 모르겠는데 어떻게 풀어."
          },
          {
            image: "missing1bro_smile1",
            line: "아니야. 정숙이도 차근차근 하다보면 혼자서 풀 수 있어. 잘 봐, 여기 있는 x를 하나씩 왼쪽으로 옮겨.."
          },
          {
            image: "missing1_angry",
            line: "몰라, 몰라! 오빠나 알지 그런 거 내가 어떻게 알아! 아까부터 자꾸 모르겠다고 말하는데 뭘 자꾸 알겠다는 거야!"
          },
          {
            image: "missing1_cry",
            line: "그렇게 잘 알면 오빠나 이런 거 많이 해! 흐아아아앙!"
          },
          {
            image: "missing1_cry",
            line: "오빠 미워! 오빠 때문에 나는 친구들 보러 가지도 못 하고. 오빠 때문에 내가 친구들이랑 약속 못 지키면 좋겠어?!"
          },
          {
            image: "missing1_cry",
            line: "흐아아아아아아앙!!"
          },
          {
            image: "missing1bro_surprise",
            line: "어.."
          },
          {
            image: "missing1bro_smile2",
            line: "그래, 공부도 하기 싫은데 너무 억지로 하면 안되지. 오늘은 이만 쉬고 내일 다시 이어서 공부하자."
          },
          "어찌나 서럽게 울던지..막내가 그렇게 우는 건 처음 봤어요.."
        ],
        event: {eventKey: "test3-event-promise", eventData: {id: "test3_missing1bro", data: "missing1bro-time"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing1bro_smile1",
            line: "음..제 생각에는 친구들이랑 놀다가 길을 잃은게 아닐까 싶어요. 어릴 때부터 이 동네를 휘어잡던 골목대장이라."
          },
          {
            image: "missing1bro_worry",
            line: "그래도 저녁시간 넘어서까지 늦은 적은 없는데.."
          },
          {
            image: "missing1bro_smile2",
            line: "혹시 아까 억지로 공부를 시킨게 서러워서 집에 들어오고 싶어하지 않은 걸 수도.."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "김정숙 양을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing1bro_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,5": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "김정숙 양 언니",
    id: "test3_missing1sis",
    dialogue: {
      "post_c_repeat": {
        dialogue: [
          {
            question: {
              image: "missing1sis_neutral",
              line: "김정숙 양 언니에게 질문을 해보자."
            }
          }
        ]
      },
      "answer": {
        dialogue: [
          {
            image: "missing1sis_neutral",
            line: "'전등이랑 기름, 양초, 밧줄'. 맨 아래는 화살표하고 뭐지? '절대..잊지 말어..?'"
          },
          {
            image: "missing1sis_surprise",
            line: "아..!"
          },
          {
            image: "missing1sis_surprise",
            line: "그러고보니 정숙이가 부엌에서 뒤지던 찬장이 양초를 보관하던 찬장이었어요!"
          },
          {
            image: "missing1sis_neutral",
            line: "그치만..양초로 뭘 하려던 거지? 이 물건들은 다 뭐고.."
          }
        ],
        check: "k_detective_beta.test3_note",
        event: {eventKey: "test3-event-promise", eventData: {id: "test3_missing1sis", data: "missing1sis-answer"}}
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing1sis_neutral",
            line: "제가 김정숙을 본 건 오후 3시 15분쯤이었어요. 밭을 메고 잠깐 물 마시러 부엌에 들어왔는데.."
          },
          "(15:15 가량)",
          {
            image: "missing1sis_neutral",
            line: "너 거기서 뭐해?"
          },
          {
            image: "missing1_surprise",
            line: "어?"
          },
          {
            image: "missing1sis_sus",
            line: "거긴 왜 뒤지는거야?"
          },
          {
            image: "missing1sis_sus",
            line: "너, 솔직하게 말해. 이번에 또 무슨 말썽을 피우려고?"
          },
          {
            image: "missing1_surprise",
            line: "아, 아무것도 아니야!"
          },
          "부엌 찬장을 뒤지고 있는 걸 걸렸더니 그대로 도망갔어요.",
          {
            image: "missing1sis_sus",
            line: "오빠한테 들어보니까 무슨 친구랑 약속이 있다고 공부하다 내뺐다고 하던데, 대체 무슨 일을 하려던 건지."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing1sis", data: "missing1sis-time"}}
      },
      "answer-adventure": {
        dialogue: [
          {
            image: "missing1sis_sus",
            line: "그러고보니 일주일 전인가, 장작을 주우러 산을 올랐는데,"
          },
          {
            image: "missing1sis_sus",
            line: "좀 깊은 산 속에 못 보던 동굴이 있는 걸 발견했어요. 신기해서 그 날 저녁을 먹으면서 얘기했더니.."
          },
          {
            image: "missing1sis_surprise",
            line: "정숙이가 엄청 캐물어서 위치를 알려줬어요!"
          },
          {
            image: "missing1sis_surprise",
            line: "정숙이가 탐험을 하러 갔다면 거기 밖에 없어요!"
          }
        ],
        event: {eventKey: "5pSYFHRok3Es4xw6XWcC", eventData: {id: "test3_missing1sis", data: "missing1sis-adventure"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing1sis_sus",
            line: "..솔직히 말씀 드려도 될까요?"
          },
          {
            image: "missing1sis_sus",
            line: "제 동생이지만 김정숙은 다들 알아주는 천둥벌거숭이거든요."
          },
          {
            image: "missing1sis_sus",
            line: "부엌에서 뭘 뒤지고 있던 것도 그렇고 분명히 무슨 꿍꿍이가 있는게 분명해요."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "김정숙 양을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing1sis_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,5": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "박선자 양 어머니",
    id: "test3_missing2mom",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "missing2mom_worry",
              line: "박선자 양 어머니에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing2mom_worry",
            line: "학교 끝나고 같이 논에서 일하고 있었는데.."
          },
          "(하교 후 13:00 이후)",
          {
            image: "missing2_pain",
            line: "아야!"
          },
          {
            image: "missing2mom_surprise1",
            line: "왜 그래! 어디 다쳤어?"
          },
          {
            image: "missing2_pain",
            line: "발바닥을 돌부리에 베인 것 같애. 집에 가서 약 바르고 올게."
          },
          {
            image: "missing2mom_susprise1",
            line: "정말? 어디봐, 심하게 다쳤어?"
          },
          {
            image: "missing2_surprise",
            line: "응? 아냐아냐, 집에 가서 약만 좀 바르면 나을거야."
          },
          {
            image: "missing2mom_worry",
            line: "봐봐, 발바닥이면 많이 아플텐데 엄마가 도와줄게."
          },
          {
            image: "missing2_surprise",
            line: "아냐아냐, 진짜 괜찮아."
          },
          {
            image: "missing2_pain",
            line: "아, 아이고, 배야~ 배가 갑자기 아프네~ 나 변소 좀 가야겠다! 갈게!"
          },
          "그리고 쏜살같이 집으로 달려갔어요.",
          {
            image: "missing2mom_worry",
            line: "논으로 돌아오진 않았지만 알아서 약 바르고 집에서 쉬고 있겠거니, 했는데..어째서 이런 일이..!"
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing2mom", data: "missing2mom-time"}}
      },
      "answer-friendship": {
        dialogue: [
          {
            image: "missing2mom_smile",
            line: "둘이 아주 죽고는 못 사는 사이였죠."
          },
          {
            image: "missing2mom_smile",
            line: "며칠 전에 정숙이가 놀러왔을 때는 서로 '의자매'까지 맺은 모양이에요."
          },
          "(며칠 전)",
          {
            image: "missing1_smile",
            line: "자, 이게 우리 맹세의 증표야. 이제부터 우리는 의자매야! 그러니까 어딜 가든 함께 가고, 서로에게 비밀도 만들지 않는 거야."
          },
          {
            image: "missing1_smile",
            line: "그리고, 서로보다 더 친한 친구도 만들지 않는 거야! 평생 우리끼리 제일 친한 친구인 거야!"
          },
          {
            image: "missing1_smile",
            line: "약속!"
          },
          {
            image: "missing2_smile",
            line: "응, 약속!"
          },
          "애들은 정말 귀엽게 놀지 않아요?"
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing2mom", data: "missing2mom-friendship"}}
      },
      "answer-adventure": {
        dialogue: [
          {
            image: "missing2mom_surprise",
            line: "'탐험'..탐....아!"
          },
          {
            image: "missing2mom_surprise",
            line: "며칠 전에 정숙이가 놀러왔을 때 둘이 의자매를 맺었다고 했었죠."
          },
          {
            image: "missing2mom_worry",
            line: "의자매를 맺게 된 이유가 기억 났어요!"
          },
          "정확히 무슨 내용이 오갔는지는 기억이 안 나지만, 둘이 무슨, 어디를 탐험하러가기 전에 의자매를 맺는다고, 그래서 의자매를 맺었어요!",
          {
            image: "missing1_smile",
            line: "첫 탐험과 앞으로의 무수히 많은 탐험들에서"
          },
          {
            image: "missing2_smile",
            line: "의자매로서 항상 함께할 것을 기원하며!"
          }
        ],
        event: {eventKey: "5pSYFHRok3Es4xw6XWcC", eventData: {id: "test3_missing2mom", data: "missing2mom-adventure"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing2mom_worry",
            line: "전..정말 모르겠어요..부모 속 한 번 썩인 적 없는 애가.."
          },
          {
            image: "missing2mom_worry",
            line: "그렇게 급하게 집으로 간 이유도 모르겠고, 갑자기 어디로 간 건지도 모르겠고."
          },
          {
            image: "missing2mom_surprise1",
            line: "어디서 해코지 당하고 있는 건 아니겠죠..?"
          },
          {
            image: "missing2mom_worry",
            line: "제발 무사하기만 했으면.."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "박선자 양을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-friendship": {
        answer: "박선자 양과 김정숙 양의 친분에 대하여",
        to: "answer-friendship"
      },
      "option-adventure": {
        answer: "'탐험'에 대하여",
        to: "answer-adventure"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing2mom_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,2": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "이정웅 군 엄마",
    id: "test3_missing3mom",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "missing3mom_worry",
              line: "이정웅 군 어머니에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing3mom_neutral",
            line: "정웅이는 항상 학교에서 다녀오면 집에서 동생인 동생을 돌봐요."
          },
          {
            image: "missing3mom_neutral",
            line: "그러다 4시 정도였나.."
          },
          "(16:00 가량)",
          {
            image: "missing3bro_cry1",
            line: "으아앙 엄마..형아가 없어졌어.."
          },
          "집으로 가봤더니 정말로 애가 집을 나갔더라고요.",
          {
            image: "missing3mom_neutral",
            line: "그때까지는 그냥 동생 돌보는게 귀찮아져서 떼어놓고 친구들이랑 놀러간거라고 생각했는데."
          },
          {
            image: "missing3mom_neutral",
            line: "저녁시간이 돼도 애가 돌아오지도 않고, 다른 엄마들도 애가 없어졌다고 해서 그제서야 큰 일이 생겼다는 걸 직감했죠."
          },
          {
            image: "missing3mom_worry",
            line: "다같이 마을 주변을 돌았는데도 애들은 나오지도 않고.."
          },
          {
            image: "missing3mom_worry",
            line: "어떻게 무사하기만이라도 했으면 좋겠어요.."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing3mom", data: "missing3mom-time"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing3mom_worry",
            line: "하아..모르겠네요."
          },
          {
            image: "missing3mom_worry",
            line: "동생도 그렇게 떼어놓고 갈 정도로, 친구들이랑 놀고 싶었나.."
          },
          {
            image: "missing3mom_sorry",
            line: "...."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "이정웅 군을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing3mom_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,5": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "이정웅 군 동생",
    id: "test3_missing1bro",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "missing3bro_worry",
              line: "이정웅 군 동생에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing3bro_cry1",
            line: "훌쩍..형아랑 숨바꼭질 하고 있었는데..형아가..분명히 30초 세면 찾을거라 해놓고.."
          },
          {
            image: "missing3bro_cry2",
            line: "끝까지 나 안 찾았어! 후에에에엥!"
          },
          {
            image: "missing3bro_cry2",
            line: "나 속였어! 사기쳤어! 형아 미워!"
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing3bro", data: "missing3bro-time"}}
      },
      "answer-play": {
        dialogue: [
          {
            image: "sami_neutral",
            line: "형아랑 어떻게 놀았는지 더 자세히 얘기해줄 수 있겠니?"
          },
          {
            image: "missing3bro_cry1",
            line: "흑..형아가.."
          },
          "(13:00에서 16:00 사이 어느 시점)",
          {
            image: "missing3_neutral",
            line: "야, 이제 숨바꼭질 하자."
          },
          {
            image: "missing3bro_neutral",
            line: "엥? 싫어. 난 땅따먹기가 더 재밌단 말야."
          },
          {
            image: "missing3bro_smile",
            line: "형아 나한테 땅따먹기 지고 있어서 일부러 그러는거지?"
          },
          {
            image: "missing3_angry",
            line: "뭐? 이게! 그런 거 아니거든!"
          },
          {
            image: "missing3bro_smile",
            line: "헹 맞으면서."
          },
          {
            image: "missing3_angry",
            line: "아니라니까. 내가 진짜 끝내주는 숨바꼭질을 알아서 그래."
          },
          {
            image: "missing3bro_neutral",
            line: "피, 숨바꼭질이 숨바꼭질이지."
          },
          {
            image: "missing3_neutral",
            line: "아 진짜 아니라니까 그러네. 이건 다른거야. 한 번 해보자니까."
          },
          {
            image: "missing3bro_neutral",
            line: "..알았어."
          },
          "(시간이 흐른 뒤)",
          {
            image: "missing3bro_smile",
            line: "형아 찾았다!"
          },
          {
            image: "missing3_surprise",
            line: "허억! 어떻게 찾은거야."
          },
          {
            image: "missing3bro_neutral",
            line: "근데 이거 그냥 숨바꼭질이랑 뭐가 다른건지 모르겠어. 재미없어."
          },
          {
            image: "missing3_surprise",
            line: "뭐? 재미없긴. 재밌잖아?"
          },
          {
            image: "missing3bro_angry",
            line: "그리고 언제까지 나만 술래야! 나도 숨는 거 하고 싶다고!"
          },
          {
            image: "missing3_surprise",
            line: "그러지말고, 이번.."
          },
          {
            image: "missing3_thinking",
            line: ".... ...."
          },
          {
            image: "missing3_smile",
            line: "이번에는 너가 숨고 싶다고?"
          },
          {
            image: "missing3bro_smile",
            line: "응!"
          },
          {
            image: "missing3_smile",
            line: "알았어. 이번엔 형아가 술래할게. 30까지 센다."
          },
          {
            image: "missing3bro_smile",
            line: "아싸!"
          },
          "그랬는데..",
          {
            image: "missing3bro_cry1",
            line: "아무리 기다려도 형아가 나 안 찾으러와서 나왔는데.."
          },
          {
            image: "missing3bro_cry2",
            line: "형아가 나 놔두고 가버렸어! 찾는대놓고! 후에에에엥"
          },
          {
            image: "sami_disappointment",
            line: "(듣자하니 일부러 떼어놓으려던 것 같군..)"
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_missing3bro", data: "missing3bro-play"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing3bro_cry2",
            line: "허어어엉 형아는 산 속 괴물이 끌고간 거야!"
          },
          {
            image: "missing3bro_cry2",
            line: "나랑 안 놀아줘서 벌 받은거야!"
          },
          {
            image: "missing3bro_cry2",
            line: "끕, 흑, 나랑 놀아주지도 않고 사기치는 형아는 영영 안 돌아왔음 좋겠어. 산 속 괴물한테 먹혀버리기나 했음 좋겠어!"
          },
          {
            image: "missing3mom_angry",
            line: "너 그게 무슨 말버릇이야! 형아가 진짜로 이대로 안 돌아왔음 좋겠어? 평생 집에 안 들어와서 엄마아빠 나가면 혼자 집에 있었음 좋겠어?"
          },
          {
            image: "missing3bro_cry1",
            line: "..읍."
          },
          {
            image: "missing3bro_cry2",
            line: "흐아아아아앙"
          }
        ],
        event: {eventKey: "test3-event-tales", eventData: {id: "test3_missing3bro", data: "missing3bro-suspicion"}}
      }
    },
    opitons_config: {
      "option-time": {
        answer: "이정웅 군을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "optione-play": {
        answer: "이정웅 군과 함께한 놀이에 대하여",
        to: "answer-play"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing3bro_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    check: null,
    x: 0,
    y: 0
  },
  {
    name: "최영길 군 엄마",
    id: "test3_missing4mom",
    dialogue: {
      "post_c_repeat": {
        dialogue: [
          {
            question: {
              image: "missing4mom_worry",
              line: "최영길 군 어머니에게 질문을 해보자."
            }
          }
        ]
      },
      "answer": {
        dialogue: [
          {
            image: "missing4mom_surprise",
            line: "이건, 영길이 신발인데..이걸 어디서 찾으신거죠?"
          },
          {
            image: "sami_neutral",
            line: "안방 창문 아래에 떨어져 있었습니다."
          },
          {
            image: "missing4mom_surprise",
            line: "아..! 역시 누군가 우리 애를 이불째 들고 창문 밖으로 나가면서 떨어진 거에요!"
          },
          {
            image: "missing4mom_angry1",
            line: "대체..누가..!"
          }
        ],
        check: "k_detective_beta.test3_shoe",
        event: {eventKey: "z2Aj8sLVTc5FLNxZQ0Rg", eventData: {id: "test3_missing4mom", data: "missing4mom-answer"}}
      },
      "answer-time": {
        dialogue: [
          {
            image: "missing4mom_sad",
            line: "영길이는 어렸을 때부터 또래들보다 작고 몸도 약했어요. 그래서 잔병치레도 잦았죠. 오늘도 학교에서 돌아오자마자.."
          },
          "(하교 후 13:00 이후)",
          {
            image: "missing4_neutral",
            line: "..감기 걸린 것 같아요. 방에서 쉬고 있을게요."
          },
          {
            image: "missing4mom_worry",
            line: "저런, 열은 없니?"
          },
          {
            image: "missing4_sick",
            line: "콜록콜록. 모르겠어요..으..어지러워.."
          },
          {
            image: "missing4mom_worry",
            line: "그래 얼른 들어가 쉬어라."
          },
          "그대로 방에 들어가서 눕는 것까지 확인하고 일하러 나왔는데,",
          {
            image: "missing4mom_sad",
            line: "집에 돌아와보니..애가..!"
          },
          {
            image: "missing4mom_surprise",
            line: "심지어 영길이가 어릴 때부터 덮고자던 아끼는 담요가 있거든요. 그걸 덮고 자는 것도 봤는데. 그 담요도 같이 사라졌어요! 누군가 자고있던 우리 애를 이불째 들고 날른게 틀림없어요!"
          }
        ],
        event: {eventKey: "z2Aj8sLVTc5FLNxZQ0Rg", eventData: {id: "test3_missing4mom", data: "missing4mom-time"}}
      },
      "answer-fake": {
        dialogue: [
          {
            image: "missing4mom_angry1",
            line: "뭐라고요?! 지금 애가 없어졌는데 진지하게 조사하진 못 할 망정 장난같은 소리나 할 때에요?"
          },
          {
            image: "missing4mom_angry2",
            line: "당신 같은 것도 탐정이라니!"
          }
        ],
        event: {eventKey: "z2Aj8sLVTc5FLNxZQ0Rg", eventData: {id: "test3_missing4mom", data: "missing4mom-fake"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "missing4mom_surprise",
            line: "맞아! 요즘 근처 동네에서 인신매매단이 활개친다는 소문을 들었어요!"
          },
          {
            image: "missing4mom_surprise",
            line: "애들을 납치하다가 공장 같은데다 싼값에 넘긴다고요!"
          }
        ],
        event: {eventKey: "test3-event-kidnap", eventData: {id: "test3_missing4mom", data: "missing4mom-suspicion"}}
      }
    },
    opitons_config: {
      "option-time": {
        answer: "최영길 군을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-fake": {
        answer: "꾀병에 대하여",
        to: "answer-fake"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "missing4mom_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    x: 0,
    y: 0
  },
  {
    name: "마을 주민",
    id: "test3_villager12",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: undefined,
              line: "마을 주민들에게 질문을 해보자."
            }
          }
        ],
      },
      "answer-time": {
        dialogue: [
          {
            image: "villager1_worry",
            line: "논에서 일하다 애들이 하교할 때 봤죠. 점심 먹고난 뒤니까 한 1시쯤이려나..?"
          },
          "(13:00 경)",
          {
            image: "missing1234_smile",
            line: "안녕하세요 아저씨! 안녕하세요 아줌마!"
          },
          {
            image: "villager1_smile",
            line: "그래그래 이제 하교 하는거니?"
          },
          {
            image: "villager2_smile",
            line: "집에 잘들 들어가고!"
          },
          "사라진 애들이 다같이 아랫동네에 있는 학교에 오전반으로 다니거든요. 그래서 항상 그 시간 때쯤에 하교하는 애들이랑 마주쳐서 인사하곤 했죠.",
          "모두들 무사해야 할텐데.."
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager12", data: "villager12-time"}}
      },
      "answer-tales": {
        dialogue: [
          {
            image: "villager2_smile",
            line: "산 걸인 괴담이요?"
          },
          {
            image: "villager1_smile",
            line: "이 동네에서 나고자랐으면 누구나 어릴 때 들어봤을걸요? 저도 그랬고요."
          },
          {
            image: "villager2_smile",
            line: "산 괴물, 산 걸인, 산 마귀, 등등등 표현은 조금씩 다르지만"
          },
          {
            image: "villager2_smile",
            line: "요지는 결국 늦게까지 산에 있지말라고 애들 겁주는 거죠."
          },
        ],
        event: {eventKey: "test3-event-tales", eventData: {id: "test3_villager12", data: "villager12-tales"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "villager1_worry",
            line: "무턱대고 생각해보라 하셔도.."
          },
          {
            image: "villager2_worry",
            line: "애들이 4명이나 한 번에 사라질만한 이유가.."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "실종자들을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-tales": {
        answer: "괴담에 대하여",
        to: "answer-tales"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "villager1_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    x: 0,
    y: 0
  },
  {
    name: "마을 주민",
    id: "test3_villager12",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: undefined,
              line: "마을 주민들에게 질문을 해보자."
            }
          }
        ],
      },
      "answer-time": {
        dialogue: [
          {
            image: "villager1_worry",
            line: "논에서 일하다 애들이 하교할 때 봤죠. 점심 먹고난 뒤니까 한 1시쯤이려나..?"
          },
          "(13:00 경)",
          {
            image: "missing1234_smile",
            line: "안녕하세요 아저씨! 안녕하세요 아줌마!"
          },
          {
            image: "villager1_smile",
            line: "그래그래 이제 하교 하는거니?"
          },
          {
            image: "villager2_smile",
            line: "집에 잘들 들어가고!"
          },
          "사라진 애들이 다같이 아랫동네에 있는 학교에 오전반으로 다니거든요. 그래서 항상 그 시간 때쯤에 하교하는 애들이랑 마주쳐서 인사하곤 했죠.",
          "모두들 무사해야 할텐데.."
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager12", data: "villager12-time"}}
      },
      "answer-tales": {
        dialogue: [
          {
            image: "villager2_smile",
            line: "산 걸인 괴담이요?"
          },
          {
            image: "villager1_smile",
            line: "이 동네에서 나고자랐으면 누구나 어릴 때 들어봤을걸요? 저도 그랬고요."
          },
          {
            image: "villager2_smile",
            line: "산 괴물, 산 걸인, 산 마귀, 등등등 표현은 조금씩 다르지만"
          },
          {
            image: "villager2_smile",
            line: "요지는 결국 늦게까지 산에 있지말라고 애들 겁주는 거죠."
          },
        ],
        event: {eventKey: "test3-event-tales", eventData: {id: "test3_villager12", data: "villager12-tales"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "villager1_worry",
            line: "무턱대고 생각해보라 하셔도.."
          },
          {
            image: "villager2_worry",
            line: "애들이 4명이나 한 번에 사라질만한 이유가.."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "실종자들을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-tales": {
        answer: "괴담에 대하여",
        to: "answer-tales"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "villager2_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    x: 0,
    y: 0
  },
  {
    name: "마을 주민",
    id: "test3_villager34",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: undefined,
              line: "마을 주민들에게 질문을 해보자."
            }
          }
        ],
      },
      "answer-time": {
        dialogue: [
          {
            image: "villager4_neutral",
            line: "아이고 우리는 늙어서 이제 일하지도 못 하고, 그래서 집에만 있느라 아무 것도 못 봤소."
          },
          {
            image: "villager3_neutral",
            line: "이거 미안하구려. 애들이 하루아침에 없어졌으니 어멈들 마음은 오죽할까."
          },
          {
            image: "villager4_neutral",
            line: "특히 박 씨네 새댁이 걱정되는구만. 금지옥엽하던 딸이 사라졌으니."
          },
          {
            image: "villager3_neutral",
            line: "그러게나 말이야."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager34", data: "villager34-time"}}
      },
      "answer-missing2": {
        dialogue: [
          {
            image: "villager3_neutral",
            line: "그 집은 자식이라곤 딸만 있으면서 참 아낀단 말이야."
          },
          {
            image: "villager4_neutral",
            line: "그치만 성격도 얌전하지, 벌써 부모 생각해서 학교 끝나고 스스로 일도 돕고, 얼마나 기특하고 예뻐."
          },
          {
            image: "villager3_neutral",
            line: "그건 그래. 무사히 돌아와야 할텐데.."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager34", data: "villager34-missing2"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "villager4_neutral",
            line: "오메 젊은 사람이 무서운 소릴 하는구먼."
          },
          {
            image: "villager3_neutral",
            line: "우리도 아이들이 무사히 돌아오길 바라는 마음은 굴뚝 같네. 하지만 나이 들어서 하는 일이 집안에 죽치고 있는 것 밖에 없으니..도통 아는 게 있어야지."
          },
          {
            image: "villager4_neutral",
            line: "도움이 안돼 미안하구만."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "실종자들을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-missing2": {
        answer: "박선자 양에 대하여",
        to: "answer-missing2"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "villager3_sprite",
    scale: 10,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    x: 1830,
    y: 950
  },
  {
    name: "마을 주민",
    id: "test3_villager34",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: undefined,
              line: "마을 주민들에게 질문을 해보자."
            }
          }
        ],
      },
      "answer-time": {
        dialogue: [
          {
            image: "villager4_neutral",
            line: "아이고 우리는 늙어서 이제 일하지도 못 하고, 그래서 집에만 있느라 아무 것도 못 봤소."
          },
          {
            image: "villager3_neutral",
            line: "이거 미안하구려. 애들이 하루아침에 없어졌으니 어멈들 마음은 오죽할까."
          },
          {
            image: "villager4_neutral",
            line: "특히 박 씨네 새댁이 걱정되는구만. 금지옥엽하던 딸이 사라졌으니."
          },
          {
            image: "villager3_neutral",
            line: "그러게나 말이야."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager34", data: "villager34-time"}}
      },
      "answer-missing2": {
        dialogue: [
          {
            image: "villager3_neutral",
            line: "그 집은 자식이라곤 딸만 있으면서 참 아낀단 말이야."
          },
          {
            image: "villager4_neutral",
            line: "그치만 성격도 얌전하지, 벌써 부모 생각해서 학교 끝나고 스스로 일도 돕고, 얼마나 기특하고 예뻐."
          },
          {
            image: "villager3_neutral",
            line: "그건 그래. 무사히 돌아와야 할텐데.."
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_villager34", data: "villager34-missing2"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "villager4_neutral",
            line: "오메 젊은 사람이 무서운 소릴 하는구먼."
          },
          {
            image: "villager3_neutral",
            line: "우리도 아이들이 무사히 돌아오길 바라는 마음은 굴뚝 같네. 하지만 나이 들어서 하는 일이 집안에 죽치고 있는 것 밖에 없으니..도통 아는 게 있어야지."
          },
          {
            image: "villager4_neutral",
            line: "도움이 안돼 미안하구만."
          }
        ]
      }
    },
    opitons_config: {
      "option-time": {
        answer: "실종자들을 마지막으로 본 시간에 대하여",
        to: "answer-time"
      },
      "option-missing2": {
        answer: "박선자 양에 대하여",
        to: "answer-missing2"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "villager4_sprite",
    scale: 10,
    anim_config: {
      "frames": {
        "0,1": "standing"
      },
      "repeat": {
        "standing": true
      },
      "default": "standing",
      "auto_start": true
    },
    x: 1930,
    y: 950
  },
  {
    name: "경찰",
    id: "test3_police",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "police_neutral",
              line: "경찰에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-case": {
        dialogue: [
          {
            image: "police_neutral",
            line: "신고가 들어온 건 1시간 전인 오후 5시쯤입니다."
          },
          {
            image: "police_neutral",
            line: "그동안 마을과 뒷산에서 아이들이 자주 놀았다는 장소들까지 수색했지만 어디에도 아이들은 없었습니다."
          },
          {
            image: "police_neutral",
            line: "점심 이후부터 대부분의 마을 어른들이 마을 입구 쪽 논이나 밭에서 일하고 있었지만 아이들이 그 사이에 마을을 떠나는 걸 본 사람도 없습니다."
          },
          {
            image: "sami_neutral",
            line: "'입구 쪽에 보는 눈들이 그렇게 많은데 4명의 아이들이 한 번에 몰래 빠져나왔을리는 없어.'"
          },
          {
            image: "sami_neutral",
            line: "'그렇다면 남은 건 뒷산으로 올라가는 것 밖에 없는데?'"
          },
          {
            image: "sami_neutral",
            line: "'하지만 얘기를 들어보니 자주 다니던 길로 간 것 같지도 않아. 어떻게 된거지?'"
          }
        ],
        event: {eventKey: "test3-event-updateTimeline", eventData: {id: "test3_police", data: "police-case"}}
      },
      "answer-tales": {
        dialogue: [
          {
            image: "police_neutral",
            line: "그런 류의 이야기가 마을마다 하나씩 있기 마련이죠."
          },
          {
            image: "police_neutral",
            line: "대부분은 아이들을 겁줘서 허튼 짓 못 하게 하려는 수작이지만요."
          },
          {
            image: "police_neutral",
            line: "하지만 그게 통하는 것도 어릴 때나 그런 거 아니겠습니까?"
          }
        ]
      },
      "answer-kidnap": {
        dialogue: [
          {
            image: "police_neutral",
            line: "지난 5년간 이 인근에서 접수된 실종 신고는 3건 밖에 없었습니다."
          },
          {
            image: "police_neutral",
            line: "심지어 3명 모두 성인 남성이었습니다."
          },
          {
            image: "police_neutral",
            line: "이번에 탐정을 부른 것도 아이들만 실종 신고가 들어온 것이 이례적인 일이기 때문이니,"
          },
          {
            image: "police_neutral",
            line: "아이들만 노리는 인신매매단의 존재는 어디까지나 소문으로만 봐도 될 것 같습니다."
          }
        ],
        event: {eventKey: "test3-event-kidnap", eventData: {id: "test3_police", data: "police-kidnap"}}
      },
      "suspicion": {
        dialogue: [
          {
            image: "police_neutral",
            line: "수사를 할 때는 모든 가능성의 수를 열고 판단을 최대한 유보하는 것이 좋습니다."
          },
          {
            image: "police_neutral",
            line: "지금까지의 증거로 볼 때 아이들이 누군가에 의해 끌려갔을 가능성은 낮습니다."
          },
          {
            image: "police_neutral",
            line: "개인이 4명의 아이들을 통솔하기도 어려울 뿐더러,"
          },
          {
            image: "police_neutral",
            line: "4명의 아이들을 충분히 제압할 수 있는 인원이 동원됐다면 마을 사람들이 이상한 점을 눈치챘을테니까요."
          },
          {
            image: "sami_neutral",
            line: "바꿔 말하면 아이들이 자발적으로 사라진 걸 수도 있다는 거군요."
          },
          {
            image: "police_neutral",
            line: "그런가요. 그렇게 볼 수도 있겠네요."
          },
          {
            image: "sami_neutral",
            line: "'아이들이 자발적으로 사라진 걸수도 있다, 라..'"
          }
        ],
        event: {eventKey: "5pSYFHRok3Es4xw6XWcC", eventData: {id: "test3_police", data: "police-suspicion"}}
      }
    },
    opitons_config: {
      "option-case": {
        answer: "사건에 대하여",
        to: "answer-case"
      },
      "option-tales": {
        answer: "괴담에 대하여",
        to: "answer-tales"
      },
      "option-kidnap": {
        answer: "인신매매에 대하여",
        to: "answer-kidnap"
      },
      "suspicion": {
        answer: "(의심하기)",
        to: "suspicion"
      }
    },
    spritesheet: "police_sprite",
    scale: 1.2,
    anim_config: {
      "frames": {
        "1,4": "left",
        "5,8": "back",
        "9,12": "front",
        "13,16": "right"
      },
      "repeat": {
        "left": false,
        "back": false,
        "front": true,
        "right": false
      },
      "default": "front",
      "auto_start": true
    },
    x: 1800,
    y: 1680
  },
  {
    name: "감독관",
    id: "test3_inspector",
    dialogue: {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "inspector_neutral",
              line: "그래, 아이들이 어떻게 사라졌는지 알겠나?"
            }
          }
        ]
      },
      "answer-yes": {
        dialogue: [
          {
            image: "inspector_neutral",
            line: "모르는 것 같은데.."
          }
        ]
      },
      "answer-no": {
        dialogue: [
          {
            image: "inspector_neutral",
            line: "이렇게 쓸데없이 말을 걸 시간에 수사에 집중해주게나."
          }
        ]
      },
      "answer-solve": {
        dialogue: [
          {
            image: "sami_neutral",
            line: "사건을 모두 해결했습니다!"
          },
          {
            image: "sami_neutral",
            line: "이 마을에는 동굴 괴인에 대한 오래된 '괴담'이 있습니다."
          },
          {
            image: "sami_neutral",
            line: "실종된 아이들은 모두 9세에서 12세입니다. 괴담 같은 이야기를 믿을만한 나이지요."
          },
          {
            image: "sami_neutral",
            line: "그러니 괴담의 실체를 확인하려 다같이 '탐험'을 떠났다가 산 속에서 길을 잃은 겁니다."
          },
          {
            image: "inspector_neutral",
            line: "호오. 일리있는 주장이군. 아이들이 다같이 '탐험'을 떠났다는 구체적인 증거가 더 있는가?"
          },
          {
            image: "sami_neutral",
            line: "실종된 아이들은 모두 같은 학교의 오전반에 다닙니다. 학교에서 어른들의 눈을 피해 산으로 들어갈 계획을 같이 세운 거죠."
          },
          {
            image: "sami_neutral",
            line: "오후 3시쯤에 김정숙 양은 자기 오빠에게 '친구들과의 약속'을 지키지 못 하게 되면 어떻게 할 거냐고 따지며 굉장히 초조해했습니다. 어른들의 눈을 피해 다같이 만나기로 한 시간이 그즈음이었다고 추측할 수 있죠."
          },
          {
            image: "inspector_neutral",
            line: "하지만 다른 시간도 아니고 왜 하필 오후 3시에 만나기로 한거지? 하다못해 학교가 끝나자마자 가는 게 더 좋았을지도 모르는데."
          },
          {
            image: "sami_smile",
            line: "김정숙 양과 박선자 양은 '의자매' 였으니까요."
          },
          {
            image: "inspector_neutral",
            line: "'의자매'?"
          },
          {
            image: "sami_smile",
            line: "네, 두 사람이 며칠 전 탐험을 떠나기에 앞서 '의자매'를 맺는 걸 박선자 양 어머니가 목격했습니다."
          },
          {
            image: "sami_neutral",
            line: "박선자 양이 학교가 끝나고 항상 부모님을 도와 일을 하는 걸 알았던 김정숙 양은 박선자 양이 중간에 빠져나올 수 있는 시간으로 약속을 잡은 겁니다."
          },
          {
            image: "sami_smile",
            line: "다른 사람도 아닌 '의자매'를 두고갈 수는 없으니까요."
          },
          {
            image: "inspector_neutral",
            line: "그렇군. 그럼 아이들이 어디로 갔는지도 알아냈나?"
          },
          {
            image: "sami_neutral",
            line: "일주일 전 김정숙 양의 언니가 산에서 새로운 동굴을 발견했습니다. 그리고 저녁 식사를 하면서 그 위치를 동생에게 알려주었고요."
          },
          {
            image: "sami_neutral",
            line: "산 입구 쪽에서 주운 쪽지에도 '전등, 기름, 양초, 밧줄' 같은 준비물이 쓰여있었죠. 아이들이 동굴에 갈 계획이었다는 증거입니다."
          },
          {
            image: "inspector_neutral",
            line: "잘됐군. 잘됐어! 어서 다른 사람들에게도 이 사실을 알리고 아이들을 찾으러 가자고!"
          },
        ],
        event: {eventKey: "5pSYFHRok3Es4xw6XWcC", eventData: {id: "test3_inspector", data: "inspector-solve"}}
      }
    },
    opitons_config: {
      "option-yes": {
        answer: "예",
        to: "answer-yes"
      },
      "option-no": {
        answer: "아니오",
        to: "answer-no"
      },
      "option-solve": {
        answer: "예",
        to: "answer-solve"
      }
    },
    spritesheet: "inspector_sprite",
    scale: 1.5,
    anim_config: {
      "frames": {
        "1,4": "left",
        "5,8": "back",
        "9,12": "front",
        "13,16": "right"
      },
      "repeat": {
        "left": false,
        "back": false,
        "front": true,
        "right": false
      },
      "default": "front",
      "auto_start": true
    },
    x: 0,
    y: 0
  }
]

const items_JSON = [
  {
    name: "shoe",
    id: "test3_item0",
    x: 502,
    y: 460,
    scale: 2,
    depth_config: { constant: true, default: 15 },
    body_config: null,
    texture: "item_sparkle",
    interact: {
      "get": {
        type: "get",
        dialogue: [
          "창문 아래에서 신발 한 쪽을 주웠다."
        ],
        event: { eventKey: "z2Aj8sLVTc5FLNxZQ0Rg", eventData: {id: "test3_item0", data: "item0-get"} }
      }
    }
  },
  {
    name: "note",
    id: "test3_item1",
    x: 502,
    y: 460,
    scale: 2,
    depth_config: { constant: true, default: 15 },
    body_config: null,
    texture: "item_sparkle",
    interact: {
      "get": {
        type: "get",
        dialogue: [
          "숲으로 들어가는 길목에서 반쯤 찢어져있는 종이 조각을 주웠다."
        ],
        event: { eventKey: "test3-event-promise", eventData: {id: "test3_item1", data: "item1-get"} }
      }
    }
  }
]

export default class VillageScene extends Phaser.Scene {
  constructor () {
    super({key: 'Village'})
  }

  init(player_config) {
    this.sceneload.init(player_config)
  }

  preload() {
    this.load.image('vback', vback)
    this.load.image('mat', mat)
    this.load.image('vhouse_float', vhouse_float)
    this.load.image('vlighttree_float', vlighttree_float)
    this.load.image('vdarktree_float', vdarktree_float)
    this.load.image('vtree_float', vtree_float)
    
    this.load.image('house1_body1', house1_body1)
    this.load.image('house1_body2', house1_body2)
    this.load.image('house1_body3', house1_body3)
    this.load.image('house1_body4', house1_body4)
    this.load.image('house1_body5', house1_body5)
    this.load.image('house1_body6', house1_body6)
    this.load.image('house1_body7', house1_body7)
    this.load.image('house1_body8', house1_body8)
    this.load.image('house1_body9', house1_body9)
    this.load.image('house2_body1', house2_body1)
    this.load.image('house2_body2', house2_body2)
    this.load.image('house2_body3', house2_body3)
    this.load.image('house2_body4', house2_body4)
    this.load.image('house2_body5', house2_body5)
    this.load.image('house3_body1', house3_body1)
    this.load.image('house3_body2', house3_body2)
    this.load.image('house3_body3', house3_body3)
    this.load.image('house3_body4', house3_body4)
    this.load.image('house3_body5', house3_body5)
    this.load.image('house4_body1', house4_body1)
    this.load.image('house4_body2', house4_body2)
    this.load.image('house4_body3', house4_body3)
    this.load.image('house4_body4', house4_body4)
    this.load.image('house4_body5', house4_body5)
    this.load.image('house5_body1', house5_body1)
    this.load.image('house5_body2', house5_body2)

    this.load.image('vfield', vfield)
    this.load.image('vfield_1_1', vfield_1_1)
    this.load.image('vfield_1_2', vfield_1_2)
    this.load.image('vfield_2_1', vfield_2_1)
    this.load.image('vfield_2_2', vfield_2_2)
    this.load.image('vfield_2_3', vfield_2_3)
    this.load.image('vfield_2_4', vfield_2_4)
    this.load.image('vfield_3_1', vfield_3_1)
    this.load.image('vfield_3_2', vfield_3_2)
    this.load.image('vfield_3_3', vfield_3_3)
    this.load.image('vfield_4_1', vfield_4_1)
    this.load.image('vfield_4_2', vfield_4_2)
    this.load.image('vfield_4_3', vfield_4_3)

    this.load.image('vcutted_tree', vcutted_tree)
    this.load.image('vtree', vtree)

    this.load.image('vgrass_1', vgrass_1)
    this.load.image('vgrass_2', vgrass_2)
    this.load.image('vgrass_3', vgrass_3)
    this.load.image('vgrass_4', vgrass_4)
    this.load.image('vgrass_5', vgrass_5)
    this.load.image('vgrass_6', vgrass_6)
    this.load.image('vgrass_7', vgrass_7)
    this.load.image('vgrass_8', vgrass_8)
    this.load.image('vgrass_9', vgrass_9)
    this.load.image('vgrass_10', vgrass_10)
    this.load.image('vgrass_11', vgrass_11)
    this.load.image('vgrass_12', vgrass_12)

    // load npc spritesheet
    this.load.spritesheet('missing1mom_sprite', missing1mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing1bro_sprite', missing1bro_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing1sis_sprite', missing1sis_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing2mom_sprite', missing2mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing3mom_sprite', missing3mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing3bro_sprite', missing3bro_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('missing4mom_sprite', missing4mom_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager1_sprite', villager1_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager2_sprite', villager2_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager3_sprite', villager3_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('villager4_sprite', villager4_sprite, { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('police_sprite', police_sprite, { frameWidth: 5508 / 17, frameHeight: 498 })
    this.load.spritesheet('inspector_sprite', inspector_sprite, { frameWidth: 4692 / 17, frameHeight: 516 })
    // load npc+sami image
    this.load.image('police_neutral', police_neutral)
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('sami_neutral', sami_neutral)
    this.load.image('sami_surprise', sami_surprise)

    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(0, 0, 'vback').setOrigin(0, 0)
    this.physics.world.setBounds(0, 0, background.width-18, background.height, true, true, true, true)
    console.log(background.width, background.height)

    this.physics.add.staticImage(1880,950,'mat').setScale(1.5)
    // add obstacle image + adjust body
    const floatGroup = this.physics.add.staticGroup()
    const fields = this.physics.add.staticGroup()
    const trees = this.physics.add.staticGroup()
    const grass = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    floatGroup.create(195,150,'vhouse_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vlighttree_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vdarktree_float').setOrigin(0,0).setDepth(15)
    floatGroup.create(0,0,'vtree_float').setOrigin(0,0).setDepth(15)

    houses.create(2145,812,'house1_body1')
    houses.create(1815,935,'house1_body2')
    houses.create(1860,990,'house1_body3')
    houses.create(2285,820,'house1_body4')
    houses.create(2305,865,'house1_body5')
    houses.create(2325,950,'house1_body6')
    houses.create(2230,930,'house1_body7')
    houses.create(2185,985,'house1_body8')
    houses.create(1880,814,'house1_body9')
    houses.create(1220,860,'house2_body1')
    houses.create(1440,880,'house2_body2')
    houses.create(1470,890,'house2_body3')
    houses.create(1490,900,'house2_body4')
    houses.create(1515,915,'house2_body5')
    houses.create(920,745,'house3_body1')
    houses.create(740,750,'house3_body2')
    houses.create(625,715,'house3_body3')
    houses.create(605,735,'house3_body3')
    houses.create(600,790,'house3_body4')
    houses.create(555,795,'house3_body5')
    houses.create(555,785,'house3_body5')
    houses.create(345,1050,'house4_body1')
    houses.create(210,1055,'house4_body2')
    houses.create(530,1100,'house4_body3')
    houses.create(620,1160,'house4_body4')
    houses.create(615,1195,'house4_body5')
    houses.create(1050,320,'house5_body1')
    houses.create(1250,315,'house5_body2')

    fields.create(150, 120, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(300, 70, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(400, 0, 'vfield_1_1').setScale(0.5).refreshBody()
    fields.create(740, 510, 'vfield_1_2').refreshBody()
    fields.create(570, 560, 'vfield_1_2').refreshBody()
    fields.create(270, 760, 'vfield').refreshBody()
    fields.create(310, 700, 'vfield').refreshBody()
    fields.create(420, 560, 'vfield').refreshBody()
    fields.create(520, 450, 'vfield').refreshBody()
    fields.create(570, 400, 'vfield').refreshBody()
    fields.create(620, 370, 'vfield').refreshBody()
    fields.create(640, 690, 'vfield').refreshBody()
    fields.create(685, 383, 'vfield').refreshBody()
    fields.create(739, 425, 'vfield').refreshBody()
    fields.create(790, 475, 'vfield').refreshBody()
    fields.create(600, 510, 'vfield_2_1').setScale(0.8).refreshBody()
    fields.create(450, 590, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(420, 650, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(370, 730, 'vfield_2_1').setScale(0.5).refreshBody()
    fields.create(300, 800, 'vfield_2_1').setScale(0.3).refreshBody()
    fields.create(1700, 355, 'vfield_2_1').refreshBody()
    fields.create(1645, 465, 'vfield_2_2').refreshBody()
    fields.create(1595, 503, 'vfield_2_3').refreshBody()
    fields.create(1625, 550, 'vfield_2_4').refreshBody()
    fields.create(1617, 609, 'vfield').refreshBody()
    fields.create(337, 1609, 'vfield_3_1').refreshBody()
    fields.create(356, 1500, 'vfield_3_1').refreshBody()
    fields.create(839, 1351, 'vfield_3_1').refreshBody()
    fields.create(889, 1321, 'vfield_3_1').refreshBody()
    fields.create(723, 1500, 'vfield_3_2').refreshBody()
    fields.create(1190, 1406, 'vfield_3_3').refreshBody() 
    fields.create(1799, 1412.5, 'vfield_4_1').refreshBody()
    fields.create(2084, 1375, 'vfield_4_2').refreshBody()
    fields.create(2405, 1363.5, 'vfield_4_3').refreshBody()

    trees.create(845, 250, 'vtree').refreshBody()
    trees.create(1445, 260, 'vtree').refreshBody()
    trees.create(160, 1880, 'vtree').refreshBody()
    trees.create(1120, 1890, 'vtree').refreshBody()
    trees.create(1340, 1890, 'vtree').refreshBody()

    grass.create(25, 1580, 'vgrass_1').refreshBody()
    grass.create(20, 600, 'vgrass_2').refreshBody()
    grass.create(1400, 10, 'vgrass_3').refreshBody()
    grass.create(2149, 130, 'vgrass_4').refreshBody()
    grass.create(2565, 229, 'vgrass_5').refreshBody()
    grass.create(2192, 527, 'vgrass_7').refreshBody()
    grass.create(2191, 1865, 'vgrass_7').refreshBody()
    grass.create(2290, 558, 'vgrass_7').refreshBody()
    grass.create(2385, 633, 'vgrass_7').refreshBody()
    grass.create(700, 70, 'vgrass_7').refreshBody()
    grass.create(620, 120, 'vgrass_7').refreshBody()
    grass.create(2620, 900, 'vgrass_8').refreshBody()
    grass.create(2710, 990, 'vgrass_9').refreshBody()
    grass.create(2625, 1683, 'vgrass_10').refreshBody()
    grass.create(2495, 1815, 'vgrass_11').refreshBody()
    grass.create(2272, 1925, 'vgrass_12').refreshBody()

    // set obstacle invisible
    fields.setVisible(false)
    trees.setVisible(false)
    grass.setVisible(false)
    houses.setVisible(false)

    const colliders = [ fields, trees, grass, houses ]

    // create Items
    this.items = []
    items_JSON.forEach((item) => {
      this.items.push(new Item2(
        this,
        item.id,
        item.x,
        item.y,
        item.name,
        item.scale,
        item.depth_config,
        item.body_config
      ))
    })
    // create NPCs
    this.npcs = []
    npcs_JSON.forEach((npc) => {
      this.npcs.push(new NPC(
        this,
        this.sceneload,
        npc.id,
        npc.spritesheet,
        npc.scale,
        npc.anim_config,
        npc.x,
        npc.y,
        npc.dialogue,
        npc.options_config
      ))
    })

    const camera_config = {
      'main_zoom': 0.9,
      'mini_zoom': 0.065,
      'mini_scrollX': 1306,
      'mini_scrollY': 925
    }
    this.sceneload.create(colliders, this.items, this.npcs, camera_config, data)
    this.game.stage.mapEvent(this) // activate stage

    // check clue update
    if (!useGameStore().cluenote[2]) {
      console.log('test3 no clue')
      // if Test3 clue not exist, play stage-start event
      const start_config = { 
        'start': {
          sceneKey: 'Village',
          x: null,
          y: null,
          dialogue: [
            {
              image: "inspector_neutral",
              line: "자네가 탐정 시험 지원자인 사미인가?",
              name: "감독관"
            },
            {
              image: "sami_neutral",
              line: "네 맞습니다."
            },
            {
              image: "inspector_neutral",
              line: "만나서 반갑네. 난 세번째 시험에 동행하게 된 감독관일세. 자네가 실제 사건을 해결하는 과정을 옆에서 지켜보며 탐정으로써의 자질을 평가하는 역할이지.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "이 마을에서 아이들이 한 번에 넷이나 사라졌네.",
              name: "감독관"
            },
            {
              image: "sami_neutral",
              line: "아이들이 사라졌다고요?"
            },
            {
              image: "inspector_neutral",
              line: "그래. 아이들의 안전을 위해서 한시라도 빨리 해결되어야 하는 사건인거지.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "만일 자네가 사건을 해결하는데 너무 오래 걸려 아이들의 안전이 우려되는 상황이 발생한다면 내가 나서겠지만, 그 전까지 나는 어떤 도움도 주지 않을걸세.",
              name: "감독관"
            },
            {
              image: "inspector_neutral",
              line: "그럼 이 점을 염두에 두고 사건을 해결해보게나.",
              name: "감독관"
            },
            {
              image: "police_neutral",
              line: "오시기로 한 탐정분들인가요? 여기 실종된 아이들의 인적사항입니다. 받으십시오.",
              name: "경찰"
            }
          ],
          event: { eventKey: 'start', eventData: {data: 'no-clue'} }
        }
      }
      this.events.emit('quiz-event', 'start', start_config)
    }
    // game-clear event
    this.events.on('game-clear', () => {
      // set scene invisible
      this.scene.setVisible(false, this)

      // create game-clear dialogue
      // get cameraX + cameraY
      const cameraX = this.cameras.main.worldView.x, cameraY = this.cameras.main.worldView.y      
      const d_data = [
        {
          image: "missing1sis_surprise",
          line: "제가 안내할게요!"
        },
        "....",
        "저기 동굴 안에 불빛이 보인다!",
        "아이들이 보인다! 서둘러!",
        {
          image: "missing1mom_worry",
          line: "정숙아!"
        },
        {
          image: "missing2mom_worry",
          line: "선자야!"
        },
        {
          image: "missing3mom_worry",
          line: "정웅아!"
        },
        {
          image: "missing4mom_worry",
          line: "영길아!"
        },
        {
          image: "missing4_neutral",
          line: "으음...엄마..?"
        },
        "아이들은 모포를 덮은 채 촛불을 둘러싸고 앉아있었으며, 모두 다친 데 없이 무사했다.",
        "해가 져서 기온이 떨어진 것 때문에 저체온증을 걱정했는데, 다행이 촛불과 서로의 온기로 저체온증에도 걸리지 않은 것 같다.",
        {
          image: "missing3mom_worry",
          line: "해가 지기 전에 산에서 내려왔어야지! 해 떨어지면 산 속이 제일 위험하다고 했잖아!"
        },
        {
          image: "missing2mom_worry",
          line: "그래 다음부터는 절대로 이런 짓 하지 마. 알겠지?"
        },
        {
          image: "missing3_neutral",
          line: "하지만, 산 걸인이 와서 어른들이 올 때까지 동굴에서 기다리라고 했단 말이예요."
        },
        {
          image: "missing1mom_worry",
          line: "뭐? 산 걸인이 왜 나타나? 그런 거짓말 하면 못 써!"
        },
        {
          image: "missing1_angry",
          line: "진짜야! 우리 다같이 봤다고!"
        },
        "아이들은 모두 동굴 안에 있을 때 갑자기 나타난 '동굴 할머니'에 대해서 얘기했다.",
        "그리고 그 '동굴 할머니'가 어른들이 올 때까지 동굴에서 나오지 말고 기다리라고 했다는 얘기도.",
        {
          image: "sami_neutral",
          line: "아이들 모두 똑같은 내용을 말하고 있어. 이건 환영이나 착각이 아니야."
        },
        {
          image: "sami_neutral",
          line: "그럼 이 '동굴 할머니'는 누구지? 왜 아이들에게 동굴 밖으로 나오지 말라고 한 거고?"
        },
        "계속..."
      ]
      const dialogue = new Dialogue(this, cameraX, cameraY, 0.9, undefined, d_data)
      dialogue.create(undefined)
      this.scene.events.emit('start-talking')
    })
  }

  update() {
    this.sceneload.update(this.items, this.npcs)
  }
}
