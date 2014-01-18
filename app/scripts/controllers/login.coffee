'use strict'

angular.module('todoApp')
  .controller 'LoginCtrl', ($scope, Auth, $location) ->
    $scope.user = {}
    $scope.errors = {}

    $scope.login = (form) ->
      $scope.submitted = true

      if form.$valid
        Auth.login(
          email: $scope.user.email
          password: $scope.user.password
        )
        .then ->
          # Logged in, redirect to todo
          $location.path '/todo'
        .catch (err) ->
          err = err.data;
          $scope.errors.other = err.message;
