import _ from 'lodash'

const backforth = () => {
    const updatepastSet = (pastSet, set) => {
        const beforeupdate = _.cloneDeep(set)
        pastSet.push(beforeupdate)

        // pastSet max_length == 5
        if (pastSet.length > 5) {
            pastSet.splice(0,1)
        } else {
            // pass
        }
    }

    const updateforwardSet = (forwardSet, set) => {
        const afterupdate = _.cloneDeep(set)
        forwardSet.push(afterupdate)

        // forwardSet max_length == 5
        if (forwardSet.length > 5) {
            forwardSet.splice(0,1)
        } else {
            // pass
        }
    }

    // back func
    const back = (pastSet, forwardSet, set) => {
        // set: present set
        const before = pastSet.pop()
        updateforwardSet(forwardSet, set)
        return before
    }

    // forward func
    const forward = (pastSet, forwardSet, set) => {
        // set: present set
        const after = forwardSet.pop()
        updatepastSet(pastSet, set)
        return after
    }

    return { updatepastSet, updateforwardSet, back, forward }
}

export default backforth