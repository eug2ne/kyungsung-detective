import Phaser from 'phaser'
import { useGameStore } from '../game'
import Item from "../GameObjects/Item"
import NPC from "../GameObjects/NPC"
import test2 from '@/game/assets/test2_map/test2.png'
import desk from '@/game/assets/test2_map/test2-desk.png'
import sofa from '@/game/assets/test2_map/test2-sofa.png'
import deadbody from '@/game/assets/test2_map/test2-deadbody.png'
import deskbook from '@/game/assets/test2_map/test2-deskbook.png'
import bookshelf from '@/game/assets/test2_map/test2-bookshelf.png'
import tea from '@/game/assets/test2_map/test2-tea.png'

// import npc spritesheet
import suspect1_sprite from '@/game/assets/npc_sprite/친구_박유신.png'
import suspect2_sprite from '@/game/assets/npc_sprite/동생_김현수.png'
import suspect3_sprite from '@/game/assets/npc_sprite/가정부_안연정.png'

// import npc + sami log image
import victim_neutral from '@/game/assets/npc_log/박씨.png'
import suspect1_neutral from '@/game/assets/npc_log/친구.png'
import suspect2_neutral from '@/game/assets/npc_log/동생.png'
import suspect3_neutral from '@/game/assets/npc_log/가정부2.png'
import inspector_neutral from '@/game//assets/npc_log/관리자.png'
import applicant4_neutral from '@/game//assets/npc_log/지원자4_이미지.png'
import sami_neutral from '@/game/assets/sami_log/sami_무표정.png'
import sami_sus from '@/game/assets/sami_log/sami_의심.png'
import sami_smile from '@/game//assets/sami_log/sami_웃음.png'

