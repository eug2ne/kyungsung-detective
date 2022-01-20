import _ from 'lodash'

const backforth = () => {
    const updatepastSet = (pastSet, set) => {
        const beforeupdate = _.cloneDeep(set)

        // pastSet max_length == 5
        if (pastSet.length == 5) {
          pastSet[0] = pastSet[1]
          pastSet[1] = pastSet[2]
          pastSet[2] = pastSet[3]
          pastSet[3] = pastSet[4]
          pastSet[4] = beforeupdate
        } else {
          pastSet.push(beforeupdate)
        }
    }

    const updateforwardSet = (forwardSet, set) => {
        const afterupdate = _.cloneDeep(set)

        // pastSet max_length == 5
        if (forwardSet.length == 5) {
          forwardSet[0] = forwardSet[1]
          forwardSet[1] = forwardSet[2]
          forwardSet[2] = forwardSet[3]
          forwardSet[3] = forwardSet[4]
          forwardSet[4] = afterupdate
        } else {
          forwardSet.push(afterupdate)
        }
    }

    // back func
    const back = (pastSet) => {
        try {
            updateforwardSet(pastSet[pastSet.length])
            return pastSet.pop()
        } catch (error) {
            console.log('out of index')
        }
    }

    // forward func
    const forward = (forwardSet) => {
        try {
            updatepastSet(forwardSet[forwardSet.length])
            return forwardSet.pop()
        } catch (error) {
            console.log('out of index')
        }
    }

    return { updatepastSet, updateforwardSet, back, forward }
}

export default backforth