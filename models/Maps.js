var mongoose = require('mongoose');
var GEOJSON = require('mongoose-geojson-schema');
var Schema = mongoose.Schema;

var MapsSchema = new Schema({
    id: Number,
    documentName: String,
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,
    multipoint: mongoose.Schema.Types.MultiPoint,
    linestring: mongoose.Schema.Types.LineString,
    multilinestring: mongoose.Schema.Types.MultiLineString,
    polygon: mongoose.Schema.Types.Polygon,
    multipolygon: mongoose.Schema.Types.MultiPolygon,
    geometry: mongoose.Schema.Types.Geometry,
    geometrycollection: mongoose.Schema.Types.GeometryCollection,
    feature: mongoose.Schema.Types.Feature,
    featurecollection: mongoose.Schema.Types.FeatureCollection
});

var Map = mongoose.model('Map', MapsSchema);

module.exports = Map;