const npcs_JSON = [
  {
    "name": "박유신",
    "id": "test2_suspect1",
    "dialogue": {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "suspect1_neutral",
              line: "박유신에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            "image": "suspect1_neutral",
            "line": "저는 오늘 돈 문제로 얘기할 게 있어서 철수네 집에 왔어요."
          },
          {
            "image": "suspect1_neutral",
            "line": "오래 있지는 않았습니다. 아마 1시간도 안돼서 떠난 걸로 기억합니다."
          }
        ],
        event: {eventKey: "test2-event-timelineUpdate", eventData: {id: "test2_suspect1", data: "suspect1-time"}}
      },
      "answer-fight": {
        dialogue: [
          {
            "image": "suspect1_neutral",
            "line": "철수랑 얘기를 하다가 몸싸움이 좀 있었던 건 사실입니다."
          },
          {
            "image": "suspect1_neutral",
            "line": "하지만 심하게 싸운 건 아니었어요."
          },
          {
            "image": "suspect1_neutral",
            "line": "서로 멱살 정도만 잡았는데, 그 정도는 평소에도 으레 있는 일이었어요."
          },
          {
            "image": null,
            "line": "오히려 오늘은 철수가 평소보다 피곤해보여서 일찍 떠났다고요!"
          }
        ],
        event: {eventKey: "WIN3vIY76B5ZHa13x70c", eventData: {id: "test2_suspect1", data: "suspect1-fight"}}
      },
      "answer-coffee": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "박유신씨, 커피를 대접받았을 때 두 분 중 냉커피를 마신 분이 있습니까?"
          },
          {
            "image": "suspect1_neutral",
            "line": "네, 철수가 냉커피를 마셨습니다. 항상 몸에 열이 많아서 따뜻한 건 자기랑 잘 안 맞는다고 했어요."
          }
        ],
        event: {eventKey: "YPnEQwKAwueWEzSmpRdF", eventData: {id: "test2_suspect1", data: "suspect1-coffee"}}
      },
      "suspicion.test2_suspect2": {
        dialogue: [
          {
            "image": "suspect1_neutral",
            "line": "당연히 저 동생이란 놈이겠죠."
          },
          {
            "image": "suspect1_neutral",
            "line": "제 주변에서도 가족끼리 싸우는 가장 큰 이유가 뭔지 아세요? 다 돈이에요, 돈."
          },
          {
            "image": "suspect1_neutral",
            "line": "말로만 우애 다지기야 쉽죠. 그래봤자 돈 앞에서는 가족도 변절하는게 사람입니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "이 양아치가! 날 너 같은 인륜을 우습게 아는 놈이랑 동급으로 취급하지마! 너나 사람 죽이는게 우습겠지!"
          }
        ],
        event: {eventKey: "suspicion", eventData: {id: "test2_suspect1", data: "suspect1-suspicion.test2_suspect2"}}
      },
      "refusal": {
        dialogue: [
          {
            "image": "suspect1_neutral",
            "line": "뭐죠? 이미 저를 범인으로 확신하시는 모양인데 더 물을 것이 있습니까?"
          }
        ]
      }
    },
    "options_config": {
      "option-default": {
        "answer": "피해자를 방문한 시간에 대해",
        "to": "answer-time"
      },
      "option-fight": {
        "answer": "싸움에 대해",
        "to": "answer-fight"
      },
      "option-coffee": {
        "answer": "커피에 대해",
        "to": "answer-coffee"
      },
      "option-suspicion.test2_suspect2": {
        "answer": "(의심 가는 사람 지목하기)",
        "to": "suspicion.test2_suspect2"
      }
    },
    "spritesheet": "suspect1_sprite",
    "scale": 1.5,
    "anim_config": {
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
      "default": null,
      "auto_start": false
    },
    "clue": {},
    "answer": null,
    "check": null,
    "x": 323,
    "y": 1150
  },
  {
    "name": "김현수",
    "id": "test2_suspect2",
    "dialogue": {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "suspect2_neutral",
              line: "김현수에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            "image": "suspect2_neutral",
            "line": "저는 방금 이 집에 왔습니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "제가 방문을 열자마자 형님이 이미 돌아가신 걸 발견했습니다."
          }
        ],
        event: {eventKey: "test2-event-timelineUpdate", eventData: {id: "test2_suspect2", data: "suspect2-time"}}
      },
      "answer-heritage": {
        dialogue: [
          {
            "image": "suspect2_neutral",
            "line": "윽, 그건.."
          },
          {
            "image": "suspect2_neutral",
            "line": "..부모님이 장남이란 이유로 형님에게만 거의 모든 유산을 물려주신 건 사실입니다."
          },
          {
            "image": "sami_sus",
            "line": "심지어 경제관념 없이 돈을 펑펑 쓰기만 하니 불만이 상당했을 것 같군요."
          },
          {
            "image": "suspect2_neutral",
            "line": "그걸 그렇게 딱 짚어서 말씀하시니 변명할 수도 없네요.."
          },
          {
            "image": "suspect2_neutral",
            "line": "인정하겠습니다. 형님에게만 유산을 물려준 부모님도, 그 유산을 여흥에만 낭비하는 형님도 모두 원망스러웠습니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "하지만 그 돈이 형님의 목숨값보다 중하지는 않았습니다! 형님을 해쳐서 나오는 돈이라면 안 받느니만 못 합니다!"
          }
        ],
        event: {eventKey: "test2-event-heritage", eventData: {id: "test2_suspect2", data: "suspect2-heritage"}}
      },
      "answer-suspect3": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "듣자하니 안연정씨가 이 집에서 굉장히 오랜 시간 일하신 것 같습니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "아무래도 저희 어릴 때 들어오셔서 부모님부터 모시기 시작했으니까요."
          },
          {
            "image": "sami_neutral",
            "line": "안연정씨가 피해자와 과거에 갈등이 있었던 적이 있나요?"
          },
          {
            "image": "suspect2_neutral",
            "line": "네? 아뇨, 그럴리가요. 저희도 어릴 때부터 안연정씨를 잘 따랐고, 부모님도 항상 안연정씨의 능력을 높이 샀는걸요."
          },
          {
            "image": "suspect2_neutral",
            "line": "안연정씨만큼 성실하고, 훌륭한 분을 가정부로 둘 수 있다는게 얼마나 행운인데요."
          }
        ],
        event: {eventKey: "tLJfpFrSVAq5O1sGNs8I", eventData: {id: "test2_suspect2", data: "suspect2-suspect3"}}
      },
      "suspicion.test2_suspect1": {
        dialogue: [
          {
            "image": "suspect2_neutral",
            "line": "저는 역시 저 박유신이라는 양아치가 가장 수상합니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "형님도 본래 이렇게 여흥에 돈을 낭비하는 분이 아니셨습니다."
          },
          {
            "image": "suspect2_neutral",
            "line": "그런데 어느날부터 저 박유신이란 작자와 어울리기 시작하더니 나쁜 물이 들어서 이 지경까지 되었습니다."
          },
          {
            "image": "suspect1_neutral",
            "line": "너네 그 잘난 형님이 노는 모습을 직접 봤으면 그런 소리는 입 밖에도 못 내밀텐데!"
          },
          {
            "image": "suspect1_neutral",
            "line": "자기 손으로 가산 말아먹은 것도 내 탓이고, 이제는 너네 형님 죽음까지 내 탓이다!"
          }
        ],
        event: { eventKey: "suspicion", eventData: {id: "test2_suspect2", data: "suspect1-suspicion.test2_suspect1"}}
      },
      "refusal": {
        dialogue: [
          {
            "image": "suspect2_neutral",
            "line": "저 양아치의 말을 믿으시는 겁니까? 제가 형님을 죽였다고?!"
          }
        ]
      }
    },
    "options_config": {
      "option-default": {
        "answer": "피해자를 방문한 시간에 대해",
        "to": "answer-time"
      },
      "option-heritage": {
        "answer": "유산에 대해",
        "to": "answer-heritage"
      },
      "option-suspect3": {
        "answer": "안연정에 대해",
        "to": "answer-suspect3"
      },
      "option-suspicion.test2_suspect1": {
        "answer": "(의신 가는 사람 지목하기)",
        "to": "suspicion.test2_suspect1"
      }
    },
    "spritesheet": "suspect2_sprite",
    "scale": 1.5,
    "anim_config": {
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
      "default": null,
      "auto_start": false
    },
    "clue": {},
    "answer": null,
    "check": null,
    "x": 580,
    "y": 1150
  },
  {
    "name": "안연정",
    "id": "test2_suspect3",
    "dialogue": {
      "default-question": {
        dialogue: [
          {
            question: {
              image: "suspect3_neutral",
              line: "안연정에게 질문을 해보자."
            }
          }
        ]
      },
      "answer-time": {
        dialogue: [
          {
            "image": "suspect3_neutral",
            "line": "저는 오늘 오전에 친구분이 오셨을 때 커피를 내려 방에 들인 것 빼고는 서재에 들어간 적이 없습니다."
          },
          {
            "image": "sami_neutral",
            "line": "박유신씨가 떠난 뒤에도요?"
          },
          {
            "image": "suspect3_neutral",
            "line": "네. 박유신씨가 집까지 와서 좋았던 적이 거의 없다보니, 굳이 도련님 기분이 안 좋을 때 마주치고 싶지 않았거든요.."
          },
          {
            "image": "sami_neutral",
            "line": "박유신씨가 방문하시는 동안 수상한 점은 없었습니까?"
          },
          {
            "image": "suspect3_neutral",
            "line": "그러고보니 두 분이 싸우는 소리가 서재 밖까지 들렸습니다!"
          }
        ],
        event: {eventKey: "WIN3vIY76B5ZHa13x70c", eventData: {id: "test2_suspect3", data: "suspect3-time"}}
      },
      "answer-record": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "집안 장부를 봤습니다. 안연정씨 이름이 오래 전 사용인 기록에도 나와있더군요."
          },
          {
            "image": "sami_neutral",
            "line": "이 집에서 오랫동안 근무하신 것 같습니다."
          },
          {
            "image": "suspect3_neutral",
            "line": "맞습니다. 도련님들이 어릴 때부터 이 집안을 관리해왔습니다."
          }
        ],
        event: null
      },
      "answer-pay": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "장부에서 한 가지 이상한 점을 봤었습니다."
          },
          {
            "image": "sami_neutral",
            "line": "몇 년간 꾸준히 있었던 사용인들에 대한 기록이 최근 들어서 점점 줄어들었어요."
          },
          {
            "image": "sami_neutral",
            "line": "아마 피해자가 금전 문제가 생기면서 집안 살림을 줄이려고 사용인들을 정리하면서 그렇게 된 것 같은데,"
          },
          {
            "image": "sami_neutral",
            "line": "어느 순간부터는 사용인 기록이 아예 없어졌습니다."
          },
          {
            "image": "sami_neutral",
            "line": "이 집안에서 남은 사용인은 안연정씨뿐이라 기록이 누락된 거라고 생각할 수도 있지만,"
          },
          {
            "image": "sami_sus",
            "line": "저는 당신이 오랫동안 임금을 받지 못 했기 때문에 기록에 없는 것이라고 생각됩니다."
          },
          {
            "image": "suspect3_neutral",
            "line": "그걸 어떻게..!"
          },
          {
            "image": "suspect3_neutral",
            "line": "네, 맞아요. 몇 달 간 급여를 받지 못 하고 있습니다."
          },
          {
            "image": "suspect3_neutral",
            "line": "설마 그것 때문에 저를 의심하시는 건 아니죠?"
          },
          {
            "image": "suspect3_neutral",
            "line": "주인님을 죽인다고 없던 돈이 생기는 것도 아닌데 제가 왜 그런 짓을 하겠습니까?"
          }
        ],
        event: {eventKey: "tLJfpFrSVAq5O1sGNs8I", eventData: {id: "test2_suspect3", data: "suspect3-pay"}}
      },
      "answer-suspect2": {
        dialogue: [
          {
            "image": "sami_neutral",
            "line": "이 집에서 오래 일하셨으니 피해자와 동생분인 김현수씨에 대해서도 잘 아시겠군요."
          },
          {
            "image": "suspect3_neutral",
            "line": "그럼요! 어릴 때부터 봐온 사이인걸요."
          },
          {
            "image": "sami_neutral",
            "line": "김현수씨와 피해자의 사이는 생전에 어땠나요?"
          },
          {
            "image": "suspect3_neutral",
            "line": "어릴 때부터 우애가 좋은 형제였어요. 최근 유산 문제 때문에 사이가 틀어지시긴 했지만.."
          },
          {
            "image": "sami_neutral",
            "line": "유산 문제가 있었다는 걸 알고 있었습니까?"
          },
          {
            "image": "suspect3_neutral",
            "line": "알고 있었죠. 그것 때문에 두 분이 갈라진게 안타까워요."
          },
          {
            "image": "suspect3_neutral",
            "line": "전 주인분들도 너무하시지. 현수 도련님이 가업을 이어받으려고 얼마나 성실하게 노력하셨는지 아시면서, 장남이란 이유로 모든 걸 주인님에게 물려주시고.."
          }
        ],
        event: {eventKey: "test2-event-heritage", eventData: {id: "test2_suspect3", data: "suspect3-suspect2"}}
      },
      "suspicion.test2_suspect1": {
        dialogue: [
          {
            "image": "suspect3_neutral",
            "line": "제가 감히 누군가를 범인으로 몰 자격이 있는지 모르겠으나"
          },
          {
            "image": "suspect3_neutral",
            "line": "굳이 지목한다면 역시 저 친구라는 자겠지요."
          },
          {
            "image": "suspect3_neutral",
            "line": "서재에서 단둘이 있을 때 싸우는 소리가 나지않았습니까?"
          },
          {
            "image": "suspect3_neutral",
            "line": "그리고 저 자를 만나고부터 주인님이 망가져가는 모습을 직접 본 입장에서 됨됨이를 전혀 믿을 수 없는 자입니다."
          },
          {
            "image": "suspect1_neutral",
            "line": "뭐야? 이 아녀자가 뭣도 모르면서 무슨 소리를 지껄이는 거야?!"
          }
        ],
        event: { eventKey: "suspicion", eventData: {id: "test2_suspect3", data: "suspect3-suspicion.test2_suspect1"}}
      }
    },
    "options_config": {
      "option-default": {
        "answer": "피해자를 방문한 시간에 대해",
        "to": "answer-time"
      },
      "option-record": {
        "answer": "가계장부에 대해",
        "to": "answer-record"
      },
      "option-pay": {
        "answer": "가계장부에 대해",
        "to": "answer-pay"
      },
      "option-suspect2": {
        "answer": "김현수에 대해",
        "to": "answer-suspect2"
      },
      "option-suspicion.test2_suspect1": {
        "answer": "(의신 가는 사람 지목하기)",
        "to": "suspicion.test2_suspect1"
      }
    },
    "spritesheet": "suspect3_sprite",
    "scale": 1.5,
    "anim_config": {
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
      "default": null,
      "auto_start": false
    },
    "clue": {},
    "answer": null,
    "check": null,
    "x": 840,
    "y": 1150
  }
]

