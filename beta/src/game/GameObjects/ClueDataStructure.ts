export type profile = {
  type: 'NPC'|'Item',
  name: string,
  id: string
}

export type event = {
  title: string,
  description: string,
  index: number,
  source?: profile,
  subClues: [ subClue? ]
}

export type subClue = {
  title: string,
  description: string,
  index: number,
  c_index: number,
  p_index: number,
  source?: profile,
  quiz_id: string,
  reveal: boolean,
  contradiction?: subClue
}

export type Clue = {
  title: string,
  description: string,
  index: number,
  source?: profile,
  subClues: { [key: number]: subClue|undefined },
  related?: {
    testimony: [ subClue? ],
    interrogation: [ profile? ]
  }
}

export type Investigation = {
  title: string,
  description: string,
  index: number,
  complete: boolean,
  i_scope: { scope: string, evidence: [ (subClue|event|Clue)? ] }[]|null,
  timeline: { [key: number]: event|null },
  clues: { [key: number]: Clue|null }
}