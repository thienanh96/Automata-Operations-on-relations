const fs = require('fs');
var inspect = require('util').inspect;
const xml2js = require('xml2js');
const util = require('./util');



var promise_1 = new Promise((resolve, reject) => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/input/input-transducer.jff', function(err, data) {
        parser.parseString(data, function(err, result) {
            resolve(result);
        });
    });
}).then(result => {
    var transitionArray = result.structure.automaton[0].transition //return an array
    var stateArray = result.structure.automaton[0].state;
    var input = {
        Q: util.toMonoArray(stateArray),
        Sigma_x_Sigma: util.sigma_x_sigma(['0', '1']),
        Transition: util.transitions(transitionArray),
        Q0: util.initial_state(stateArray),
        F: util.final_state(stateArray)
    }
    let output = proj(input, 1);
    output = util.toDFA(output, ['0', '1']);
    output = util.removeUnreachableState(output, ['0', '1']);
    output = util.toEquivalentClasses(output, ['0', '1']);
    return Promise.resolve(output);

})

var promise_2 = new Promise((resolve, reject) => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/input/input-transducer.jff', function(err, data) {
        parser.parseString(data, function(err, result) {
            resolve(result);
        });
    });
}).then(result => {
    var transitionArray = result.structure.automaton[0].transition //return an array
    var stateArray = result.structure.automaton[0].state;
    var input = {
        Q: util.toMonoArray(stateArray),
        Sigma_x_Sigma: util.sigma_x_sigma(['0', '1']),
        Transition: util.transitions(transitionArray),
        Q0: util.initial_state(stateArray),
        F: util.final_state(stateArray)
    }
    let output = proj(input, 2);
    output = util.toDFA(output, ['0', '1']);
    output = util.removeUnreachableState(output, ['0', '1']);
    output = util.toEquivalentClasses(output, ['0', '1']);
    return Promise.resolve(output);

})


var proj = (input, component) => {
    let _Q = input.Q;
    let _Q0 = [];
    _Q0.push(input.Q0[0]);
    let _F = input.F;
    let _transition = [];
    for (let transition of input.Transition) {
        if (component + '' === '1') {
            _transition.push({
                from: transition.from,
                to: transition.to,
                read: transition.read[0]
            });
        } else if (component + '' === '2') {
            _transition.push({
                from: transition.from,
                to: transition.to,
                read: transition.read[1]
            });
        }

    }
    let _input = {
        Q: _Q,
        Sigma_x_Sigma: input.Sigma_x_Sigma,
        Transition: _transition,
        Q0: _Q0,
        F: _F
    }
    let goal_F = util.padClosure(_input, [0]);
    let _inputt = {
        Q: _Q,
        Sigma_x_Sigma: input.Sigma_x_Sigma,
        Transition: _transition,
        Q0: _Q0,
        F: goal_F
    }
    let output = util.processProj(_inputt);
    return output;
}

module.exports.component_1 = promise_1;
module.exports.component_2 = promise_2;