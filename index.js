var fs = require('fs'); // used by mkdir
var crypto = require('crypto'); // used by hash
var util = require("util");

var ID = require("giffo-id");

var builtins = require("./builtins");
// TODO: readfile, copyfile??????



	
function padZeros(n) {
	return n < 10 ? '0' + n.toString(10) : n.toString(10);
	return n > 9 ? n.toString(10): '0' + n.toString(10);
}

module.exports = (function(){

	var rng = new ID(2000); // change the name of this, it does more than id?
	
	
	
	
	/* inner functions */
	function hash(type, str) {
		// if(type == undefined) type = md5
		return crypto.createHash(type).update(str || "").digest("hex");
	}
	
	return {
		/* provides useful functions to String, Array and Function */
		builtins:function(){
			builtins();
		},
		
		/* defines method on a specific object in a safe way.
		 *
		 * usage:
		 * utils.define(Array, "max", function(){something...somthing..});
		 */
		define:builtins.define,
			
		
		/**
		 * returns a new object containing all the object's attributes given in the params
		 * 
		 */
		blend:function(ignoredArgs) {
			var base = {};

			for(var i=0;i<arguments.length;i++) {
				if(typeof(arguments[i]) === "object") {
					for(var key in arguments[i]) {
						if(arguments[i].hasOwnProperty(key)) {
							base[key] = arguments[i][key];  	
						}
					}
				}
			}

			return base;
  
		},
		
		
		/* clones objects not classes :P :( */
		clone:function(obj) { 
			var dolly = {};
			for (var key in obj) {
				dolly[key] = obj[key];
			}
			return dolly;
			
			/* crockford clone function */
			/*
			function F() {}
			F.prototype = o;
			return new F();
			*/
		},
		
		// overwrite present keys only, if a key is present in both its overwritten with the second param
		// o1 = {}
		overwrite:function(obj, sec) {
			for(var key in sec) {
				if(obj.hasOwnProperty(key)) {
					obj[key] = sec[key];
				}
			}
			return obj;
		},
		
		
		
		randomNumber:function(min, max) {
			// if no max variable then use min for max and min as zero
			if(typeof(max) === 'undefined'){
				max = min;
				min = 0;
			}
			
			return Math.floor(Math.random()*(max-min+1))+min;
			
		},


		
		
		id:function(size){
			return rng.next(size || 32);
			
			
		},


		uuid:function() { // version 4
			return rng.uuid();
		},
		
		// not crypto great compared with .uuid() technically. but very fast
		fastuuid:function(){
			var c = "89abcdef01234567";
			var arr = new Array(36);
			for(var i=0;i<36;i++) {
			  //arr[i] = c[Math.floor(Math.random()*16)];
			  arr[i] = c[(Math.random()*0xf000)&0xf];
			}

			arr[8] = arr[13] = arr[18] = arr[23] = "-";
			arr[14] = "4";
			arr[19] = c[(Math.random()*0x100) & 0x3]
			return arr.join("");
		},
		
		
		
		salt:function(size){
			return rng.base62(size);
			
		},
		
		hex:function(size) { // probably will remove this.
			return rng.hex(size);
		},
		
		
		
		/* hashes */
		
		md5:function(str) {
			return hash("md5", str);
		},
		
		sha:function(str){
			return hash("sha", str);
		},
		
		sha256:function(str) { // sha 256
			return hash("sha256", str);
		},
		
		sha512:function(str) {
			return hash("sha512", str);
		},
		
		// utils.hmac("md5", "my-key", "my-data");
		hmac:function(hashtype, key, data) {
			// validate hashtype
			if(hashtype !== "md5" && hashtype !== "sha" && hashtype !== "sha256" && hashtype !== "sha512") {
				hashtype = "md5";
			} // maybe use Array.indexOf?

			key = key || "";
			data = data || "";
			
			var hmac = crypto.createHmac(hashtype, key);
			hmac.setEncoding("hex");

			hmac.write(data);
			hmac.end();
			
			return hmac.read();
			
			// legacy method
			//return crypto.createHmac(hashtype, key).update(data).digest("hex");
		},
		
	
		
		
		/*
			timestamp should be the time epoch, and datestamp should be the data string
		*/
		
		
		// returns a UTC formated string of current time - Fri, 01 Jan 1990 00:00:00 GMT
		timestamp:function() {
			return new Date().toUTCString();	
		},
		
		time:function() {
			return Date.now();
		},
		
		// should this return "20th" or just "th"?
		numberSuffix:function(n) {
			//if(!""."endsWith")  //?untested line
				//return n;
			if(!"".endsWith) // checks if the method is available if not, return the given param
				return n;
		
			var e = "" + n; // convert to string
			if(e.endsWith("1") && !e.endsWith("11")) {return n+"st";}
			if(e.endsWith("2") && !e.endsWith("12")) {return n+"nd";}
			if(e.endsWith("3") && !e.endsWith("13")) {return n+"rd";}
			return n+"th";
		}, 
		
		// test this
		isNumber:function(n){
			return !isNaN(parseFloat(n)) && isFinite(n);
			
			
		},
		
		// checks to see if an object is empty like {}
		isObjectEmpty:function(obj) {
			for(var key in obj)
				return false;
			return true;
		},
		
		// just prints the current memory usage
		memory:function() {console.dir(util.inspect(process.memoryUsage()));},
		
		pad:padZeros,
		padZeros:padZeros,
		padNumber:padZeros,
		
		/**
		 * makes a directory given the path and its parents if it does not exist
		 * @param string dirString the path we wish to create
		 * @sync
		 * @recursive
		 * @self = calls itself
		 *
		 * example, 
		 * mkdir("c:\\super\\example\\test");
		 */		 
		mkdir:function(dirString) {
			if(!fs.existsSync(dirString)) {
				this.mkdir(path.resolve(dirString, '..'));
				fs.mkdirSync(dirString);
			} 
		
		},
		
		// nextTick and setImmediate are confusing names for their actual tasks
		// nextTick is actually end of the current tick
		// and 
		// setImmediate is actually start of the next tick
		// ?? maybe a seperate object with 2 methods tick.end = process.nextTick, tick.next = setImmediate
		endTick:process.nextTick, // end of this tick
		startTick:setImmediate, // start of next tick
		
		// this method needed redoing so i took it out
		tick:function(){
			console.log("404, not implemented yet");
			
		},
		
		// test this
		inspect:function(obj){
			return console.log(require('util').inspect(obj, {depth: null})); // require util is cached
		}
		
	
	}

})();



/*
	some useful utility funcs i use 



	function isObject(o) {
		return isSomething(o, "Object");
	}

	function isArray(a){
		return isSomething(a, "Array");
	}

	function isSomething(v, type) {
		return Object.prototype.toString.call(v) === '[object '+type+']';

	}
	
	
	function unique(arr) {
		var set = new Set();
		for(var i=0;i<arr.length;i++) {
			set.add(arr[i]);
		}
		var rArr = [];
		var it = set.values();
		for(var item of it)
			rArr.push(item);
		return rArr;
	}
	
*/