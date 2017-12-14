const fs = require('fs');
var inspect = require('util').inspect;
const xml2js = require('xml2js');
const util = require('./util');



var promise = new Promise((resolve, reject) => {
    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/test2.jff', function(err, data) {
        parser.parseString(data, function(err, result) {
            resolve(result);
        });
    });
}).then(result => {
    console.log(inspect(result, true, 12, true))
    var transitionArray = result.structure.automaton[0].transition //return an array
    var stateArray = result.structure.automaton[0].state;
    var input = {
        Q: util.toMonoArray(stateArray),
        Sigma_x_Sigma: util.sigma_x_sigma(['0', '1']),
        Transition: util.transitions(transitionArray),
        Q0: util.initial_state(stateArray),
        F: util.final_state(stateArray)
    }


    input = util.processProj(input);

    // input = util.toEquivalentClasses(input, ['0', '1']);
    // input = util.removeUnreachableState(input);
    return Promise.resolve(input);
})

module.exports = promise;