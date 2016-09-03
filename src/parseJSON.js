// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  //next function

  if (json.charAt(0)==="\"") return parseString(json);
  else if (json.charAt(0)==="[") return parseArray(json);
  else if (json.charAt(0)==="{") return parseObject(json);
  else if (["0","1","2","3","4","5","6","7","8","9"].indexOf(json.charAt(0)) > -1) return parseNumber(json);
  else if (["null", "true", "false"].indexOf(json)>-1) return parseOther(json);

  var parseString = function(input) {
  	return input.slice(1, input.length-1);
  }

  var parseNumber = function(input) {
  	return Number(input);
  }

  var parseOther = function(input) {
  	//probably a nicer way to do this
  	if (input==="null") return null;
  	else if (input==="true") return true;
  	else return false;
  }



};
