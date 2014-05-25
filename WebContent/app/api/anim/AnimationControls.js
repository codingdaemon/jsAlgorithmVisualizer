/**
 * Created by nitiraj on 18/5/14.
 */
define(["core/Constants", "core/Utils", "animds/AnimationObject", "libs/kinetic","imagePlugin!imagesPath/pause_play_forward1.jpg!rel", "libs/connect"],function(Constants,Utils,AnimationObject,Kinetic,pausePlayImage,ConnectJs){

    function AnimationControls(configs,layer,animator,layoutManager){
        this.configs = configs;
        this.layer = layer;
        this.animator = animator;
        this.layoutManager = layoutManager;
        this.x = this.configs[Constants.ANIMATION_CONTROL_X];
        this.y = this.configs[Constants.ANIMATION_CONTROL_Y];

        this.buttonWidth = this.configs[Constants.ANIMATION_CONTROL_BUTTON_WIDTH];
        this.buttonHeight = this.configs[Constants.ANIMATION_CONTROL_BUTTON_HEIGHT];

        this.pauseButton = null;
        this.playButton = null;
        this.forwardButton = null;
        this.resetButton = null;

        this.group = new Kinetic.Group({
            draggable :true
        });

        this.layer.add(this.group);

//        this.imageObj = new Image();
        var ref = this;
        this.imageObj = pausePlayImage;
//        this.imageObj.onload = function() {
            ref.pauseButton = new Kinetic.Image({
                x: 0,
                y: 0,
                image: ref.imageObj,
                width: ref.buttonWidth,
                height: ref.buttonHeight,
                crop : {
                    x  : 75,
                    y  : 80,
                    width : 70,
                    height : 65
                }
            });

            ref.group.add(ref.pauseButton);

            ref.playButton = new Kinetic.Image({
                x: 0,
                y: 0,
                image: ref.imageObj,
                width: ref.buttonWidth,
                height: ref.buttonHeight,
                crop : {
                    x  : 75,
                    y  : 0,
                    width : 70,
                    height : 65
                }
            });

            ref.group.add(ref.playButton);

            ref.forwardButton = new Kinetic.Image({
                x: ref.buttonWidth,
                y: 0,
                image: ref.imageObj,
                width: ref.buttonWidth,
                height: ref.buttonHeight,
                crop : {
                    x  : 150,
                    y  : 0,
                    width : 70,
                    height : 65
                }
            });

            ref.group.add(ref.forwardButton);

//            ref.resetButton = new Kinetic.Image({
//                x: 2*ref.buttonWidth,
//                y: 0,
//                image: ref.imageObj,
//                width: ref.buttonWidth,
//                height: ref.buttonHeight,
//                crop : {
//                    x  : 150,
//                    y  : 80,
//                    width : 70,
//                    height : 65
//                }
//            });
//
//            ref.group.add(ref.resetButton);

            ref.playButton.on('click tap', function() {
                ref.animator.playCodeAnimation();
                ref.playButton.hide();
                ref.pauseButton.show();
                ref.layer.draw();
            });

            ref.pauseButton.on('click tap', function() {
                ref.animator.pauseCodeAnimation();
                ref.pauseButton.hide();
                ref.playButton.show();
                ref.layer.draw();
            });

            ref.forwardButton.on('click tap', function() {
                ref.animator.forwardCodeAnimation();
            });

            ConnectJs.connect(ref.animator.getAnimationEngine(),"animationCompleted",function(){
               ref.pauseButton.hide();
               ref.playButton.show();
               ref.layer.draw();
            });
//            ref.resetButton.on('click tap', function() {
//                ref.animator.resetCodeAnimation();
//            });

            ref.layer.draw();
//        };
    }

    return AnimationControls;
});