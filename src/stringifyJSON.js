// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === "number"|| typeof obj==="boolean"|| obj===null) {
  	return String(obj);
  }
  else if (typeof obj === "string") {
  	return "\""+obj+"\"";
  }
  else if (typeof obj === "undefined" || typeof obj==="symbol" || typeof obj==="function") {
  	return undefined;
  }
  else if (if Array.isArray(obj)) {
	var result = "[";
	for (var i=0; i<obj.length; i++) {
		if (i<obj.length-1) {
			if (stringifyJSON(obj[i])===undefined) result = result + "null" + ",";
			else result = result + stringifyJSON(obj[i]) + ",";
		}
		else {
			if (stringifyJSON(obj[i])===undefined) result = result + "null" + "]";
			else result = result + stringifyJSON(obj[i]) + "]";
		}
	}
	return result;
  }
};
