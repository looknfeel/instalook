/* Author: 

Kandeb Bonfim

*/

$('.media .container').mixItUp();

function unique(list) {
	var result = [];
	$.each(list, function(i, e) {
	  if ($.inArray(e, result) == -1) result.push(e);
	});
	return result;
}

function getAllMediaMonths() {
	months = [];
	$(".media .item").each(function(){
		// console.log(this);
		var dataMonth = $(this).attr("data-month");
		months.push(dataMonth);
	});
	months.push("all");
	months = unique(months);

	return months;
}

function eliminatesMonthsFilterNotExistant() {
	currentMonths = getAllMediaMonths();
	// console.log(currentMonths);
	monthsWithPosts = [];
	$(".filter.month").each(function(){
		var filterAttribute = $(this).attr("data-filter").replace(".", "");
		if (currentMonths.indexOf(filterAttribute) > -1) {
			monthsWithPosts.push(filterAttribute);
		} else {
			$(this).hide();
		}
	});
}

function monthsCompare() {
	eliminatesMonthsFilterNotExistant();

}

monthsCompare();