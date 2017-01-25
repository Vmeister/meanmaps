var app = angular.module('meanMaps', ['ui.router', 'ngMap']);

app.controller('MainCtrl', [
    '$scope',
    function($scope){
        $scope.maps = [
            'Map 1',
            'Map 2'
        ];
    }
]);

app.controller('MapsCtrl', [
    '$scope',
    '$stateParams',
    'maps',
    function($scope, $stateParams, posts){
        $scope.map = maps.map[$stateParams.id];
    }
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('maps', {
                url: 'maps/{id}',
                templateUrl: '/maps.html',
                controller: "MapCtrl"
            })
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            }
            );

        $urlRouterProvider.otherwise('home');
    }
]);

angular.module('mapApp', [])
    .controller('MapCtrl', function ($scope) {

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
    });


