// js builtins

// seperate file for maintaining purposes
// I've included in comments all old versions of the methods for my own interest



function define(obj, name, method) {
	
	if((method && typeof(method) === "function")
		&& (name && typeof(name) === "string")
		&& (obj && (typeof(obj) === "object" || typeof(obj)=== "function"))) {
		if(!obj.prototype.hasOwnProperty(name)) {
			Object.defineProperty(obj.prototype, name, {
				enumerable:false,
				value:method
			});
		} else {console.log(obj+".prototype."+name+" already exists");}
	} else { // input parameters not correct/acceptable
		console.log("utils.define method - params not correct.");
	}
}


// updated after reading and testing - https://www.echosteg.com/nodejs-util-inherits-how-inheritance-works
var inherit = function (ctor, superCtor) {
    ctor.super_ = superCtor;
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
};


module.exports = function() {

	/* Array */

	define(Array, "contains", function(obj) {
		return ~this.indexOf(obj)?true:false;
	});


	/*
		this.reduce(function(previous,current){
			return previous > current ? previous:current
        });
	*/

	define(Array, "max", function(){
		// check js perf using chrome browser to compare speeds
		// probably the best fastest method
		//return this.sort().pop(); // and probably shift for min

		//return Math.max.apply(Math, this);

		var highest = Number.MIN_VALUE; //NEGATIVE_INFINITY;
		var tmp;
		

		// simple linear lookup
		for(var i=0,l=this.length;i<l;i++) {
			tmp = this[i];
			if(tmp > highest) {
				highest = tmp;
			}
		}
		return highest;

	});


	define(Array, "min", function(){
		//return Math.min.apply(Math, this);

		var lowest = Number.MAX_VALUE; //POSITIVE_INFINITY;
		var tmp;
		//for(var i=this.length-1; i>-1;i--) {
		for(var i=0,l=this.length;i<l;i++) {
			tmp = this[i];
			if(tmp < lowest) {
				lowest = tmp;
			}
		}
		return lowest;
	});



	define(Array, "sum", function(){
		return this.reduce(function(p,c){
			return p+c;
		});
	});


	/* String */
/* //now included in node
	define(String, "startsWith", function(s){
		return this.indexOf(s) == 0;
	});


	define(String, "endsWith", function(s){
		return this.indexOf(s, this.length - s.length) !== -1;
	});
*/

	define(String, "equals", function(s){
		return (this.toString() === s.toString()); // add utf8?
	});


	define(String, "contains", function(s){
		return (this.indexOf(s) != -1);
	});


	define(String, "replaceAll", function(f,r) {
		return this.replace(new RegExp(f,'g'),r);
	});

	// usage: "hello".cap();

	var cap = function(){
		return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase();
	}
	
	// capitalise entire sentence/title, used for nations or places or football team names

	define(String, "capAll", function() {
		var words = this.split(" ");
		var stopList = ["and", "the", "of"];
		for(var i=0;i<words.length;i++) {
			if(stopList.indexOf(words[i]) == -1)
				words[i] = words[i].charAt(0).toUpperCase()+words[i].slice(1).toLowerCase();
		
		
		}
		return words.join(" ");
	
	});
	

	define(String, "capitalize", cap);
	define(String, "cap", cap)
	
/*	
	// costa rica becomes Costa Rica
	// TODO: create a better function of this in giffo-cap/cap.js dir
	define(String, "capAll", function() {
		var s = this.split(" "); // split by space
		var str = "";
		for(var i=0;i<s.length;i++) {
			s[i] = s[i].cap();
		}
				
		
		return s.join(" ");
		
	});
*/

	//define(String, "escape", function() {return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");});

	/**
	 * transform a string into a url slug, clean and readable
	 * e.g.
	 * this is a "test" => this-is-a-test
	 * 
	 * the param is optional, it limits the number of characters of the slug returned
	 * TODO: foreign characters to english chars needs thinking about
	 */


	define(String, "slug", function(limit) {
		return this.substring(0, (limit && limit > 0)?limit:null || this.length).replace(/[\s_\.]+/g, "-").replace(/[\'\"?]+/g,"").toLowerCase();
	});

	
	define(String, "insert", function(str, pos) {
		if(pos && pos > 0)
			return this.substring(0, pos) + str + this.substring(pos);
		return this + "" + str;


	});

	/* Function */

	
	// checks to see if one class is the same type?
	//usage:
	//String.is("a string")
	define(Function, "is", function(that){
			return that != null && (this.prototype.constructor === that.constructor);
	});

	// alias .call to subclass aka super

	/**
	usage:

	var GameObject = function(x, y) {
		//Point.call(this, x, y);
		Point.subclass(this, x, y); // maybe call it .construct?
	}
	
	GameObject.inherit(Point);
	var p = new Point(20, 20);

	var g = new GameObject(20, 20);
	console.log(p.toString())
	console.log(g.toString())

	*/
	
	define(Function, "subclass", Function.prototype.call);

	define(Function, "inherit", function(parent) {
		inherit(this, parent);	
	});



} // end of builtins function


module.exports.define = define;


	/*

todo: decide on remove, probably with just the position to remove, not from/to etc

	define(Array, "remove", function(from, to){
		return this.splice(from, (to-from||0)+1);
	});

	define(Array, "remove", function(position) {
		if(position < this.length && position > -1) {
			return this.splice(position, 1);
		}
		return [];
	});

	/*

	// Array Remove - By John Resig (MIT Licensed)
	// @ http://ejohn.org/blog/javascript-array-remove/
	///////tooooooo slow
	define(Array, "remove", function(from, to) {

		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	});

	*/




