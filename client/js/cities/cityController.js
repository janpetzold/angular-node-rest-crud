'use strict';

// initiate the app - could be placed in dedicated file, but no need here
var app = angular.module('cities', ["ngResource"]);

app.controller('CityCtrl', function($scope, cityService) {
    // Clear cities array - will be fetched right afterwards
    $scope.cities = [];

    $scope.city = {};

    // Toggle visibility of Reset Search button
    $scope.city.reset = false;

    // Set the currently editable city
    $scope.city.currentEdit = null;

    // Check whether city with ID is editable or not
    $scope.city.isReadOnly = function(id) {
        if(!$scope.city.currentEdit || $scope.city.currentEdit !== parseInt(id, 10)) {
            return true;
        }
        return false;
    };

    // fetch the complete dataset from the server after initializing
    app.reloadCities(cityService, function(result) {
        $scope.cities = result;
    });

    // handler to search a city
    // we should really use Angular filters in real life here, but this is to "simulate" server-side search
    $scope.city.search = function() {
        cityService.search({name : $scope.city.query}, function(result) {
            $scope.cities = result;
            $scope.city.reset = true;
        });
    };

    // handler to reset the search (load the inital dataset)
    $scope.city.resetSearch = function() {
        app.reloadCities(cityService, function(result) {
            $scope.cities = result;
        });
        $scope.city.reset = false;
    };

    // handler for adding a new city
    $scope.city.add = function() {
        var city = {
            id: $scope.cities.length,
            name: $scope.city.name
        };
        $scope.cities = cityService.add(city);
    };

    // handler for editing
    $scope.city.edit = function(id) {
        for(var i in $scope.cities) {
            if($scope.cities[i].id === parseInt(id, 10)) {
                $scope.city.currentEdit = parseInt(id, 10);
            }
        }
    };

    // handler for saving an updated entry
    $scope.city.update = function(city) {
        $scope.cities = cityService.update({id: city.id, name: city.name});
        $scope.city.currentEdit = null;
    };

    // handler for deleting a city
    $scope.city.del = function(id) {
        $scope.cities = cityService.delete({id : id});
    };
});

// This method reloads all cities from server.
// Outsourced for readability and we might want to add caching / benchmarks here.
app.reloadCities = function(cityService, callback) {
    cityService.read({}, function (result) {
        callback(result);
    });
};

// List all DIs to avoid errors in minification
//CityController.$inject = ['$scope', "cityService"];
app.controller('CityCtrl'.$inject = ['$scope', "cityService"]);