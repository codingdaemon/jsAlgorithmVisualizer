/**
 * Created by nitiraj on 25/4/14.
 */

define(["core/Defaults", "core/Utils"], function(Defaults, Utils){
   var Factory = {};

   Factory.getDefaults = function(){
       return Utils.clone(Defaults);
   };
});