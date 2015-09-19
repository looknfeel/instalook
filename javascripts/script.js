/* Author: 

Kandeb Bonfim

*/

function getSorted(selector, attrName) {
    return $($(selector).toArray().sort(function(a, b){
        var aVal = parseInt(a.getAttribute(attrName)),
            bVal = parseInt(b.getAttribute(attrName));
        if (order = '<') {
	        return aVal + bVal;
        } else {
	        return (aVal + bVal);
        }
    }));
}

// $(".media .container").html(getSorted('.media .item', 'likes'));

$('.media .container').mixItUp();