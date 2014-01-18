'use strict'

angular.module('todoApp')
  .controller 'NavbarCtrl', ($scope, $location, Auth) ->
    $scope.menu = [
      title: 'Settings'
      link: '/settings'
    ,
      title: 'Todo'
      link: '/todo'
    ]
    
    $scope.logout = ->
      Auth.logout().then ->
        $location.path "/login"
    
    $scope.isActive = (route) ->
      route is $location.path()