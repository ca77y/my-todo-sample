'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var TodoSchema = new Schema({
    name: String,
    owner: String,
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        default: 1
    },
    dueDate: Date
});

/**
 * Validations
 */
TodoSchema.path('priority').validate(function (num) {
    return num >= 1 && num <= 10;
}, 'Priority must be between 1 and 10');

mongoose.model('Todo', TodoSchema);
