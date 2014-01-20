"use strict"

angular.module("todoApp")
  .factory "User", ['$resource', ($resource) ->
    $resource "/api/users/:id",
      id: "@id"
    ,
      update:
        method: "PUT"
        params: {}

      get:
        method: "GET"
        params:
          id: "me"
  ]