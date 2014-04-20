define(["libs/uglifyjs"], function (UglifyJS) {

    function CodeParser(code, animationId) {
        this.HEADER_CODE = "(function(){" +
            "animationId = " + animationId + ";\n" +
            "require([\"Stack\"],function(Stack){ \n" ;

        this.FOOTER_CODE = "\njsav.playCodeAnimation(animationId);\n" +
            "});" +
            "})();";

//        this.HEADER_CODE = "(function(){" +
//            "animationId = " + animationId + ";\n" ;
//
//        this.FOOTER_CODE = "\n})();";

        this.originalCode = code;
        this.animationId = animationId;
        var parsedCode = this.parseCode(this.originalCode, animationId);
        this.executionCodeLines = parsedCode.executionCodeLines;
        this.codeStatementLines = parsedCode.codeStatementLines;
        this.modifiedCode = this.HEADER_CODE + this.executionCodeLines.join("\n") + this.FOOTER_CODE;
    }

    CodeParser.prototype.getCodeStatementLines = function () {
        return this.codeStatementLines;
    };

    CodeParser.prototype.getExecutionCodeLines = function () {
        return this.executionCodeLines;
    };

    CodeParser.prototype.getModifiedCode = function () {
        return this.modifiedCode;
    };

    CodeParser.prototype.parseCode = function (code, animationId) {
        var executionCodeLines = [];
        var codeStatementPositions = [];

        var ast = UglifyJS.parse(code);
        ast.walk(new UglifyJS.TreeWalker(function (node) {
            if (node instanceof UglifyJS.AST_SimpleStatement
                || node instanceof UglifyJS.AST_Definitions) {
                codeStatementPositions.push({
                    startIndex: node.start.pos, endIndex: node.end.pos, isCodeStatement: true
                });

                return true; // so that complex statement are not resolved further
            }
        }));

        if (codeStatementPositions.length == 0) {
            Logger.info("Cannot detect any simple statement or var definition in the code.");
            throw "Cannot find code that could be animated";
        }

        // sort the codeStatementsPositions with startIndex
        codeStatementPositions.sort(function (node1, node2) {
            return node1.startIndex - node2.startIndex;
        });

        var codeLines = []; // objects of type {code : xxx isCodeStatement : true/false }
        var isFirstStatement = true;
        if (codeStatementPositions[0].startIndex != 0) {
            codeStatementPositions.unshift({
                startIndex: 0,
                endIndex: codeStatementPositions[0].startIndex - 1,
                isCodeStatement: false
            });

            isFirstStatement = false;
        }

        for (var i = 0; i < codeStatementPositions.length; i++) {
            var currentStatementPos = codeStatementPositions[i];
            if (i != 0) { // not first statement
                var prevStatementPos = codeStatementPositions[i - 1];
                if (currentStatementPos.startIndex != prevStatementPos.endIndex + 1) {
                    var codeSnippet = code.substr(prevStatementPos.endIndex + 1,
                            (currentStatementPos.startIndex - 1)
                            - (prevStatementPos.endIndex + 1) + 1);
                    if (codeSnippet.trim() != '') {
                        codeLines.push({code: codeSnippet, isCodeStatement: false});
                        executionCodeLines.push(codeSnippet);
                    }
                }
            }

            var currCodeSnippet = code.substr(currentStatementPos.startIndex,
                    currentStatementPos.endIndex - currentStatementPos.startIndex
                    + 1);
            codeLines.push({code: currCodeSnippet, isCodeStatement: currentStatementPos.isCodeStatement});

            if (currentStatementPos.isCodeStatement == true) {
                var x = i;
                if (!isFirstStatement) {
                    x = i - 1;
                }
                executionCodeLines.push("\njsav.startAnimateLineExecution(" + x + ", " + animationId + ");\n");
                executionCodeLines.push(currCodeSnippet);
                executionCodeLines.push("\njsav.endAnimateLineExecution(" + x + ", " + animationId + ");\n");
            } else {
                executionCodeLines.push(currCodeSnippet);
            }
        }

        // adjust the last
        if (code.length != codeStatementPositions[codeStatementPositions.length - 1].endIndex + 1) {
            var lastStatementPos = codeStatementPositions[codeStatementPositions.length - 1];
            var lastCodeSnippet = code.substr(lastStatementPos.endIndex + 1,
                    code.length - lastStatementPos.endIndex);
            codeLines.push({code: lastCodeSnippet, isCodeStatement: false});
            executionCodeLines.push(lastCodeSnippet);
        }

        return {"executionCodeLines": executionCodeLines, "codeStatementLines": codeLines};
    };
    return CodeParser;
});