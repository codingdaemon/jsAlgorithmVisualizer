define([], function () {

    /**
     * this is a number class to show animation of single
     * variable of type number. example
     * var x = 10 ;
     * x++ ;
     * x -= 10;
     * will now translate to
     * var x = new ANumber
     * @param value
     * @returns
     */
    function ANumber(value) {
        this.value = value;
    }

    ANumber.prototype.valueOf = function () {
        return this.value;
    };

    ANumber.prototype.setValue = function (value) {
        this.value = value;
    };

    ANumber.prototype.add = function (x) {
        this.value += x;
    };

    ANumber.prototype.minus = function (x) {
        this.value -= x;
    };

    ANumber.prototype.isLessThan = function (x) {
        return (this.value < x);
    };

    ANumber.prototype.isGreaterThan = function (x) {
        return (this.value > x);
    };

    ANumber.prototype.isLessThanEqualTo = function (x) {
        return (this.value <= x);
    };

    ANumber.prototype.isGreaterThanEqualTo = function (x) {
        return (this.value >= x);
    };

    ANumber.prototype.modulo = function (x) {
        return (this.value % x);
    };

    ANumber.prototype.equals = function (x) {
        return (this.value == x);
    };
    return ANumber;
});