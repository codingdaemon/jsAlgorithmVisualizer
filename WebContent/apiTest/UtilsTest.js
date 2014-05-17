/**
 * Created by nitiraj on 17/5/14.
 */

var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    paths:{
      core : "../app/api/core"
    }
});

requirejs(["core/Utils", "core/Point","core/Logger"], function(Utils, Point,Logger){
    var point = new Point(500,530);
    var x1 = 300;
    var y1 = 560;
    var width = 50;
    var height = 30;

    Logger.info("rect x = " + x1 + " y = " + y1 + " width = " + width + " height = " + height);
    var x2 = x1 + width;
    var y2 = y1;

    var x3 = x2;
    var y3 = y1 + height;

    var x4 = x1;
    var y4 = y1 + height;

    var centerX = x1 + width / 2;
    var centerY = y1 + height / 2;

    // if point and center are on opposite side
    if (Utils.getPointsPositionWrtLine(x1, y1, x2, y2, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x1, y1, x2, y2, centerX, centerY)) {
        var p1 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x1, y1, x2, y2);
        if (null != p1) Logger(  "answer =" + p1 );
    }

    if (Utils.getPointsPositionWrtLine(x2, y2, x3, y3, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x2, y2, x3, y3, centerX, centerY)) {
        var p2 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x2, y2, x3, y3);
        if (null != p2) Logger.info(  "answer =" + p2 );
    }

    if (Utils.getPointsPositionWrtLine(x3, y3, x4, y4, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x3, y3, x4, y4, centerX, centerY)) {
        var p3 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x3, y3, x4, y4);
        if (null != p3) Logger.info(  "answer =" + p3 );
    }

    if (Utils.getPointsPositionWrtLine(x4, y4, x1, y1, point.getX(), point.getY()) != Utils.getPointsPositionWrtLine(x4, y4, x1, y1, centerX, centerY)) {
        var p4 = Utils.findIntersectionPointOfSegments(point.getX(), point.getY(), centerX, centerY, x4, y4, x1, y1);
        if (null != p4) Logger.info( "answer =" + p4 );
    }
});