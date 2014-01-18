'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Todo = mongoose.model('Todo');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.todos = function(req, res) {
    return Todo.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};