var svc = {};

// So this is our "database" with all objects. Keeping it (very) simple.
svc.cities = [
    {"id" : 0, "name" : "Lissabon"},
    {"id" : 1, "name" : "Tokyo"},
    {"id" : 2, "name" : "Berlin"},
    {"id" : 3, "name" : "Istanbul"},
    {"id" : 4, "name" : "San Francisco"},
    {"id" : 5, "name" : "Tanger"},
    {"id" : 6, "name" : "Hanoi"},
    {"id" : 7, "name" : "Paris"}
];

// Read all
svc.readCities = function() {
    return svc.cities;
};

// Add
svc.saveCity = function(city) {
    svc.cities.push(city);
    return svc.cities;
};

// Delete
svc.deleteCity = function(id) {
    for(var i in svc.cities) {
        if(svc.cities[i].id === id) {
            svc.cities.splice(i, 1);
        }
    }
    return svc.cities;
};

// Update
svc.updateCity = function(city) {
    for(var i in svc.cities) {
        if(svc.cities[i].id === city.id) {
            // There is just one property to update - again, this is a very simple example
            svc.cities[i].name = city.name;
        }
    }
    return svc.cities;
};

// Search (practically a full-table-scan inside a JSON-Array :)
svc.searchCity = function(query) {
    var result = [];
    for(var i in svc.cities) {
        if(svc.cities[i].name.indexOf(query) > -1) {
            result.push(svc.cities[i]);
        }
    }
    return result;
};

exports.readCities = svc.readCities;
exports.saveCity = svc.saveCity;
exports.updateCity = svc.updateCity;
exports.deleteCity = svc.deleteCity;
exports.searchCity = svc.searchCity;