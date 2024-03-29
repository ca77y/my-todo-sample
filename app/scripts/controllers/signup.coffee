'use strict'

angular.module('todoApp')
  .controller 'SignupCtrl', ['$scope', 'Auth', '$location', ($scope, Auth, $location) ->
    $scope.user = {}
    $scope.errors = {}
    
    $scope.register = (form) ->
      $scope.submitted = true

      if form.$valid
        Auth.createUser(
          name: $scope.user.name
          email: $scope.user.email
          password: $scope.user.password
        ).then( ->
          # Account created, redirect to todos
          $location.path '/todo'
        ).catch( (err) ->
          err = err.data
          $scope.errors = {}
          
          # Update validity of form fields that match the mongoose errors
          angular.forEach err.errors, (error, field) ->
            form[field].$setValidity 'mongoose', false
            $scope.errors[field] = error.type
        )
  ]