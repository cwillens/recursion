// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var currentChar = json[0];
  var currentIndex = 0;

  //next function
  var nextChar = function() {
  	currentIndex++;
  	currentChar = json[currentIndex];
  }

  if (json.charAt(0)==="\"") return parseString(json);
  else if (json.charAt(0)==="[") {
    nextChar();
    return parseArray(json);
  }
  else if (json.charAt(0)==="{") return parseObject(json);
  else if (["0","1","2","3","4","5","6","7","8","9"].indexOf(json.charAt(0)) > -1) return parseNumber(json);
  else if (["null", "true", "false"].indexOf(json)>-1) return parseOther(json);
  else if (json.charAt(0)===" ") nextChar();

  function parseString(input) {
  	return input.slice(1, input.length-1);
  }

  function parseNumber (input) {
  	return Number(input);
  }

  function parseOther (input) {
  	//probably a nicer way to do this
  	if (input==="null") return null;
  	else if (input==="true") return true;
  	else return false;
  }

  function parseArray (input) {
  	var result = [];
  	var item = "";
  	while (currentChar!==","&& currentIndex<json.length-1) {
  		item+=currentChar;
  		nextChar();
  	}
  	if (currentChar===",") nextChar();
  	result.push(parseJSON(item));
  	while (currentIndex<json.length-1) {
  		result=result.concat(parseArray("["+input.slice(currentIndex)));
  	}
  	return result;
  }



};
