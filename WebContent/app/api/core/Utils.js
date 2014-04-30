define(["core/Point","core/Logger"], function (Point,Logger) {

    var Utils = {
        clone: function (obj) {
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            var copy = null;
            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = this.clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        },
        /**
         * creates a copy of baseObject and override it with the properties of object
         * @param baseObject
         * @param object
         */
        overrideObject: function (baseObject, object) {
            var baseCopy = this.clone(baseObject);
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    baseCopy[key] = object[key];
                }
            }

            return baseCopy;
        },

//        findIntersectionPointOfLines: function (l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
//            var y = (  l2x1 * l2y2 - l2x2 * l2y1 - l1x1 * l1y2 + l1x2 * l1y1 ) / (  ( l1x1 - l1x2 ) /  ( l1y1 - l1y2 ) - (l2x1 - l2x2) / ( l2y1 - l2y2 )  );
//            var x = ( l1x1 - l1x2 ) / ( l1y1 - l1y2 ) * y + l1x1 * l1y2 - l1x2 * l1y1;
//
//            return new Point(x, y);
//        },

        findIntersectionPointOfLines: function (l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
            var y = null;
            var x = null;
            if (l1y1 == l1y2) { // theta = 90 degree
                y = l1y1;
                x = (l2x1 - l2x2) / (l2y1 - l2y2) * (y - l2y1) + l2x1;
            } else if (l2y1 == l2y2) { // theta = 90 degree
                y = l2y1;
                x = (l1x1 - l1x2) / (l1y1 - l1y2) * (y - l1y1) + l1x1;
            } else {
                var a = ( l1x1 - l1x2 ) / ( l1y1 - l1y2 );
                var b = (l2x1 - l2x2) / ( l2y1 - l2y2 );
                if (a == b) { // parallel lines
                    return null;
                }

                y = ( l1y1 * a - l2y1 * b + l2x1 - l1x1) / ( a - b );
                x = a * ( y - l1y1 ) + l1x1;
            }

            if (isNaN(x) || isNaN(y)) {
                return null;
            }

//            y = Math.ceil(y);
//            x = Math.ceil(x);

            return new Point(x, y);
        },

        findIntersectionPointOfLineAndSegment: function (lx1, ly1, lx2, ly2, sx1, sy1, sx2, sy2) {
            var point = this.findIntersectionPointOfLines(lx1, ly1, lx2, ly2, sx1, sy1, sx2, sy2);

            if( null == point ) return null; 
            
            if (( sx1 > sx2 && point.getX() <= sx1 && point.getX() >= sx2)
                || (sx2 > sx1 && point.getX() <= sx2 && point.getX() >= sx1 )
                ) {
                return point;
            }

            return null;
        },
        findIntersectionPointOfSegments: function (s1x1, s1y1, s1x2, s1y2, s2x1, s2y1, s2x2, s2y2) {
            var point = this.findIntersectionPointOfLines(s1x1, s1y1, s1x2, s1y2, s2x1, s2y1, s2x2, s2y2);

            if( null == point ) return null;
            
            if (( s2x1 >= s2x2 && point.getX() <= s2x1 && point.getX() >= s2x2)
                || (s2x2 >= s2x1 && point.getX() <= s2x2 && point.getX() >= s2x1 )
                ) {
                if (( s1x1 >= s1x2 && point.getX() <= s1x1 && point.getX() >= s1x2)
                    || (s1x2 >= s1x1 && point.getX() <= s1x2 && point.getX() >= s1x1 )){

                    Logger.info("returning point : " + point);
                    return point;
                }
            }

            return null;
        },
        generate4CharUID: function () {
            return (Math.floor((1 + Math.random()) * 0x10000)).toString(16).substring(1);
        },
        generateId: function () {
            return this.generate4CharUID();
        },
        
        getHeaderCode: function( animationId ){
            var HEADER_CODE = "(function(){" +
            "animationId = " + animationId + ";\n" +
            "require([\"ds/Stack\", \"ds/LinkedList\",\"core/Logger\"],function(Stack,LinkedList,Logger){ \n";

            return HEADER_CODE;
        },
        getFooterCode: function(){
	        var FOOTER_CODE = "\njsav.playCodeAnimation(animationId);\n" +
	        "});" +
	        "})();";
	        return FOOTER_CODE;
        }
    };

    return Utils;
});