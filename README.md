jsAlgorithmVisualizer
=====================

This project is aimed at creating a library and service that can create visuals for simulation of algorithm


Notes for writing the jsav code.
1. Always use brackets for loops;
example : following is incorrect way.
 for( x = 0 ; x < 10 ; x++)
    stack.push();

 The correct way would be
 for(x = 0 ; x < 10 ; x++ ){
    stack.push();
 }

2. Do not use var in loop invariants
example : following is incorrect way
for( var x = 0 ; x < 10 ; x++ ){
    stack.push(x):
}

The correct way would be
 for( x = 0 ; x < 10 ; x++ ){
    stack.push(x);
 }