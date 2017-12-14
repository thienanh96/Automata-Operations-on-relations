var inspect = require('util').inspect;
const util = {};
util.sigma_x_sigma = (sigmaSet) => {
    return [sigmaSet, sigmaSet]
}

util.transitions = (transitionArray) => {
    let newTransition = [];
    transitionArray.forEach(transition => {
        newTransition.push({
            from: transition.from,
            to: transition.to,
            read: (transition.read + '').split(',')
        })
    })
    return newTransition;
}

util.initial_state = (stateArray) => {
    for (let i = 0; i < stateArray.length; i++) {
        if (stateArray[i].initial) {
            return [stateArray[i]['$'].id + '']
        }
    }
}

util.final_state = (stateArray) => {
    let finalStateArray = [];
    for (let i = 0; i < stateArray.length; i++) {
        if (stateArray[i].final) {
            finalStateArray.push(stateArray[i]['$'].id + '')
        }
    }
    return finalStateArray;
}
util.searchStateById = (id, stateArray) => {
    for (let state of stateArray) {
        if (state[0]) {
            if (util.isEquivalentArray(id, util.toMonoArray([state[0]]))) {
                return state[0]
            }
        } else {
            if (state['$'].id + '' === id + '') {
                return state;
            }
        }

    }
}

util.checkDuplicate = (array) => {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        let flag = true;
        for (let j = 0; j < i; j++) {
            if (array[i]['$']) {
                if (array[j]['$'].id + '' === array[i]['$'].id + '') {
                    flag = false
                }
            } else {
                if (array[j] + '' === array[i] + '') {
                    flag = false
                }
            }

        }
        if (flag) {
            newArray.push(array[i]);
        }
    }
    return newArray
}



util.toMonoArray = (array, toString) => {
    let monoArray = [];
    for (let elem of array) {
        if (elem[0]) {
            let subMonoArray = [];
            for (let subElem of elem) {
                subMonoArray.push(subElem['$'].id + '');
            }
            if (toString) {
                monoArray.push(subMonoArray.join(''));
            } else {
                monoArray.push(subMonoArray);
            }

        } else {
            monoArray.push(elem['$'].id + '')
        }


    }
    return monoArray;
}

util.inspect2array = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] + '' !== array2[i] + '') {
            return false;
        }
    }
    return true;
}

util.inspect2arrayAcross = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (!array2.includes(array1[i] + '')) {
            return false;
        }
    }
    return true;
}

util.includesSubArray = (elemToSearch, array, combineCheck) => {
    for (let elem of array) {
        if (combineCheck === true) {
            if (util.inspect2arrayAcross(elem, elemToSearch)) {
                return true;
            }
        } else {
            if (util.inspect2array(elem, elemToSearch)) {
                return true;
            }
        }

    }
    return false;

}


util.processJoin = (input) => {
    let holdArray = [];
    let index = 0;
    for (let i = 0; i < input.Q.length; i++) {
        holdArray.push({
            oldId: input.Q[i].join(','),
            newId: index + ''
        })
        input.Q[i] = {
            '$': {
                id: index + '',
                name: input.Q[i].join(','),
            }
        }
        index++;
    }

    for (let i = 0; i < input.F.length; i++) {
        for (let elem of holdArray) {
            if (elem.oldId + '' === input.F[i].join(',')) {
                input.F[i] = {
                    '$': {
                        id: elem.newId,
                        name: elem.oldId
                    }
                }
                break;
            }
        }
    }

    for (let i = 0; i < input.Q0.length; i++) {
        for (let elem of holdArray) {
            if (elem.oldId + '' === input.Q0[i].join(',')) {
                input.Q0[i] = {
                    '$': {
                        id: elem.newId,
                        name: elem.oldId
                    }
                }
                break;
            }
        }
    }

    for (let transition of input.Transition) {
        transition.read = transition.read + ''
        for (let elem of holdArray) {
            if (elem.oldId + '' === transition.from + '') {
                transition.from = elem.newId;

            }
            if (elem.oldId + '' === transition.to + '') {
                transition.to = elem.newId;

            }
        }
    }



    for (let state of input.Q) {
        for (let fstate of input.F) {
            if (state['$'].id + '' === fstate['$'].id + '') {
                Object.assign(state, { final: '' })
            }
        }
    }

    for (let state of input.Q) {
        for (let istate of input.Q0) {
            if (state['$'].id + '' === istate['$'].id + '') {
                Object.assign(state, { initial: '' })
            }
        }
    }
    return input;
}

