import { ref } from 'vue'
import _ from 'lodash'

const backforth = () => {
    const pastSet = ref([])
    const updatepastSet = (set) => {
        const beforeupdate = _.cloneDeep(set)

        // pastSet max_length == 5
        if (pastSet.value.length == 5) {
          pastSet.value[0] = pastSet.value[1]
          pastSet.value[1] = pastSet.value[2]
          pastSet.value[2] = pastSet.value[3]
          pastSet.value[3] = pastSet.value[4]
          pastSet.value[4] = beforeupdate
        } else {
          pastSet.value.push(beforeupdate)
        }
    }

    const forwardSet = ref([])
    const updateforwardSet = (set) => {
        const afterupdate = _.cloneDeep(set)

        // pastSet max_length == 5
        if (forwardSet.value.length == 5) {
          forwardSet.value[0] = forwardSet.value[1]
          forwardSet.value[1] = forwardSet.value[2]
          forwardSet.value[2] = forwardSet.value[3]
          forwardSet.value[3] = forwardSet.value[4]
          forwardSet.value[4] = afterupdate
        } else {
          forwardSet.value.push(afterupdate)
        }
    }

    // back func
    const back = () => {
        try {
            updateforwardSet(pastSet.value[pastSet.value.length])
            return pastSet.value.pop()
        } catch (error) {
            console.log('out of index')
        }
    }

    // forward func
    const forward = () => {
        try {
            updatepastSet(forwardSet.value[forwardSet.value.length])
            return forwardSet.pop()
        } catch (error) {
            console.log('out of index')
        }
    }

    return { pastSet, forwardSet, updatepastSet, updateforwardSet, back, forward }
}

export default backforth