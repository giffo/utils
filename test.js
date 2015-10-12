/*
just tests it is installed correctly and everything works

more of a check rather than a test
*/


var utils = require("./index"); // change to giffo-utils


utils.builtins();


var str = "hello";

console.log("\n*********.builtins()");
console.log("contains true = " + str.contains("l"));
console.log("startswith true = " +str.startsWith("h"));
console.log("String.is true = "+String.is(str));
console.log("String.is false = "+String.is({}));

//TODO: more checks


console.log("\n*********random id");
console.log(utils.id(20));
console.log(utils.fastuuid());
console.log(utils.uuid())
console.log(utils.salt(8));
console.log(utils.hex(6));

console.log("\n*********hashes");
console.log(utils.md5("giffo-utils"));
console.log(utils.sha("giffo-utils"));
console.log(utils.sha256("giffo-utils"));
console.log(utils.sha512("giffo-utils"));
console.log(utils.hmac("md5", "my-key", "giffo-utils"));
console.log(utils.hmac("", "", "giffo-utils"));

console.log("\n*********number-wang");
var number = utils.randomNumber(2015);
console.log(number);
console.log(utils.numberSuffix(number));
if(utils.isNumber(number)) {
	console.log("numberWang!");	
} else {
	console.log("not a number - big problem, big problem");
}
console.log("padded "+ utils.padZeros(utils.randomNumber(1,9)));

utils.endTick(function(){
	console.log(".tick() printed last");	
});

console.log("\n\n.tick() printed above");


utils.inspect({name:"me", greeting:"what"});
utils.memory();
console.log(utils.time());
console.log(utils.timestamp());

