Utils = {
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
                copy[i] = Utils.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Utils.clone(obj[attr]);
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
        var baseCopy = Utils.clone(baseObject);
        for (var key in object) {
            if( object.hasOwnProperty(key)){
                baseCopy[key] = object[key];
            }
        }

        return baseCopy;
    }
};