util.processProj = (input) => {
    for (let i = 0; i < input.Q.length; i++) {
        input.Q[i] = {
            '$': {
                id: input.Q[i] + '',
                name: input.Q[i] + ''
            }
        }
    }

    for (let i = 0; i < input.F.length; i++) {
        input.F[i] = {
            '$': {
                id: input.F[i] + '',
                name: input.F[i] + ''
            }
        }
    }

    for (let i = 0; i < input.Q0.length; i++) {
        input.Q0[i] = {
            '$': {
                id: input.Q0[i] + '',
                name: input.Q0[i] + ''
            }
        }
    }
    for (let state of input.Q) {
        for (let fstate of input.F) {
            if (state['$'].id + '' === fstate['$'].id + '') {
                Object.assign(state, { final: '' })
            }
        }
    }

    for (let state of input.Q) {
        for (let istate of input.Q0) {
            if (state['$'].id + '' === istate['$'].id + '') {
                Object.assign(state, { initial: '' })
            }
        }
    }
    for (let transition of input.Transition) {
        transition.read = transition.read + ''
        transition.to = transition.to + '';
        transition.from = transition.from + ''
    }
    return input
}


util.searchTransitionFrom = (transitionArray, from) => {
    let array = [];
    for (let transition of transitionArray) {
        if (transition.from + '' === from + '') {
            array.push(transition.to + '');
        }
    }
    return array;
}

util.searchTransitionReadAndFrom = (transitionArray, from, read) => {
    let array = [];
    for (let transition of transitionArray) {
        if (transition.from + '' === from + '' && transition.read + '' === read + '') {
            array.push(transition.to + '');
        }
    }
    return array;
}

util.checkAllElemExistInArray = (array1, array2) => {
    let flag = true;
    for (let elem of array2) {
        if (!array1.includes(elem + '')) {
            flag = false;
        }
    }
    return flag;
}

util.removeUnreachableState = (input) => {
    let reachableState = util.toMonoArray(input.Q0);
    let transitionArray = input.Transition;
    let stateArray = input.Q;

    for (let i = 0; i < reachableState.length; i++) {
        let currentTo = util.searchTransitionFrom(
            transitionArray,
            reachableState[i] + ''
        );
        if (!util.checkAllElemExistInArray(reachableState, currentTo)) {
            reachableState.push(...currentTo);
        }
    }
    let filteredTransition = transitionArray.filter(transition => {
        return reachableState.includes(transition.from + '') && reachableState.includes(transition.to + '');
    });
    let filteredState = stateArray.filter(state => {
        return reachableState.includes(state['$'].id + '')
    })
    return {
        Q: filteredState,
        Sigma_x_Sigma: input.Sigma_x_Sigma,
        Transition: filteredTransition,
        Q0: input.Q0,
        F: input.F
    }
}

