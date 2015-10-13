/*
just tests it is installed correctly and everything works

more of a check rather than a test
*/


var utils = require("giffo-utils");


utils.builtins();


var str = "hello";

console.log("\n*********.builtins()");
console.log("contains true = " + str.contains("l"));
console.log("startswith true = " +str.startsWith("h"));
console.log("String.is true = "+String.is(str));
console.log("String.is false = "+String.is({}));

var arr = [21,21,3,14,1,43];

console.log("array contains true = "+arr.contains(14));

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


utils.inspect({name:"me", greeting:"what"});
utils.memory();
console.log(utils.time());
console.log(utils.timestamp());

console.log("\n\n\ttesting .tick()")
var ccount = 0;
var f = function() {
	if(ccount++ % 10 == 9)
		console.log("hello"+ccount);
}

for(var i =0;i<200;i++)
	utils.tick(f)

utils.endTick(function(){
	console.log("somewhere in the middle");
})



console.log("first line");




