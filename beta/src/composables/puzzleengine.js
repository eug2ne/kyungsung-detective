import _ from 'lodash'
import mergelist from '../assets/loadlists/valid_mergewordlist.json'

export const tdShowArray = (w, h, cwData) => {
  // return td-show
    // array of boolean for coord in each data
  const show_array = Object.values(cwData.data).map((data) => {
    const show = (data.type === 'horizontal') ?
      (data.config.start_pos.y === h-1&&(data.config.start_pos.x-1 <= w-1&&w-1 <= data.config.end_pos.x+1))
      : (data.config.start_pos.x === w-1&&(data.config.start_pos.y-1 <= h-1&&h-1 <= data.config.end_pos.y+1))

    return show
  })

  return show_array
}

export const tdData = (w, h, cwData) => {
  // return td-index, data for coord
    // if coord in data, return data_id, td-index (-1~data.letter_list.length-1)
    // else return undefined
  const show_array = tdShowArray(w, h, cwData)

  const data_id = show_array.indexOf(true) // id of data that includes coord
  if (data_id < 0) return // coord not included in crossword data, return undefined

  const data = cwData.data[data_id]
  const td_index = (data.type === 'horizontal') ?
    w-1-data.config.start_pos.x : h-1-data.config.start_pos.y

  return { id: data_id, td_index: td_index }
}

export const showMerge = (data, i) => {
  // if letter is adjacent to mergable letter, show merge
  const space_letter = data.letter_list[i]
  if (!space_letter) return [false, false] // space empty
  else if (data.first_abbr&&i === 0) return [false, false] // space non-interactable

  let left_letter = undefined // default value
  let right_letter = undefined // default value

  if (data.first_abbr&&i === 1) {
    right_letter = data.letter_list[i+1]
  } else {
    left_letter = data.letter_list[i-1]
    right_letter = data.letter_list[i+1]
  }
  const left_merge = mergelist.valid[space_letter] ?
    mergelist.valid[space_letter].includes(left_letter) : false
  const right_merge = mergelist.valid[space_letter] ?
    mergelist.valid[space_letter].includes(right_letter) : false
  
  const valid_merge = [`${i-1},${i}`, `${i},${i+1}`]
    .filter((ele, index) => {
      return [left_merge, right_merge][index]
    })
  return valid_merge
}

const addPointMergeHistory = (history, merge_info) => {
  // add new merge-info only when direction different with existing merge-info
  if (history.find(ele => ele.direction === merge_info.direction)) return

  history.push(merge_info)
}

export const mergeLetter = (cwData, data, merge) => {
  // merge adjacent letters
  // check point
  let point = undefined
  if (merge.split(',').includes(`${data.point.index}`)) {
    const data_index = data.point.to
    point = cwData.data[data_index]
  }
  // find merge-letter
  const merge_index = parseInt(merge.split(',')[0])
  const left_letter = data.letter_list[merge_index]
  const right_letter = data.letter_list[merge_index+1]
  const merge_string = `${left_letter},${right_letter}`
  const merge_letter = mergelist.merge[merge_string]

  // assign merge letter to left/top space + delete letter from right/bottom space
  data.letter_list.splice(merge_index, 2, merge_letter)
  // adjust cwData.config, data.config
  cwData.config.total_space.c_value -= 1
  data.length.c_value -= 1
  if (merge_index <= data.point.index) {
    // delete space from left/top
    data.type === 'horizontal' ?
      cwData.config.width.left -= 1 : cwData.config.height.top -= 1
    data.type === 'horizontal' ?
      data.config.start_pos.x += 1 : data.config.start_pos.y += 1
    data.point.index -= 1 // adjust point.index
  } else {
    // delete space from right/bottom
    data.type === 'horizontal' ?
      cwData.config.width.right -= 1 : cwData.config.height.bottom -= 1
    data.type === 'horizontal' ?
      data.config.end_pos.x -= 1 : data.config.end_pos.y -= 1
  }

  if (point) {
    // merge on center space
    // assign merge letter to point
    const point_i = point.point.index
    point.letter_list[point_i] = merge_letter
    
    // add merge-info to history
    const merge_dir = (merge_index === data.point.index) ?
      (data.type === 'horizontal' ? 'left' : 'top') : (data.type === 'horizontal' ? 'right' : 'bottom')
    addPointMergeHistory(cwData.point_merge_history, { d_index: data.id, direction: merge_dir, merge_letter: merge_letter })
  }

  // delete merge in merge-list
  data.merge_list = data.merge_list.filter((merge) => {
    return !(merge.split(',').includes(`${merge_index}`)||merge.split(',').includes(`${merge_index+1}`))
  })
  // adjust merge in merge-list
  data.merge_list.forEach((ele, index) => {
    const e_m_index = parseInt(ele.split(',')[0])
    if (e_m_index < merge_index) return
    // replace merge with adjusted version
    data.merge_list[index] = `${e_m_index-1},${e_m_index}`
  })

  // check valid merge on new data
  const valid_merges = showMerge(data, merge_index)
  // add to merge-list
  data.merge_list = data.merge_list.concat(valid_merges)
  
  // delete merge + check new valid merge on point
  if (point) {
    const point_i = point.point.index
    point.merge_list = point.merge_list.filter((merge) => {
      return !merge.split(',').includes(`${point_i}`)
    }) // delete merge
    if (point.letter_list[point_i]) {
      const valid_merges = showMerge(point, point_i)
      // add to merge-list
      valid_merges.forEach((merge) => {
        // check redundancy
        if (point.merge_list.includes(merge)) return
        point.merge_list.push(merge)
      })
    }
  }
}

