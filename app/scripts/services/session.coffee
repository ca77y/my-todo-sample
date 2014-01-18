'use strict'

angular.module('todoApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
