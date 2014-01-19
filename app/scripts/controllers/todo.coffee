'use strict'

angular.module('todoApp')
.controller 'TodoCtrl', ($scope, $http) ->
    $scope.model =
      todos: []

    $http.get('/api/todos').success (res) ->
      $scope.model.todos = res.todos
      $scope.model.remainingCount = res.todos.map((item) -> if item.completed then 0 else 1).reduce (x, y) ->
        x + y


    $scope.addTodo = ->
      todo =
        name: $scope.model.newTodo
      $http.post('api/todos', todo).success (res) ->
        $scope.model.todos.push res
        $scope.model.newTodo = null
        $scope.model.remainingCount++

    $scope.updateTodo = (todo) ->
      $http.put("api/todos/#{todo._id}", todo).success ->
        $scope.model.remainingCount = $scope.model.todos.map((item) -> if item.completed then 0 else 1).reduce (x, y) ->
          x + y

    $scope.deleteTodo = (todo) ->
      $http.delete("api/todos/#{todo._id}").success ->
        idx = $scope.model.todos.indexOf todo
        if idx > -1
          $scope.model.todos.splice idx, 1