const items_JSON = [
  {
    "name": "body",
    "id": "test2_item0",
    "x": 502,
    "y": 460,
    "scale": 2,
    "depth": 7,
    "texture": "deadbody",
    "interact": {
      "read": {
        "type": "read",
        "dialogue": [
          "진짜 시신 대신 짚으로 만든 모형이 누워있다.",
          "자세로 보아 의자에서 일어나려다 그대로 쓰러진 것 같다.",
          "모형에 붙어있는 종이에 시신에 대한 간단한 조사 내용들이 정리되어 있다.",
          "「자잘한 멍과 찰과상이 전신에 있으며,」",
          "「두부에 큰 충격을 받은 흔적이 있으나 규모가 작아 사인으로 보기에는 다소 무리가 있다.」",
          "「그 이외의 치명적인 외상은 없다.」",
          "「양쪽 눈에 핏발이 심하며, 입안이 말라있다.」"
        ],
        event: { eventKey: "WIN3vIY76B5ZHa13x70c", eventData: {id: "test2_item0", data: "item0-read"} } /* reveal autopsy subclue */
      }
    }
  },
  {
    "name": "book",
    "id": "test2_item1",
    "x": 575,
    "y": 513,
    "scale": 2,
    "depth": 8,
    "texture": "deskbook",
    "interact": {
      "read": {
        "type": "read",
        "dialogue": [
          "책상 위에 서류가 흩어져있다.",
          "이것저것 들춰보다 익숙한 이름이 적혀있는 서류를 하나 발견했다.",
          {
            image: "sami_neutral",
            line: "「상속세과세자진신고서」?"
          },
          {
            image: "sami_neutral",
            line: "부모님이 돌아가시면서 이 집을 포함해서 집안에서 운영하던 사업의 경영권에, 고향의 선산 토지랑 관리권까지"
          },
          {
            image: "sami_neutral",
            line: "이 정도면 집안의 모든 주요 재산은 다 물려받았는데."
          },
          "책상에서 관련 자료를 더 찾아보니 유언장이 나왔다.",
          "역시나 집안의 거의 모든 재산은 장남인 피해자에게 증여되었고, 차남인 김현수에게는 현금 약간만이 주어졌다."
        ],
        event: { eventKey: "test2-event-heritage", eventData: {id: "test2_item1", data: "item1-read"}} // get heritage subclue
      }
    }
  },
  {
    "name": "bookshelf",
    "id": "test2_item2",
    "x": 575,
    "y": 197,
    "scale": 2,
    "depth": 10,
    "texture": "bookshelf",
    "interact": {
      "read": {
        "type": "read",
        "dialogue": [
          "책장에 여러 종류의 책이 꽂혀있다.",
          "가지런하게 정리되어 있는 집안 가계장부가 눈에 들어온다.",
          "유복한 집안답게 초반에는 장부에서 문제를 찾아볼 수 없다.",
          {
            image: "sami_neutral",
            line: "옛날 사용인 기록에도 안연정의 이름이 있잖아?"
          },
          "몇 년 전 기록부터 등장하는 걸로 보아 안연정은 이 집에서 굉장히 오랫동안 근무한 것 같다.",
          "최근 기록으로 오면서 전체적인 지출이 점점 줄어들고, 사용인 기록이 아예 없어지기 전까지 안연정의 이름은 꾸준히 장부에 기록되어 있다.",
          {
            image: "sami_neutral",
            line: "이때부터 친구라는 박유신과 돈 문제가 생기기 시작하는 거겠지."
          },
          {
            image: "sami_neutral",
            line: "살림을 정리하면서 안연정을 제외한 사용인들은 모두 내보낸 모양이야."
          },
          {
            image: "sami_neutral",
            line: "가구나 미술품을 판 기록도 있네."
          }
        ],
        event: { eventKey: "tLJfpFrSVAq5O1sGNs8I", eventData: {id: "test2_item2", data: "item2-read"}}
      }
    }
  },
  {
    "name": "coffee",
    "id": "test2_item3",
    "x": 575,
    "y": 825,
    "scale": 2,
    "depth": 10,
    "texture": "tea",
    "interact": {
      "read": {
        "type": "read",
        "dialogue": [
          "방 한가운데에 탁자가 놓여있다.",
          "손님들을 맞이하고 음료 같은 걸 대접하는 자리인 것 같다.",
          {
            image: "sami_neutral",
            line: "저 커피 주전자는 박유신씨가 방문했을 때 내놓은 거겠군."
          },
          "한 쪽 잔에는 다 식은 커피가 남아있고 한 쪽 잔에는 커피가 거의 남아있지 않다.",
          {
            image: "sami_neutral",
            line: "비어있는 쪽 잔에만 결로가 있잖아?"
          },
          {
            image: "sami_neutral",
            line: "한 명은 냉커피를, 다른 한 명은 따뜻한 커피를 마신건가?"
          }
        ],
        event: { eventKey: "YPnEQwKAwueWEzSmpRdF", eventData: {id: "test2_item3", data: "item3-read"}}
      }
    }
  }
]

