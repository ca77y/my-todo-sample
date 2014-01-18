'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');

/**
 * Populate database with sample application data
 */

// Clear old todos, then add default todos
Todo.find({}).remove(function () {
    Todo.create({
            name: 'test task 1',
            owner: 'test@test.com',
            priority: 5
        },
        {
            name: 'test task 2',
            owner: 'test@test.com',
            priority: 1,
            completed: true
        }, function () {
            console.log('finished populating todos');
        });
});

// Clear old users, then add a default user
User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, function () {
            console.log('finished populating users');
        }
    );
});
