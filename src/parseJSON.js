// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
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
  else if (json.charAt(0)==="{") {
  	nextChar();
  	return parseObject(json);
  }
  else if (["0","1","2","3","4","5","6","7","8","9", ".", "-"].indexOf(json.charAt(0)) > -1) return parseNumber(json);
  else if (["null", "true", "false"].indexOf(json)>-1) return parseOther(json);
  else if (json.charAt(0)===" ") nextChar();

  function parseString(input) {
  	if (input==="\"\"") return "";
  	else return input.slice(1, input.length-1);
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
  	if (input==="[]") return [];
  	var result = [];
  	var item = "";
  	var numSquare=0; //to keep track of square brackets
  	var numCurly=0; //to keep track of curly brackets
  	//cut out blank spaces
  	while (currentChar===" ") nextChar();

  	if (currentChar==="[") {
  	  numSquare+=1;	
      item+=currentChar;
      nextChar();
      while (numSquare>0 && currentIndex<json.length-1) {
      	  if (currentChar==="[") numSquare +=1;
      	  if (currentChar==="]") numSquare -=1;
          item+=currentChar;
          nextChar();
      } 
     // nextChar();
  	}
  	else if (currentChar==="{") {
  	  numCurly+=1;
      item+=currentChar;
      nextChar();
      while (numCurly>0 && currentIndex<json.length-1) {
      	  if (currentChar==="{") numCurly +=1;
      	  if (currentChar==="}") numCurly -=1;
          item+=currentChar;
          nextChar();
      } 
     // nextChar();
  	}
  	else {
      while (currentChar!==","&& currentIndex<json.length-1) {
          item+=currentChar;
          nextChar();
      } 
      //cut off possible blanks before the comma
      var endItem=item.length;
      while (item.charAt(endItem)===" ") endItem-=1;
      item=item.slice(0,endItem);
  	}
  	//cut out blank spaces
  	while (currentChar===" ") nextChar();
  	//go past comma
  	nextChar();
  	if (currentChar===" ") nextChar();
  	result.push(parseJSON(item));
  	while (currentIndex<json.length-1) {
        var newSlice="["+input.slice(currentIndex);
  		result=result.concat(parseArray(newSlice));
  	}
  	return result;
  }

  function parseObject(input) {
  	if (input==="{}") return {};
  	var result={};
  	var key="";
  	var item="";
  	var numSquare=0; //to keep track of square brackets
  	var numCurly=0; //to keep track of curly brackets

  	//grab key
    //want to start after possible blanks
  	while (currentChar===" ") nextChar();
  	while (currentChar!==":"&& currentIndex<json.length-1) {
  		key+=currentChar;
  		nextChar();
  	}
  	var endKey=key.length-1;
  	while (key.charAt(endKey)===" ") endKey-=1;
  	key=key.slice(0,endKey+1);
  	if (currentChar===":") nextChar();
  	//cut out blank spaces
  	while (currentChar===" ") nextChar();
  	//grab item
  	if (currentChar==="[") {
  	  numSquare+=1;
      item+=currentChar;
      nextChar();
      while (numSquare>0 && currentIndex<json.length-1) {
      	  if (currentChar==="[") numSquare +=1;
      	  if (currentChar==="]") numSquare -=1;
          item+=currentChar;
          nextChar();
      } 
     // nextChar();
  	}
  	else if (currentChar==="{") {
  	  numCurly+=1;
      item+=currentChar;
      nextChar();
      while (numCurly>0 && currentIndex<json.length-1) {
      	  if (currentChar==="{") numCurly +=1;
      	  if (currentChar==="}") numCurly -=1;
          item+=currentChar;
          nextChar();
      } 
     // nextChar();
  	}
  	else {
      while (currentChar!==","&& currentIndex<json.length-1) {
          item+=currentChar;
          nextChar();
      } 
      //cut off possible blanks before the comma
      var endItem=item.length;
      while (item.charAt(endItem)===" ") endItem-=1;
      item=item.slice(0,endItem);
  	}
  	//cut out blank spaces if there are some before the comma
  	while (currentChar===" ") nextChar();
  	nextChar(); 
  	if (currentChar===" ") nextChar();
  	result[parseJSON(key)]= parseJSON(item);
  	
  	while (currentIndex<json.length-1) {
  		$.extend(result, parseObject("{"+input.slice(currentIndex)));
  	}
  	return result;  	
  }



};