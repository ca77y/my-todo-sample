'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    todos = require('./controllers/todos'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.post('/api/users', users.create);
    app.put('/api/users', middleware.auth, users.changePassword);
    app.get('/api/users/me', middleware.auth, users.me);
    app.get('/api/users/:id', middleware.auth, users.show);

    app.post('/api/todos', middleware.auth, todos.create);
    app.get('/api/todos', middleware.auth, todos.list);
    app.put('/api/todos/:id', middleware.auth, todos.update);
    app.get('/api/todos/:id', middleware.auth, todos.show);
    app.delete('/api/todos/:id', middleware.auth, todos.delete);

    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};