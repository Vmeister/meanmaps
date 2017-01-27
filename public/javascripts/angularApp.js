var app = angular.module('meanMaps', ['ui-leaflet']);

app.controller("MapCtrl", ['$scope', '$http', function($scope, $http) {
    angular.extend($scope, {
        finland: {
            lat: 60.192059,
            lng: 24.945831,
            zoom: 4
        }
    });
    $http.get('/maplayer.geojson').then(function(response) {
        angular.extend($scope, {
            geojson: {
                data: response
            }
        });
    });
}]);
