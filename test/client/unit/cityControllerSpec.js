describe("Unit tests for controller", function() {
    var scope, ctrl, cityService, $httpBackend;

    var CITIES = [
        {id: 0, name: "Leipzig"},
        {id: 1, name: "Beijing"},
        {id: 2, name: "Tampere"}
    ];

    beforeEach(module('cities'));

    beforeEach(inject(function($rootScope, $controller) {
        inject(function($injector) {
            cityService = $injector.get('cityService');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', '/cities').respond(CITIES);
            $httpBackend.when('POST', '/cities').respond(CITIES);
            $httpBackend.when('PUT', '/cities').respond(CITIES);
            $httpBackend.when('GET', '/cities/search?name=Tampere').respond([CITIES[2]]);
            $httpBackend.when('DELETE', '/cities?id=1').respond([CITIES[0], CITIES[2]]);
        });

        // Create new scope and controller
        scope = $rootScope.$new();
        ctrl = $controller('CityCtrl', {$scope: scope, cityService : cityService});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('controller initializing - find all cities', function() {
        $httpBackend.flush();
        expect(scope.cities.length).toEqual(3);
    });

    it('add a city', function() {
        $httpBackend.flush();
        scope.city.name = "Madrid";
        scope.city.add();
        $httpBackend.flush();
        expect(scope.cities.length).toEqual(4);
        expect(scope.cities[3].name).toEqual("Madrid");
    });

    it('update a city', function() {
        // Activate editing
        $httpBackend.flush();
        scope.city.edit(1);
        expect(scope.city.currentEdit).toEqual(1);

        // Update a city
        scope.city.update({id: 1, name: "Stockholm"});
        $httpBackend.flush();
        expect(scope.cities[1].name).toEqual("Stockholm");
    });

    it('delete a city', function() {
        $httpBackend.flush();
        scope.city.del(1);
        $httpBackend.flush();
        expect(scope.cities.length).toEqual(2);
        expect(scope.cities[1].name).toEqual("Tampere");
    });

    it('search for a city', function() {
        // Perform search
        scope.city.query = "Tampere";
        scope.city.search();
        $httpBackend.flush();
        expect(scope.cities[0].name).toEqual("Tampere");
        expect(scope.city.reset).toBe(true);

        // Reset search
        scope.city.resetSearch();
        $httpBackend.flush();
        expect(scope.city.reset).toBe(false);
        expect(scope.cities.length).toEqual(3);
    });
});