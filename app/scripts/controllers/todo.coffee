'use strict'

angular.module('todoApp')
.controller 'TodoCtrl', ['$scope', '$http', ($scope, $http) ->
    $scope.model =
      todos: []

    $scope.datepicker =
      minDate: new Date
      format: 'yyyy-MM-dd'
      opened: false
      todos: {}

    $scope.sorting =
      date:
        ascending: false
      priority:
        ascending: false
      predicate: "dueDate"
      reverse: false

    getRemainingCount = (todos) ->
      todos.map((item) -> if item.completed then 0 else 1).reduce (x, y) ->
        x + y

    $http.get('/api/todos').success (res) ->
      $scope.model.todos = res.todos.map (item) ->
        item.dueDate = new Date(item.dueDate)
        item
      $scope.model.remainingCount = getRemainingCount res.todos

    $scope.addTodo = ->
      todo =
        name: $scope.model.newTodo
      $http.post('api/todos', todo).success (res) ->
        $scope.model.todos.push res
        $scope.model.newTodo = null
        $scope.model.remainingCount++

    $scope.updateTodo = (todo) ->
      $http.put("api/todos/#{todo._id}", todo).success ->
        $scope.model.remainingCount = getRemainingCount $scope.model.todos

    $scope.deleteTodo = (todo) ->
      $http.delete("api/todos/#{todo._id}").success ->
        idx = $scope.model.todos.indexOf todo
        if idx > -1
          $scope.model.todos.splice idx, 1
          $scope.model.remainingCount = getRemainingCount $scope.model.todos

    $scope.increasePriority = (todo) ->
      if todo.priority < 9
        todo.priority++
        $scope.updateTodo todo

    $scope.decreasePriority = (todo) ->
      if todo.priority > 1
        todo.priority--
        $scope.updateTodo todo

    $scope.openDatepicker = ($event, todo) ->
      $event.preventDefault()
      $event.stopPropagation()
      $scope.datepicker.todos[todo._id] = true

    $scope.sortByDate = ->
      $scope.sorting.date.ascending = !$scope.sorting.date.ascending
      $scope.sorting.predicate = "dueDate"
      $scope.sorting.reverse = $scope.sorting.date.ascending


    $scope.sortByPriority = ->
      $scope.sorting.priority.ascending = !$scope.sorting.priority.ascending
      $scope.sorting.predicate = "priority"
      $scope.sorting.reverse = $scope.sorting.priority.ascending

    $scope.editTodo = (todo) ->
      $scope.model.editTodo = todo
      $scope.model.originalTodo = angular.copy todo

    $scope.cancelEdit = (todo) ->
      $scope.model.todos[$scope.model.todos.indexOf(todo)] = $scope.model.originalTodo
      $scope.model.editTodo = null
      $scope.model.originalTodo = null

    $scope.saveEdit = (todo) ->
      $scope.model.editTodo = null
      $scope.model.originalTodo = null
      $scope.updateTodo todo
  ]