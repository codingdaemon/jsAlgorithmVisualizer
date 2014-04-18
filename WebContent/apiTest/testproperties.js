/**
 * Created by nitiraj on 18/4/14.
 */
Utils = {
    clone : function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Utils.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Utils.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}

var obj = {
    x : "x1",
    y : "y1",
    z : "z1",
    func : function(){

    }
}

for( var key in obj){
    console.log("obj[" + key + "] = " + obj[key]);
}

var jobj = {
    "x" : "x2",
    "z" : "z2",
    "func" : function(){
     return 0;
    }
}

for(var jkey in jobj){
    console.log("jobj[" + jkey + "] = " + jobj[jkey]);
}

var defConfigs = Utils.clone(obj);
for( var key in jobj){
    defConfigs[key] = jobj[key];
}

for(var dkey in defConfigs){
    console.log("defConfigs[" + dkey + "] = " + defConfigs[dkey]);
}
