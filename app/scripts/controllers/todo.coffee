'use strict'

angular.module('todoApp')
  .controller 'TodoCtrl', ($scope, $http) ->
    $http.get('/api/todos').success (res) ->
      $scope.model = {
        todos: res.todos
      }