export default class Test2 extends Phaser.Scene {
  constructor () {
    super({key: 'Test2'})
  }

  preload() {
    // load map image
    this.load.image('test2', test2)
    this.load.image('desk', desk)
    this.load.image('sofa', sofa)

    // load npc+sami image+spritesheet
    this.load.image('victim_neutral', victim_neutral)
    this.load.image('suspect1_neutral', suspect1_neutral)
    this.load.image('suspect2_neutral', suspect2_neutral)
    this.load.image('suspect3_neutral', suspect3_neutral)
    this.load.image('inspector_neutral', inspector_neutral)
    this.load.image('applicant4_neutral', applicant4_neutral)
    this.load.spritesheet('suspect1_sprite', suspect1_sprite, { frameWidth: 5304 / 17, frameHeight: 492 })
    this.load.spritesheet('suspect2_sprite', suspect2_sprite, { frameWidth: 4844 / 17, frameHeight: 477 })
    this.load.spritesheet('suspect3_sprite', suspect3_sprite, { frameWidth: 5100 / 17, frameHeight: 468 })
    this.load.image('sami_neutral', sami_neutral)
    this.load.image('sami_sus', sami_sus)
    this.load.image('sami_smile', sami_smile)

    // load item image
    this.load.image('deadbody', deadbody)
    this.load.image('bookshelf', bookshelf)
    this.load.image('deskbook', deskbook)
    this.load.image('tea', tea)
    
    // sceneload plugin preload()
    this.sceneload.preload()
  }

