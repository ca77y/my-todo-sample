'use strict';

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

exports.todos = function(req, res) {
    return Todo.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};