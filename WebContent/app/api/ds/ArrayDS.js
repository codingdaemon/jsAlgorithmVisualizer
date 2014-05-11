/**
 * Created by nitiraj on 10/5/14.
 */

define(["animgen/ArrayAnimationGenerator", "core/Logger", "core/Utils"], function(ArrayAnimationGenerator, Logger, Utils){
   function ArrayDS(size){
       this.size = size;
       if( typeof animationId !== 'undefined' && animationId != null ) { // Note cannot use Utils.isNullOrUndefined here as we are not checking window.animationId
           this.codeGenerator = new ArrayAnimationGenerator(animationId, "Array", this.size);
       }
       this.array = [];
       for(var i = 0 ; i < this.size ; i++){
           this.array[i] = null;
       }
   }

   ArrayDS.prototype.at = function(index){
        if( index < 0 || index >= this.size){
            throw "index out of bound exception";
        }

        if( !Utils.isNullOrUndefined( this.codeGenerator) ) {
            this.codeGenerator.at(index);
        }

        return this.array[index] ;
    };

   ArrayDS.prototype.set = function(index, data){
       if( index < 0 || index >= this.size){
           throw "index out of bound exception";
       }

       this.array[index] = data;
       if( !Utils.isNullOrUndefined(this.codeGenerator)) {
           this.codeGenerator.set(index, data);
       }
   };

    ArrayDS.prototype.toString = function(){
        return "[" + this.array.toString() + "]";
    };

   return ArrayDS;
});