  create(data) {
    // add background image + set world bound
    const background = this.add.image(200, 100, 'test2').setOrigin(0, 0).setScale(2)
    this.physics.world.setBounds(209, 100, background.width*2-18, background.height*2, true, true, true, true)

    // add obstacle image + adjust body
    const desk = this.physics.add.staticImage(200,100,'desk').setOrigin(0,0).setScale(2).setDepth(8)
    const sofa = this.physics.add.staticImage(200,100,'sofa').setOrigin(0,0).setScale(2).setDepth(9)
    sofa.body.x = 283, sofa.body.y = 770, sofa.body.setSize(585,205,false)

    this.add.existing(sofa)

    const colliders = [sofa]

    // create items 
    this.items = []
    items_JSON.forEach((item) => {
      this.items.push(new Item(
        this,
        item.id,
        item.x,
        item.y,
        item.name,
        item.scale,
        item.depth,
        item.texture,
        item.interact
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
      'main_zoom': 0.8,
      'mini_zoom': 0.15,
      'mini_scrollX': 400,
      'mini_scrollY': 600,
      'player_scale': 1.8
    }
    this.sceneload.create(colliders, this.items, this.npcs, camera_config, data)

    this.game.stage.mapEvent(this) // activate stage
    
    // check clue update
    if (!useGameStore().cluenote[1]) {
      // if Test2 clue not exist, play stage-start event
      const start_config = { 
        'start': {
          sceneKey: 'Test2',
          x: null,
          y: null,
          dialogue: [
            {
              image: "inspector_neutral",
              line: "두 번째 시험은 모의 수사다."
            },
            {
              image: "inspector_neutral",
              line: "사건에 대해 설명하겠다. 피해자의 이름은 김철수."
            },
            {
              image: "victim_neutral",
              line: "나이는 29세. 지병 없이 건강하고 건장한 체형이나 오늘 오후 자택에서 숨진채 발견되었다."
            },
            {
              image: "suspect2_neutral",
              line: "피해자를 가장 먼저 발견한 건 자택을 방문한 동생인 김현수."
            },
            {
              image: "inspector_neutral",
              line: "그 외에 사건 전후로 현장에 드나들었던 사람들은,"
            },
            {
              image: "suspect1_neutral",
              line: "오전 중에 피해자를 방문했던 친구, 박유신"
            },
            {
              image: "suspect3_neutral",
              line: "자택에서 일하는 가정부, 안연정이다."
            },
            {
              image: "inspector_neutral",
              line: "방 안을 조사하고 용의자들과 대화하여 사건의 전말을 밝히도록."
            },
            {
              image: "inspector_neutral",
              line: "비록 이 방은 가상의 사건을 재현한 공간이고, 용의자들은 연기자이나 실제 사건처럼 진지하게 임하길 바란다."
            },
            {
              image: "applicant4_neutral",
              line: "훗 이 정도는 너무 쉽군."
            },
            {
              image: "applicant4_neutral",
              line: "범인은 친구인 박유신이다!"
            },
            {
              image: "inspector_neutral",
              line: "근거는?"
            },
            {
              image: "applicant4_neutral",
              line: "뱀눈은 전형적인 범죄자상이지."
            },
            {
              image: "applicant4_neutral",
              line: "거기다 콧대와 콧방울이 얇아 자기 재산도 지키지 못 하는 상이군."
            },
            {
              image: "applicant4_neutral",
              line: "그렇다면 뻔하지. 피해자와 돈 문제 때문에 다투고 홧김에 죽인거야!"
            },
            {
              image: "applicant4_neutral",
              line: "10년간 관상을 봐온 내 경력이 확실히 증명한다!"
            },
            {
              image: "inspector_neutral",
              line: "...."
            },
            {
              image: "sami_neutral",
              line: "...."
            }
          ],
          event: { eventKey: "start", eventData: {data: "no-clue"} }
        }
      }
      this.events.emit('quiz-event', 'start', start_config)
    }

    // game-clear event
    this.events.on('game-clear', () => {
      // create game-clear dialogue
      // get cameraX + cameraY
      const cameraX = this.cameras.main.worldView.x, cameraY = this.cameras.main.worldView.y      
      const d_data = [
        {
          'image': 'sami_neutral',
          'line': '사건은 해결됐습니다!'
        },
        {
          'image': 'sami_neutral',
          'line': '범인은 피해자가 마신 냉커피의 얼음에 탈륨을 섞어, 얼음이 녹으면서 피해자가 치사량의 탈륨을 서서히 마시도록 만들었습니다.'
        },
        {
          'image': 'sami_neutral',
          'line': '그래서 피해자는 친구인 박유신이 떠날 때까지는 멀쩡할 수 있었던 겁니다.'
        },
        {
          'image': 'sami_neutral',
          'line': '그리고 이게 가능한 사람은 한 명뿐이죠.'
        },
        {
          'image': 'suspect3_neutral',
          'line': '바로 가정부인 안연정씨!'
        },
        {
          'image': 'suspect3_neutral',
          'line': '안연정씨는 친구인 박유신씨가 방문했을 때 피해자의 커피에 탈륨이 든 얼음을 넣었습니다.'
        },
        {
          'image': 'sami_neutral',
          'line': '얼음이 녹으면서 탈륨이 서서히 커피에 퍼졌기 때문에 피해자가 사망한 건 박유신씨가 떠난 다음이었죠.'
        },
        {
          'image': 'suspect1_neutral',
          'line': '얼음이 다 녹은 뒤에는 탈륨의 출처를 알 수 없으므로 안연정씨는 본인의 알리바이를 확보하는 동시에 박유신씨에게 의심이 가도록 만든 겁니다.'
        },
        {
          'image': 'inspector_neutral',
          'line': '일리있는 설명이군. 그렇다면 안연정의 살해 동기는?'
        },
        {
          'image': 'sami_neutral',
          'line': '안연정은 몇 개월째 임금을 못 받고 있습니다. 그게 살해동기입니다.'
        },
        {
          'image': 'suspect3_neutral',
          'line': '말도 안됩니다! 도련님을 죽인다고 없던 돈이 생겨나는 것도 아닌데 제가 왜 그러겠습니까!'
        },
        {
          'image': 'suspect2_neutral',
          'line': '피해자는 독신이기 때문에 죽으면 동생인 김현수씨에게 재산이 상속됩니다.'
        },
        {
          'image': 'sami_neutral',
          'line': '안연정씨는 집안 재산을 피해자가 아닌 김현수씨가 관리하게 되면 자신이 못 받은 월급을 받을 수 있게 되지않을까 하는 희망 때문에 피해자를 살해한 겁니다.'
        },
        {
          'image': 'suspect3_neutral',
          'line': '윽..'
        },
        {
          'image': 'suspect3_neutral',
          'line': '분하지만 인정할 수 밖에 없군요.'
        },
        {
          'image': 'suspect3_neutral',
          'line': '..맞습니다. 도련님이 가산을 탕진해 월급을 못 받은지도 벌써 몇 달째..'
        },
        {
          'image': 'suspect3_neutral',
          'line': '그간 일한 정이 있어 마지막까지 곁에 있으려 했지만..더이상은 도련님도 정신을 차리실 기미도 안 보이고, 생활도 점점 어려워져서'
        },
        {
          'image': 'suspect3_neutral',
          'line': '그만두겠다 말하면서 도련님께 다른 집으로 가서 일할 수 있도록 추천서를 부탁드렸건만..그마저도 거절하셨습니다.'
        },
        {
          'image': 'suspect3_neutral',
          'line': '오히려 그만두는 순간 자기가 절대 다른 일자리를 찾지 못 하도록 모든 수를 쓸거라고 하시니까 앞이 막막해져서 그만..'
        },
        {
          'image': 'inspector_smile',
          'line': '살해 방법과 살해 동기까지 맞히고, 심지어 범인의 자백까지 얻어내다니. 두 번째 시험도 통과다!'
        },
        {
          'image': 'sami_neutral',
          'line': '좋았어!'
        }
      ]
      const dialogue = new Dialogue(this, cameraX, cameraY, 0.9, undefined, d_data)
      dialogue.create(undefined)
      this.scene.events.emit('start-talking')
    })
  }

  update() {
    this.sceneload.update(this.items, this.npcs)

    this.npcs.forEach((npc) => {
      npc.anims.playAfterDelay({ key: 'front', repeat: Math.floor(Math.random()*5) }, 1000) 
    })
  }
}
