'use strict'

angular.module('todoApp')
  .factory 'Session', ['$resource', ($resource) ->
    $resource '/api/session/'
  ]