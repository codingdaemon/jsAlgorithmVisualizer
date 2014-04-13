var stage = null;
var layer = null;
var initialized = false;
var codeTexts = [];
var executionCodeLines = [];
var oldAnimatedLine = null;
var jsCodeScript = null;

const CODE_STATEMENT = "codeStatement";
const CODE_NON_STATEMENT = "nonCodeStatement";

function Logger() {
	this.log = function(message) {
		console.log(message);
	};
}

var logger = new Logger();

function animateLineExecution(lineIndex){
	if( null != oldAnimatedLine ){
		codeTexts[oldAnimatedLine].fill("black");
	}
	codeTexts[lineIndex].fill("green");
	layer.draw();
	oldAnimatedLine = lineIndex;
}

function showAnimation(){
	var jsCode = executionCodeLines.join('\n');

	var head = document.head;
	if (jsCodeScript != null ){
		head.removeChild(jsCodeScript);
	}
	jsCodeScript = document.createElement("script");
	jsCodeScript.type = 'text/javascript';
	jsCodeScript.innerHTML = jsCode;
    head.appendChild(jsCodeScript);
}

function initialize() {
	var animateButton = document.createElement('input');
	animateButton.type = "button";
	animateButton.id = "animateButtonId";
	animateButton.value = "Show Animation";
	animateButton.addEventListener("click", showAnimation, false);
	
	document.body.appendChild(animateButton);
	
	var element = document.createElement('div');
	element.id = "kineticContainer";
	document.body.appendChild(element);

	
	
	stage = new Kinetic.Stage({
		container : "kineticContainer",
		width : "10000",
		height : "10000"
	});
	
	layer = new Kinetic.Layer();
	stage.add(layer);
	
	initialized = true;
}

function printAscii(text){
	console.log("printing text : " + text);
	for( var i = 0 ; i < text.length ; i++){
		console.log(text.charAt(i) + " : " + text.charCodeAt(i));
	}
}
function printCodeOnCanvas(lines) {
	if( initialized == false )
	{	
		initialize();
	}else{
//		layer.clear();
		layer.destroyChildren();
	}

	codeTexts.length = 0 ;
	oldAnimatedLine = null;
	
	var font_size = 20;
	var nextY = 0 ;
	for ( var i = 0; i < lines.length; i++) {
		Logger.info("printing line : " + lines[i]);
//		printAscii(lines[i]);
		
		var codeLine = new Kinetic.Text({
			x : 0,
			y : nextY,
			text : lines[i].code.trim(),
			fontSize : font_size,
			fill : 'black'
				
//			,draggable :true
		});
		
		console.log("x = " + codeLine.x() + " y = " + codeLine.y() + " height = " + codeLine.height() + " width = " + codeLine.width());
		nextY = nextY + codeLine.height();
		if( lines[i].type === CODE_STATEMENT ){
			codeTexts[i] = codeLine;
		}
		
		layer.add(codeLine);
	}

//	stage.draw();
	layer.draw();
	
	console.log("executionCodeLines = " + executionCodeLines.join('\n'));
}

function generateAnimation(code) {
	// var code = document.getElementById("codeTextAreaId").value;
	// printCodeOnCanvas(code);
	var codeLines = getCodeLines(code);
	printCodeOnCanvas(codeLines);
}

function getCodeStatements(code, node) {
	var startPos = node.start.pos;
	var endPos = node.end.pos;
	var nodeCode = code.substr(startPos, endPos - startPos + 1);
	console.log(nodeCode);
}

function getCodeLines(code) {
	executionCodeLines.length = 0;
	var codeStatementPositions = [];
	var ast = UglifyJS.parse(code);
	ast.walk(new UglifyJS.TreeWalker(function(node) {
		if (node instanceof UglifyJS.AST_SimpleStatement
				|| node instanceof UglifyJS.AST_Definitions) {
			codeStatementPositions.push({
				startIndex : node.start.pos
				,endIndex : node.end.pos
				,type : CODE_STATEMENT
			});
			
			return true; // so complex statement are not resolved further
		}
	}));

	if (codeStatementPositions.length == 0) {
		logger
				.log("Cannot detect any simple statemetn or var definition in the code.");
		throw "Cannot find code that could be animated";
	}

	// sort the codeStatementsPositions with startIndex
	codeStatementPositions.sort(function(node1, node2) {
		return node1.startIndex - node2.startIndex;
	});

	var codeLines = []; // objects of type {code : xxx type : Statement/Non_Statement}
	var isFirstStatement = true;
	if (codeStatementPositions[0].startIndex != 0) {
		codeStatementPositions.unshift({
			startIndex : 0,
			endIndex : codeStatementPositions[0].startIndex - 1,
			type : CODE_NON_STATEMENT
		});
		
		isFirstStatement = false;
	}

	for ( var i = 0; i < codeStatementPositions.length; i++) {
		var currentStatementPos = codeStatementPositions[i];
		if (i != 0) { // not first statement
			var prevStatementPos = codeStatementPositions[i - 1];
			if (currentStatementPos.startIndex != prevStatementPos.endIndex + 1) {
				var codeSnippet = code.substr(prevStatementPos.endIndex + 1,
						(currentStatementPos.startIndex - 1)
								- (prevStatementPos.endIndex + 1) + 1);
				 if( codeSnippet.trim() != ''){
					 codeLines.push({code : codeSnippet ,type : CODE_NON_STATEMENT});
//					 executionCodeLines.push(codeSnippet);
				 }
			}
		}

		var currCodeSnippet = code.substr(currentStatementPos.startIndex,
				currentStatementPos.endIndex - currentStatementPos.startIndex
						+ 1);
		codeLines.push({code : currCodeSnippet , type : CODE_STATEMENT});
		executionCodeLines.push(currCodeSnippet);
		if (currentStatementPos.type == CODE_STATEMENT ){
			var x = i;
			if( !isFirstStatement ){
				x = i-1 ;
			}
			executionCodeLines.push("\nanimateLineExecution(" + x + ");");
		}
	}

	// adjust the last
	if (code.length != codeStatementPositions[codeStatementPositions.length - 1].endIndex + 1) { // there
																									// is
																									// some
																									// code
																									// after
																									// last
																									// statement
		var lastStatementPos = codeStatementPositions[codeStatementPositions.length - 1];
		var lastCodeSnippet = code.substr(lastStatementPos.endIndex + 1,
				code.length - lastStatementPos.endIndex);
		codeLines.push({code : lastCodeSnippet, type : CODE_NON_STATEMENT});
		executionCodeLines.push(lastCodeSnippet);
	}

	return codeLines;
}
