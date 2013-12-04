'use strict';

app.factory("cityService", function($resource, $http) {
    var resource = $resource("/cities", null,
        {
            'add':  { method: 'POST', isArray: true},
            'read':   { method: 'GET', isArray: true},
            'update':  { method: 'PUT', isArray: true},
            'delete': { method: 'DELETE', isArray: true},
            'search': { method: 'GET', url: '/cities/search', isArray: true}
        }
    );
    return resource;
});