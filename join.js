const fs = require('fs');
var inspect = require('util').inspect;
const xml2js = require('xml2js');
const util = require('./util');
var builder = new xml2js.Builder();

var promise = new Promise((resolve, reject) => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/input/input-transducer.jff', function(err, data) {
        parser.parseString(data, function(err, transducer_T1) {

            resolve(transducer_T1);
        });
    })
}).then(transducer_T1 => {
    var parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
        var parser = new xml2js.Parser();
        fs.readFile(__dirname + '/input/input-transducer.jff', function(err, data) {
            parser.parseString(data, function(err, transducer_T2) {
                let transducers = [transducer_T1, transducer_T2];
                var transitionArray_T1 = transducers[0].structure.automaton[0].transition //return an array
                var stateArray_T1 = transducers[0].structure.automaton[0].state;
                var transitionArray_T2 = transducers[1].structure.automaton[0].transition //return an array
                var stateArray_T2 = transducers[1].structure.automaton[0].state;

                var input_T1 = {
                    Q: util.toMonoArray(stateArray_T1),
                    Sigma_x_Sigma: util.sigma_x_sigma([0, 1]),
                    Transition: util.transitions(transitionArray_T1),
                    Q0: util.initial_state(stateArray_T1),
                    F: util.final_state(stateArray_T1)
                }

                var input_T2 = {
                    Q: util.toMonoArray(stateArray_T2),
                    Sigma_x_Sigma: util.sigma_x_sigma(transitionArray_T2),
                    Transition: util.transitions(transitionArray_T2),
                    Q0: util.initial_state(stateArray_T2),
                    F: util.final_state(stateArray_T2)
                }
                let output = join(input_T1, input_T2);
                output = util.toDFA(output, ['0,1', '1,0', '0,0', '1,1']);
                output = util.removeUnreachableState(output);
                output = util.toEquivalentClasses(output, ['0,1', '1,0', '0,0', '1,1']);
                resolve(output);
            })

        });
    })



})

var join = (transducer_T1, transducer_T2) => {
    let _Q = [];
    let _transition = [];
    let _F = [];
    let _Q0 = [
        [transducer_T1.Q0[0], transducer_T2.Q0[0]]
    ];
    let W = [];
    W.push(_Q0[0]);
    while (W.length !== 0) {
        let w1 = W[W.length - 1];
        W.pop();
        _Q.push(w1);
        if (transducer_T1.F.includes(w1[0] + '') && transducer_T2.F.includes(w1[1] + '')) {
            _F.push(w1);
        }
        for (let transition_T1 of transducer_T1.Transition) {
            for (let transition_T2 of transducer_T2.Transition) {
                if ((transition_T1.read[1] + '' == transition_T2.read[0] + '') && (transition_T1.from + '' == w1[0] + '') && (transition_T2.from + '' == w1[1] + '')) { //neu co chung c
                    _transition.push({
                        from: [transition_T1.from, transition_T2.from],
                        to: [transition_T1.to, transition_T2.to],
                        read: [transition_T1.read[0], transition_T2.read[1]]
                    });
                    if (!util.includesSubArray([transition_T1.to, transition_T2.to], _Q)) {
                        W.push(
                            [transition_T1.to + '', transition_T2.to + '']
                        )
                    }
                }
            }

        }
    }

    let _input = {
        Q: util.checkDuplicate(_Q),
        Sigma_x_Sigma: transducer_T1.Sigma_x_Sigma,
        Transition: _transition,
        Q0: _Q0,
        F: util.checkDuplicate(_F)
    }

    let goal_F = util.padClosure(_input, [0, 0]);
    let _inputt = {
        Q: util.checkDuplicate(_Q),
        Sigma_x_Sigma: transducer_T1.Sigma_x_Sigma,
        Transition: _transition,
        Q0: _Q0,
        F: util.checkDuplicate(goal_F)
    }

    let output = util.processJoin(_inputt);
    return output;
}

module.exports = promise;