export const deleteLetter = (cwData, data, i) => {
  // delete letter
  if (!data.letter_list[i]) return
  else if (data.first_abbr&&i === 0) return

  // check point
  let point = undefined
  if (i === data.point.index) {
    const data_index = data.point.to
    point = cwData.data[data_index]
  }

  // check merge on index
  const merge_bool = Object.values(mergelist.merge).includes(data.letter_list[i])
  if (merge_bool) {
    // check point
    if (point) {
      // restore all merged cell on point
      cwData.point_merge_history.forEach((merge_info) => {
        // adjust cwData.config
        cwData.config.total_space.c_value += 1
        
        // adjust data.config
        const { d_index, direction } = merge_info
        const m_data = cwData.data[d_index]
        const p_index = m_data.point.index
        // check length.o_value
        if (m_data.length.c_value < m_data.length.o_value) {
          m_data.length.c_value += 1
          if (direction === 'left') {
            // add cell to left side
            m_data.letter_list.splice(p_index-1, 1, '', '')
            cwData.config.width.left += 1
            m_data.config.start_pos.x -= 1
            m_data.point.index += 1 // adjust point.index
          } else if (direction === 'right') {
            // add cell to right side
            m_data.letter_list.splice(p_index, 1, '', '')
            cwData.config.width.right += 1
            m_data.config.end_pos.x += 1
          } else if (direction === 'top') {
            // add cell to top side
            m_data.letter_list.splice(p_index-1, 1, '', '')
            cwData.config.height.top += 1
            m_data.config.start_pos.y -= 1
            m_data.point.index += 1 // adjust point.index
          } else if (direction === 'bottom') {
            // add cell to bottom side
            m_data.letter_list.splice(p_index, 1, '', '')
            cwData.config.height.bottom += 1
            m_data.config.end_pos.y += 1
          }
        } 
      })
    } else {
      // restore merged cell
      data.letter_list.splice(i, 1, '', '')
      
      // adjust cwData.config, data.config
      cwData.config.total_space.c_value += 1
      data.length.c_value += 1
      if (i <= data.point.index) {
        // add cell to left/top side
        data.type === 'horizontal' ?
        cwData.config.width.left += 1 : cwData.config.height.top += 1
        data.type === 'horizontal' ?
          data.config.start_pos.x -= 1 : data.config.start_pos.y -= 1
        data.point.index += 1 // adjust point.index
      } else {
        // add cell to right/bottom side
        data.type === 'horizontal' ?
          cwData.config.width.right += 1 : cwData.config.height.bottom += 1
        data.type === 'horizontal' ?
          data.config.end_pos.x += 1 : data.config.end_pos.y += 1
      }
    }
  } else {
    // delete letter from cell
    data.letter_list.splice(i, 1, '')
    if (point) {
      // delete letter from point
      point.letter_list.splice(point.point.index, 1, '')
    }
  }

  // adjust+delete merge-list
  if (merge_bool) {
    // delete merge on all restored space
    data.merge_list = data.merge_list.filter((merge) => {
      return !(merge.split(',').includes(`${i}`)||merge.split(',').includes(`${i+1}`))
    })
    data.merge_list.forEach((merge, index) => {
      if (parseInt(merge.split(',')[0]) > i) {
        // adjust merge
        const m = parseInt(merge.split(',')[0])
        data.merge_list[index] = `${m+1},${m+2}`
      }
    })
  } else {
    // delete merge on all deleted space
    data.merge_list = data.merge_list.filter((merge) => {
      return !merge.split(',').includes(`${i}`)
    })
    if (point) {
      // delete merge on all deleted space in point
      point.merge_list = point.merge_list.filter((merge) => {
        return !merge.split(',').includes(`${point.point.index}`)
      })
    }
  }
}

export const resetCrossWord = (cwData, data) => {
  // reset cwData.config, data.config
  cwData.config.width.left = cwData.config.width.o_left, cwData.config.width.right = cwData.config.width.o_right
  cwData.config.height.top = cwData.config.height.o_top, cwData.config.height.bottom = cwData.config.height.o_bottom
  cwData.config.total_space.c_value = cwData.config.total_space.o_value
  
  // reset data
  if (data.first_abbr) {
    // leave out first letter in letter-list
    const first_abbr = data.letter_list[0]
    data.letter_list = [first_abbr]
  } else {
    data.letter_list = []
  } // reset letter-list
  data.merge_list = [] // reset merge-list
  data.correct = false
  // reset data.config
  data.length.c_value = data.length.o_value
  data.config.start_pos.x = data.config.start_pos.o_x, data.config.start_pos.y = data.config.start_pos.o_y
  data.config.end_pos.x = data.config.end_pos.o_x, data.config.end_pos.y = data.config.end_pos.o_y
  data.point.index = data.point.o_index

  // delete point value
  const point = cwData.data[data.point.to]
  point.letter_list.splice(point.point.index, 1, '')
  // delete point merge
  point.merge_list = point.merge_list.filter((merge) => {
    return !merge.split(',').includes(`${point.point.index}`)
  })
}

export const checkAnswer = (cwData, id, p_bool) => {
  // check answer for given row, column
  const data = cwData.data[id]
  const answer_data = cwData.answer[id]

  const correct = _.isEqual(data.letter_list, answer_data.letter_list) && data.length.c_value === answer_data.length
  data.correct = correct

  if (p_bool) {
    // check answer for point
    const point = cwData.data[data.point.to]
    const p_answer_data = cwData.answer[point.id]

    const p_correct = _.isEqual(point.letter_list, p_answer_data.letter_list) && point.length.c_value === p_answer_data.length
    point.correct = p_correct
  }
}