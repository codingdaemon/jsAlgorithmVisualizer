/**
 * Created by nitiraj on 20/4/14.
 */
define(["ds/LinkedNode"], function (LinkedNode) {
    function LinkedList() {
        this.head = null;
        this.tail = null;
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
    };

    LinkedList.prototype.elementAt = function (index) {
        var p = this.head;
        var count = 0;
        while (count != index && p != null) {
            p = p.getNextPointer();
            count++;
        }

        if (null == p) return null;
        else return p.getData();
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

        if (null != p) {
            return p.getData();
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

        return length;
    };

    LinkedList.prototype.getHead = function(){
        return this.head;
    };

    LinkedList.prototype.getTail = function(){
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