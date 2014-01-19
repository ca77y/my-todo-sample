'use strict';

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    passport = require('passport');

/**
 * Create todos
 */
exports.create = function (req, res) {
    var newTodo = new Todo(req.body);
    newTodo.owner = req.user.email;

    newTodo.save(function (err, product) {
        if (err) {
            return res.json(400, err);
        }
        return res.json(product);
    });
};

exports.update = function (req, res) {
    var todoId = req.params.id;
    var todo = new Todo(req.body).toObject();

    delete todo._id;

    Todo.findByIdAndUpdate(todoId, todo, function (err) {
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
    Todo.find({owner:req.user.email}, function (err, todos) {
        if (err) return next(new Error('Failed to load Todo'));

        if (todos) {
            res.send({ todos: todos });
        } else {
            res.send(404, 'TODO_NOT_FOUND');
        }
    });
};