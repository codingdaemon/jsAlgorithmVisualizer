/**
 * Created by nitiraj on 19/4/14.
 */

function S4() {
    return (Math.floor((1+Math.random())*0x10000)).toString(16).substring(1);
}

console.log(S4());
// then to call it, plus stitch in '4' in the third group
//guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
//console.log(guid);