/**
 * Created by nitiraj on 20/4/14.
 */
define(["ds/LinkedNode", "animgen/LinkedListAnimationGenerator"], function (LinkedNode,LinkedListAnimationGenerator) {
    function LinkedList() {
        this.head = null;
        this.tail = null;
//        this.animationId = animationId; // global var
        if( typeof animationId !== 'undefined'){
            this.linkedListAnimationGenerator = new LinkedListAnimationGenerator(animationId, "LinkedList");
        }
    }

    LinkedList.prototype.addFront = function (data) {
        var node = new LinkedNode(data);
        var currHead = this.head;
        this.head = node;
        if (null == currHead) {
            this.tail = this.head;
        } else {
            this.head.setNextPointer(currHead);
        }

        if(this.linkedListAnimationGenerator){
            this.linkedListAnimationGenerator.addFront(data);
        }
    };

    LinkedList.prototype.addLast = function (data) {
        var node = new LinkedNode(data);
        var currTail = this.tail;
        if (currTail == null) {
            this.tail = node;
            this.head = this.tail;
        } else {
            this.tail = node;
            currTail.setNextPointer(this.tail);
        }

        if(this.linkedListAnimationGenerator) {
            this.linkedListAnimationGenerator.addLast(data);
        }
    };

    LinkedList.prototype.elementAt = function (index) {
        var p = this.head;
        var count = 0;
        while (count != index && p != null) {
            p = p.getNextPointer();
            count++;
        }

        if(this.linkedListAnimationGenerator) {
            this.linkedListAnimationGenerator.elementAt(index);
        }

        if (null == p) return null;
        else return p.getData();
    };

    LinkedList.prototype.insertAt = function (atIndex, data) {
        var index = atIndex;

      if(index < 0){
          throw "index cannot be negative :"  + atIndex;
      }

      var node = null;
      var p = this.head;
      var q = null;
      while( index != 0 && p != null ){
          q = p ;
          p = p.getNextPointer();
          index--;
      }

      if(index != 0 ){
          throw "index out of bounds : index = " + atIndex;
      }

      node = new LinkedNode(data);
      node.setNextPointer(p);

      if(q != null){
          q.setNextPointer(node);
          if( p == null ){ // q points to tail
            this.tail = node;
          }
      }else{ // q == null
          this.head = node;
          if(p == null){ // this was head which is null
              this.tail = node;
          }
      }

        if(this.linkedListAnimationGenerator) {
            this.linkedListAnimationGenerator.insertAt(atIndex,data);
        }
    };

    LinkedList.prototype.removeAt = function (index) {
        if (index < 0)
            throw "index cannot be negative : " + index;

        var p = this.head;
        var q = null;
        var count = 0;
        while (count != index && p != null) {
            q = p;
            p = p.getNextPointer();
            count++;
        }

        if (null == p) throw "no object exists at index " + index;
        else {
            if (p == this.tail) {
                this.tail = q;
            }
            if (p == this.head) {
                if(this.head != null )
                    this.head = this.head.getNextPointer();
            }
            if (q != null) {
                q.setNextPointer(p.getNextPointer());
            }
            p.setNextPointer(null);
        }

        if(this.linkedListAnimationGenerator) {
            this.linkedListAnimationGenerator.removeAt(index);
        }

        if (null != p) {
            var data = p.getData();
            delete p;
            return data;
        } else {
            return null;
        }
    };

    LinkedList.prototype.getLength = function () {
        var p = this.head;
        var length = 0;
        while (p != null) {
            p = p.getNextPointer();
            length++;
        }

        if( this.linkedListAnimationGenerator){
            this.linkedListAnimationGenerator.getLength();
        }

        return length;
    };

    LinkedList.prototype.getHead = function(){
        if(this.linkedListAnimationGenerator){
    	    this.linkedListAnimationGenerator.getHead();
        }
        return this.head;
    };

    LinkedList.prototype.getTail = function(){
        if(this.linkedListAnimationGenerator){
    	    this.linkedListAnimationGenerator.getTail();
        }
        return this.tail;
    };

    LinkedList.prototype.toString = function(){
        var p = this.getHead();
        var str = "[LinkedList values= ";
        while(p != null ){
            if(p != this.head)
                str += "," ;

            str += p.getData();
            p = p.getNextPointer();
        }
        str += " ]";

        return str;
    };

    return LinkedList;
});