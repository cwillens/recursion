// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  /* var results=[];
  1. look at all nodes in document and see if they have class classname
  		to do this: a) Document.body.childNodes gives an array of all of the elements in the body
  		.classList - this gives an array of the classes for an element. needs to be done on an element,
  		not an array b) so if we do classList on each element in doc.body.childnodes we can test if our
  		class is in the list and if so push it into the results array.
   */
   
   var results = [];
   var checkForClass = function(node) {

   		if (node.childNodes.length===0) {
   		    if (node.classList===undefined) return;
            else if (node.classList.contains(className)) {
                results.push(node);
   		        return;	
            }		
   		}
   		else {
   			if (node.classList.contains(className)) results.push(node);
   			for (var i=0; i<node.childNodes.length; i++) {
   				checkForClass(node.childNodes[i]);
   			}
   		}
   };

   checkForClass(document.body);
   return results;
};
