'use strict';

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    users = require('./users'),
    passport = require('passport');

/**
 * Create todos
 */
exports.create = function (req, res) {
    var newTodo = new Todo(req.body);
    var user = users.me;
    newTodo.owner = user.email;

    newTodo.save(function (err, product) {
        if (err) {
            return res.json(400, err);
        }

        return res.json(product);
    });
};

exports.update = function (req, res) {
    var todoId = String(req.body.id);

    Todo.update({_id: todoId}, req.body, function (err) {
        if (err) {
            return res.json(400, err);
        }

        return res.send(200);
    });
};

/**
 * Delete todos
 */
exports.delete = function (req, res) {
    var todoId = req.params.id;

    Todo.remove({_id: todoId}, function (err) {
        if (err) {
            return res.json(400, err);
        }

        return res.send(200);
    });
};

/**
 * Get specified todos
 */
exports.show = function (req, res, next) {
    var todoId = req.params.id;

    Todo.findById(todoId, function (err, todo) {
        if (err) return next(new Error('Failed to load Todo'));

        if (todo) {
            res.send({ todo: todo });
        } else {
            res.send(404, 'TODO_NOT_FOUND');
        }
    });
};


/**
 * Get all todos
 */
exports.list = function (req, res, next) {
    Todo.find({}, function (err, todos) {
        if (err) return next(new Error('Failed to load Todo'));

        if (todos) {
            res.send({ todos: todos });
        } else {
            res.send(404, 'TODO_NOT_FOUND');
        }
    });
};