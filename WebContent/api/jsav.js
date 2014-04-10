jsav = {};
jsav.animationEngine = new AnimationEngine();
var Logger = new LoggerClass();

jsav.createStage = function( containerDiv, stageHeight, stageWidth){
	jsav.stage = new Kinetic.Stage({
		container: containerDiv,
        width: stageHeight,
        height: stageWidth
	});

	jsav.layoutManager = new LayoutManager(jsav.stage); 
};



