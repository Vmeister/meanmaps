var app = angular.module('meanMaps', ['ui-leaflet']);

app.controller('MapController', [ '$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
    var layerGroup = L.layerGroup();
    angular.extend($scope, {
        defaults: {
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 15
        }
    });
    $scope.mapOptions = [];
    $http.get("/maplayers").then(function(response) {
        $scope.mapOptions = eval(response.data);
    });

    $scope.selection = function(id) {
        layerGroup.clearLayers();

        $http.get("/maplayers/" + id).then(function(response) {
            var mapLayer = new L.geoJson();
            $(response.data.features).each(function(key, feature) {
                mapLayer.addData(feature);
            });
            layerGroup.addLayer(mapLayer);
            mapLayer.eachLayer(function(layer) {
                var popup = [];
                for (var prop in layer.feature.properties) {
                    popup.push(prop + ": " + layer.feature.properties[prop]);
                }
                mapLayer.bindPopup(popup.join("<br />"));
            });
            leafletData.getMap('map').then(function(map) {
                layerGroup.addTo(map);
                map.fitBounds(mapLayer.getBounds());
            })
        });
    };
}]);
