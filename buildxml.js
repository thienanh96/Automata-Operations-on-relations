const inspect = require('util').inspect
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const { exec } = require('child_process');
var builder = new xml2js.Builder();


require('./projection').component_1.then(project => {
    var jsonXml_project_1 = {
        structure: {
            type: 'fa',
            automaton: {
                state: project.Q,
                transition: project.Transition
            }
        }
    };

    var xml1 = builder.buildObject(jsonXml_project_1);
    fs.writeFile(path.resolve('./output/project_1.jff'), xml1, function(err) {
        if (err) {
            return console.log(err);
        }
        exec(path.resolve('./JFLAP_Thin.jar') + ' ' + path.resolve('./output/project_1.jff'), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log("PROJECT 1 was saveddđ!");
    });
})

require('./projection').component_2.then(project => {
    var jsonXml_project_2 = {
        structure: {
            type: 'fa',
            automaton: {
                state: project.Q,
                transition: project.Transition
            }
        }
    };

    var xml2 = builder.buildObject(jsonXml_project_2);
    fs.writeFile(path.resolve('./output/project_2.jff'), xml2, function(err) {
        if (err) {
            return console.log(err);
        }
        exec(path.resolve('./JFLAP_Thin.jar') + ' ' + path.resolve('./output/project_2.jff'), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log("PROJECT 2 was saved!");
    });
})

require('./join').then(join => {
    var jsonXml_project = {
        structure: {
            type: 'fa',
            automaton: {
                state: join.Q,
                transition: join.Transition
            }
        }
    };

    var xml = builder.buildObject(jsonXml_project);
    fs.writeFile(path.resolve('./output/join.jff'), xml, function(err) {
        if (err) {
            return console.log(err);
        }
        exec(path.resolve('./JFLAP_Thin.jar') + ' ' + path.resolve('./output/join.jff'), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log("JOIN was saved!");
    });
})

require('./post').then(post => {
    var jsonXml_post = {
        structure: {
            type: 'fa',
            automaton: {
                state: post.Q,
                transition: post.Transition
            }
        }
    };

    var xml = builder.buildObject(jsonXml_post);
    fs.writeFile(path.resolve('./output/post.jff'), xml, function(err) {
        if (err) {
            return console.log(err);
        }
        exec(path.resolve('./JFLAP_Thin.jar') + ' ' + path.resolve('./output/post.jff'), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log("POST was saved!");
    });
})

require('./pre').then(pre => {
    var jsonXml_pre = {
        structure: {
            type: 'fa',
            automaton: {
                state: pre.Q,
                transition: pre.Transition
            }
        }
    };

    var xml = builder.buildObject(jsonXml_pre);
    fs.writeFile(path.resolve('./output/pre.jff'), xml, function(err) {
        if (err) {
            return console.log(err);
        }
        exec(path.resolve('./JFLAP_Thin.jar') + ' ' + path.resolve('./output/pre.jff'), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        console.log("PRE was saved!");
    });
})