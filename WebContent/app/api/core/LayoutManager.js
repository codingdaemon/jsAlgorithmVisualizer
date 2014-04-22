define(["core/Point", "libs/kinetic"], function (Point, Kinetic) {

    /**
     AIM :
     this will create the stage and manage different DS animations in the layers so that
     DS Animation Objects don't have to take care of their positions on the stage.

     Actual : I don't know how to do this. So right now the locations will be managed by DS themselves.
     So right now everyone will create the structure in the center of the stage and then we can
     drag them to wherever we want rest of the things will work fine after that.
     **/

    function LayoutManager(stage) {
        this.stage = stage;
        this.layer = new Kinetic.Layer();
        this.stage.add(this.layer);
    }

    LayoutManager.prototype.getLayer = function () {
        return this.layer;
    };

    LayoutManager.prototype.getCenter = function () {
        return new Point(this.stage.width() / 2, this.stage.height() / 2);
    };
    return LayoutManager;
});