util.toEquivalentClasses = (input, sigma_x_sigma) => {
    let finalState = util.toMonoArray(input.F);
    let restState = [];
    util.toMonoArray(input.Q).forEach(state => {
        if (!finalState.includes(state)) {
            restState.push(state);
        }
    });
    let equivalentStateArray = [];
    let nextEquivalentStateArray = [];

    equivalentStateArray.push(finalState);
    equivalentStateArray.push(restState);
    let currentStateArray = equivalentStateArray;
    while (true) {
        nextEquivalentStateArray = [];
        for (let index = 0; index < currentStateArray.length; index++) {
            for (let i = 0; i < currentStateArray[index].length; i++) {
                for (let j = i + 1; j < currentStateArray[index].length; j++) {
                    let p = currentStateArray[index][i];
                    let q = currentStateArray[index][j];

                    if (util.checkSecondConditionLemma(p, q, input, sigma_x_sigma, currentStateArray)) {

                        nextEquivalentStateArray.push([p + '', q + '']);
                    }

                }
            }
        }
        if (nextEquivalentStateArray.length === currentStateArray.length) break;
        currentStateArray = nextEquivalentStateArray;

    }
    for (let i = 0; i < nextEquivalentStateArray.length; i++) {
        for (let j = i + 1; j < nextEquivalentStateArray.length; j++) {
            if (util.haveTwoEquivalentElement(nextEquivalentStateArray[i], nextEquivalentStateArray[j])) {
                nextEquivalentStateArray[i].push(...nextEquivalentStateArray[j]);
                nextEquivalentStateArray.splice(j, 1);
                j--;
            }
        }
    }
    // nextEquivalentStateArray = util.checkDuplicate(nextEquivalentStateArray);
    for (let i = 0; i < nextEquivalentStateArray.length; i++) {
        nextEquivalentStateArray[i] = util.checkDuplicate(nextEquivalentStateArray[i]);
    }
    // Merge equivalent states//
    let oldQ = input.Q;
    let newIndex = oldQ.length;
    for (let mergeStates of nextEquivalentStateArray) {
        let tempArray = [];
        for (let elem of mergeStates) {
            tempArray.push(util.searchStateById(elem + '', oldQ)['$'].name)
        }
        input.Q = input.Q.filter(state => {
            return !mergeStates.includes(state['$'].id + '')
        })
        input.Q.push({
            '$': {
                id: newIndex + '',
                name: tempArray.join(' merge ')
            }
        });
        newIndex++;
    }
    for (let mergeStates of nextEquivalentStateArray) {
        let tempArray = [];
        for (let elem of mergeStates) {
            tempArray.push(util.searchStateById(elem + '', oldQ)['$'].name)
        }
        let newId = util.searchStateByName(tempArray.join(' merge '), input.Q)['$'].id;
        for (let finalState of input.F) {
            if (mergeStates.includes(finalState['$'].id + '')) {
                finalState['$'].id = newId;
                finalState['$'].name = tempArray.join(' merge ');
            }
        }
        for (let initialState of input.Q0) {
            if (mergeStates.includes(initialState['$'].id + '')) {
                initialState['$'].id = newId;
                initialState['$'].name = tempArray.join(' merge ');
            }
        }
        input.Transition.forEach(transition => {
            if (mergeStates.includes(transition.from + '')) {
                transition.from = newId;
            }
            if (mergeStates.includes(transition.to + '')) {
                transition.to = newId;
            }

        });

    }

    input.F = util.checkDuplicate(input.F);
    input.Q0 = util.checkDuplicate(input.Q0);
    for (let stateQ of input.Q) {
        if (util.toMonoArray(input.F).includes(stateQ['$'].id + '')) {
            Object.assign(stateQ, {
                final: ''
            })
        }
        if (util.toMonoArray(input.Q0).includes(stateQ['$'].id + '')) {
            Object.assign(stateQ, {
                initial: ''
            })
        }
    }
    return {
        Q: input.Q,
        Sigma_x_Sigma: input.Sigma_x_Sigma,
        Transition: input.Transition,
        Q0: input.Q0,
        F: input.F
    }


}

util.searchStateByName = (name, Q) => {
    for (let state of Q) {
        if (state['$'].name + '' === name + '') {
            return state
        }
    }
}

util.haveTwoEquivalentElement = (array1, array2) => {
    for (let elem of array1) {
        if (array2.includes(elem + '')) {
            return true;
        }
    }
    for (let elem of array2) {
        if (array1.includes(elem + '')) {
            return true;
        }
    }
    return false;
}

