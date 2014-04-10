function CodeAnimationGenerator(codeString){
	AnimationGenerator.call(this);
	this.originalCodeString = codeString;
	
	var parsedCode = this.parseCode(codeString);
	this.executionCodeLines = parsedCode.executionCodeLines;
	this.codeStatementLines = parsedCode.codeStatementLines;
	this.modifiedCodeString = executionCodeLines.join('\n');
	
	this.codeAnimObject = new CodeAnimationObject("JavaScript Code", this.codeStatementLines);

	jsav.animationEngine.push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.createObject, [jsav.animationEngine]));
}

CodeAnimationGenerator.prototype = new AnimationGenerator();

CodeAnimationGenerator.prototype.getModifiedCode = function(){
	return this.modifiedCodeString;
};

CodeAnimationGenerator.prototype.parseCode = function(code) {
	var executionCodeLines = [];
	var codeStatementPositions = [];
	
	var ast = UglifyJS.parse(code);
	ast.walk(new UglifyJS.TreeWalker(function(node) {
		if (node instanceof UglifyJS.AST_SimpleStatement
				|| node instanceof UglifyJS.AST_Definitions) {
			codeStatementPositions.push({
				startIndex : node.start.pos
				,endIndex : node.end.pos
				,isCodeStatement : true
			});
			
			return true; // so that complex statement are not resolved further
		}
	}));

	if (codeStatementPositions.length == 0) {
		Logger.log("Cannot detect any simple statement or var definition in the code.");
		throw "Cannot find code that could be animated";
	}

	// sort the codeStatementsPositions with startIndex
	codeStatementPositions.sort(function(node1, node2) {
		return node1.startIndex - node2.startIndex;
	});

	var codeLines = []; // objects of type {code : xxx isCodeStatement : true/false }
	var isFirstStatement = true;
	if (codeStatementPositions[0].startIndex != 0) {
		codeStatementPositions.unshift({
			startIndex : 0,
			endIndex : codeStatementPositions[0].startIndex - 1,
			isCodeStatement : false
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
					 codeLines.push({code : codeSnippet ,isCodeStatement : false});
				 }
			}
		}

		var currCodeSnippet = code.substr(currentStatementPos.startIndex,
				currentStatementPos.endIndex - currentStatementPos.startIndex
						+ 1);
		codeLines.push({code : currCodeSnippet , isCodeStatement : currentStatementPos.isCodeStatement});
		executionCodeLines.push(currCodeSnippet);
		if (currentStatementPos.isCodeStatement == true ){
			var x = i;
			if( !isFirstStatement ){
				x = i-1 ;
			}
			executionCodeLines.push("\njsav.animateLineExecution(" + x + ");\n");
		}
	}

	// adjust the last
	if (code.length != codeStatementPositions[codeStatementPositions.length - 1].endIndex + 1) { 
		var lastStatementPos = codeStatementPositions[codeStatementPositions.length - 1];
		var lastCodeSnippet = code.substr(lastStatementPos.endIndex + 1,
				code.length - lastStatementPos.endIndex);
		codeLines.push({code : lastCodeSnippet, isCodeStatement : false});
		executionCodeLines.push(lastCodeSnippet);
	}

	return {"executionCodeLines" : executionCodeLines, "codeStatementLines" : codeLines};
};


CodeAnimationGenerator.prototype.generateLineAnimation = function(statementNumber){
	jsav.animationEngine.push(new AnimationInput(this.codeAnimObject, CodeAnimationObject.prototype.animateCodeStatement, [statementNumber, jsav.animationEngine]));
};