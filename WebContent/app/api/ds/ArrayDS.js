/**
 * Created by nitiraj on 10/5/14.
 */

define(["animds/ArrayAnimationGenerator", "core/Logger"], function(ArrayAnimationGenerator, Logger){
   function ArrayDS(size){
       this.size = size;
       this.codeGenerator = new ArrayAnimationGenerator(animationId, "Array");
       this.array = [];
   }

   ArrayDS.prototype.at = function(index){
        if( index < 0 || index >= this.size){
            throw "index out of bound exception";
        }

        this.codeGenerator.at(index);
        return this.array[index] ;
    };

   ArrayDS.prototype.set = function(index, data){
       if( index < 0 || index >= this.size){
           throw "index out of bound exception";
       }

       this.array[index] = data;
       this.codeGenerator.set(index,data);
   };

   return ArrayDS;
});