util.processMinimize = (input, finalStates, initialStates, sigma_x_sigma) => {
    let holdArray = [];
    let index = 0;
    let DFA = {
        Q: [],
        Sigma_x_Sigma: [],
        Transition: [],
        Q0: [],
        F: []
    };
    for (let i = 0; i < input.state.length; i++) {
        holdArray.push({
            oldId: input.state[i] + '',
            newId: index + ''
        })
        DFA.Q.push({
            '$': {
                id: index + '',
                name: input.state[i] + '',
            }
        })
        for (let finalstate of finalStates) {
            if (input.state[i].includes(finalstate + '')) {
                Object.assign(DFA.Q[i], {
                    final: ''
                });
            }
        }
        for (let initialstate of initialStates) {
            if (input.state[i] + '' === initialstate) {
                Object.assign(DFA.Q[i], {
                    initial: ''
                })
            }
        }

        index++;
    }
    DFA.F.push(...DFA.Q.filter(elem => {
        return elem.final !== undefined
    }))
    DFA.Q0.push(...DFA.Q.filter(elem => {
        return elem.initial !== undefined
    }))
    for (let letter of sigma_x_sigma) {
        for (let i = 0; i < input['transition_' + letter].length; i++) {
            if (input['transition_' + letter][i].length === 0) continue;
            DFA.Transition.push({
                from: DFA.Q.filter(elem => {
                    return util.inspect2arrayAcross(elem['$'].name.split(','), input.state[i])
                })[0]['$'].id,
                to: DFA.Q.filter(elem => {
                    return util.inspect2arrayAcross(elem['$'].name.split(','), input['transition_' + letter][i])
                })[0]['$'].id,
                read: letter + ''
            })
        }
    }
    return DFA;
}

util.toDFA = (input, sigma_x_sigma) => {
    let NFATableState = {
        state: util.toMonoArray(input.Q)
    }
    for (let letter of sigma_x_sigma) {
        let collumnStateArr = [];
        for (let NFAstate of NFATableState.state) {
            let nextState = util.searchTransitionReadAndFrom(input.Transition, NFAstate + '', letter + '');
            collumnStateArr.push(nextState);
        }
        Object.assign(NFATableState, {
            ['transition_' + letter]: collumnStateArr
        })


    }
    let DFATableState = {
        state: [util.toMonoArray(input.Q0)]
    }
    for (let letter of sigma_x_sigma) {
        Object.assign(DFATableState, {
            ['transition_' + letter]: []
        })
    }
    for (let DFAStateArr of DFATableState.state) {
        for (let letter of sigma_x_sigma) {
            let tempArray = [];
            for (let elem of DFAStateArr) {
                let nextState = util.searchTransitionReadAndFrom(input.Transition, elem + '', letter + '');
                tempArray.push(...nextState);
            }
            tempArray = util.checkDuplicate(tempArray);
            DFATableState['transition_' + letter].push(tempArray);
            if (!util.includesSubArray(tempArray, DFATableState.state, true) && tempArray.length !== 0) {
                DFATableState.state.push(tempArray);
            }
        }
    }
    let DFA = util.processMinimize(DFATableState, util.toMonoArray(input.F), util.toMonoArray(input.Q0), sigma_x_sigma);

    return DFA;

}

util.checkSecondConditionLemma = (p, q, input, sigma_x_sigma, equivalentStateArray) => {
    let flag = true;
    for (let sg_x_sg of sigma_x_sigma) {
        let nextStateArr = [];
        for (let transition of input.Transition) {
            if (transition.from + '' === p && transition.read + '' === sg_x_sg) {
                nextStateArr.push(transition.to + '');
            }
            if (transition.from + '' === q && transition.read + '' === sg_x_sg) {
                nextStateArr.push(transition.to + '');
            }
        }
        if (!util.belongToOneClass(nextStateArr[0] + '', nextStateArr[1] + '', equivalentStateArray)) {
            flag = false;
        }
    }
    return flag;
}

util.belongToOneClass = (a, b, equivalentStateArray) => {
    for (let array of equivalentStateArray) {
        if (array.includes(a) && array.includes(b)) {
            return true;
        }
    }
    return false;
}





util.isEquivalentArray = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] + '' !== array2[i] + '') {
            return false;
        }
    }
    return true;
}


util.padClosure = (A, dem) => { //for Proj_1 
    let W = A.F;
    let goal_F = [];
    while (W.length !== 0) {
        let q = W[W.length - 1]; //pick q from W
        W.pop();
        goal_F.push(q);
        A.Transition.forEach(transition => {
            if (util.isEquivalentArray(transition.read, dem) && util.isEquivalentArray(transition.to, q)) {
                let _q = transition.from;
                if (!util.includesSubArray(_q, goal_F, false)) {
                    W.push(_q);
                }
            }
        })
    }
    return goal_F;
}

module.exports = util;