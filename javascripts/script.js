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
			$(this).remove();
		}
	});
	monthsWithPosts.shift();
	monthsWithPosts.sort();
}

function defineMediaAverageScore() {
	var sum = 0;
	var posts = $(".item.mix:visible");
	posts.each(function(){
	  sum += parseInt( $(this).attr("data-score"), 10 ); //don't forget to add the base
	});

	var avg = (sum/posts.length).toFixed(2);
	// console.log(avg);
	return avg;
}

function graphData() {
	likesData = [];
	commentsData = [];
	scoreData = [];
	averageData = [];
	postCount = [];
	$.each(monthsWithPosts, function(){
		currentLikes = 0;
		currentComments = 0;
		currentScore = 0;
		currentPosts = 0;

		$(".item[data-month="+this+"]").each(function(){
			currentLikes = parseInt(currentLikes) + parseInt($(this).attr("data-likes"));
			currentPosts++;
		});

		$(".item[data-month="+this+"]").each(function(){
			currentComments = parseInt(currentComments) + parseInt($(this).attr("data-comments"));
		});

		$(".item[data-month="+this+"]").each(function(){
			currentScore = parseInt(currentScore) + parseInt($(this).attr("data-score"));
		});

		likesData.push(currentLikes);
		commentsData.push(currentComments);
		scoreData.push(currentScore);
		postCount.push(currentPosts);
	});

	for (var i = 0; i < scoreData.length; i++) {
		var currentAverage = parseFloat(scoreData[i] / postCount[i]);
		var currentAverage = currentAverage.toFixed(1);
		averageData.push(currentAverage);
	};
}

function graphLabels() {
	labels = [];
	monthsNames = [];
	for (var i = 0; i < postCount.length; i++) {
		var monthLabel = $(".filter[data-filter=\\."+monthsWithPosts[i]+"]").text();
		labels[i] = monthLabel+" ("+postCount[i]+")";
		monthsNames[i] = monthLabel;
	};
}

function graph() {
	var options = {                                   // /Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,                    // String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",       // Number - Width of the grid lines
	    scaleGridLineWidth : 1,                       // Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,               // Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,                 // Boolean - Whether the line is curved between points
	    bezierCurve : true,                           // Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,                     // Boolean - Whether to show a dot for each point
	    pointDot : true,                              // Number - Radius of each point dot in pixels
	    pointDotRadius : 4,                           // Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,                      // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,                 // Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,                         // Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,                       // Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,                           // String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};

	graphData();
	graphLabels();

	var data = {
	    labels: labels,
	    datasets: [
	    		{
	    		    label: "score",
	    		    fillColor: "rgba(240,78,35,0.2)",
	    		    strokeColor: "rgba(240,78,35,1)",
	    		    pointColor: "rgba(240,78,35,1)",
	    		    pointStrokeColor: "#fff",
	    		    pointHighlightFill: "#fff",
	    		    pointHighlightStroke: "rgba(220,220,220,1)",
	    		    data: scoreData
	    		},
	        {
	            label: "likes",
	            fillColor: "rgba(139,195,74,0.2)",
	            strokeColor: "rgba(139,195,74,1)",
	            pointColor: "rgba(139,195,74,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: likesData
	        },
	        {
	            label: "comments",
	            fillColor: "rgba(66,128,202,0.2)",
	            strokeColor: "rgba(66,128,202,1)",
	            pointColor: "rgba(66,128,202,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: commentsData
	        },
	        {
	            label: "media",
	            fillColor: "rgba(96,125,139,0)",
	            strokeColor: "rgba(96,125,139,1)",
	            pointColor: "rgba(96,125,139,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: averageData
	        }
	    ]
	};

	// Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#myChart").get(0).getContext("2d");
	// This will get the first returned node in the jQuery collection.
	var myLineChart = new Chart(ctx).Line(data, options);
}

function findIncrease(num1, num2) {
	return ((num2 - num1) / num1 * 100);
}

function increaseIndicators() {
	for (var i = 0; i < scoreData.length - 1; i++) {
		var growth = findIncrease(scoreData[i], scoreData[i+1]).toFixed(1);
		var sign = growth > 0 ? 1 : growth == 0 ? 0 : -1;
		var tag = $("<span class='percentage'>"+growth+"%</span>");
		if (sign == 1) {
			tag.addClass("positive");
		} else {
			tag.addClass("negative");
		}

		$(".filter.month:eq("+(i + 1)+")").append(tag);
	};
}

function monthsCompare() {
	eliminatesMonthsFilterNotExistant();
	graph();
	increaseIndicators();
}

function mediaApproval() {
	$(".status").removeClass("green red");
	setTimeout(function(){
		if ($(".filter.month.active").attr("data-filter") == "all") {
			var average = defineMediaAverageScore();
		} else {
			var average = previous.scoreAverage;
		}
		var posts = $(".item.mix:visible");
		posts.each(function(){
			var media = $(this);
			var current = parseInt(media.attr("data-score"));
			var status = media.find(".status");
			var percentage = findIncrease(average, current).toFixed(1);
			status.text(percentage+'%');
			if (percentage >= 8) {
				status.addClass("green");
			} else {
				status.addClass("red");
			}
		});
	}, 2000);
}

function getMonthsData(monthIndex) {
	if (monthIndex >= 1) {

		monthIndex--;
		current = {};
		current.month = monthsNames[monthIndex];
		current.totalScore = scoreData[monthIndex];
		current.scoreAverage = averageData[monthIndex];
		current.mediaCount = postCount[monthIndex];
		// console.log(current);

		monthIndex--;
		previous = {};
		previous.month = monthsNames[monthIndex];
		previous.totalScore = scoreData[monthIndex];
		previous.scoreAverage = averageData[monthIndex];
		previous.mediaCount = postCount[monthIndex];
		// console.log(previous);

		diff = {};
		diff.totalScore = findIncrease(previous.totalScore, current.totalScore).toFixed(1);
		diff.scoreAverage = findIncrease(previous.scoreAverage, current.scoreAverage).toFixed(1);
		console.log(diff);

		applyMonthsData();
	};
}

function applyMonthsData() {
	$(".js-data").text('--');

	$(".js-prev-mont").text(previous.month);
	$(".js-curr-mont").text(current.month);

	$("#js-prev-pont").text(previous.totalScore);
	$("#js-prev-aver").text(previous.scoreAverage);
	$("#js-prev-medi").text(previous.mediaCount);
	$("#js-curr-pont").text(current.totalScore);
	$("#js-curr-aver").text(current.scoreAverage);
	$("#js-curr-medi").text(current.mediaCount);

	$(".data.percentage").removeClass('positive negative');

	$("#js-diff-pont").text(diff.totalScore+"%");
	if (diff.totalScore >= 8) {
		$("#js-diff-pont").addClass('positive')
	} else {
		$("#js-diff-pont").addClass('negative')
	}

	$("#js-diff-medi").text(diff.scoreAverage+"%");
	if (diff.scoreAverage >= 8) {
		$("#js-diff-medi").addClass('positive')
	} else {
		$("#js-diff-medi").addClass('negative')
	}
}

$(document).ready(function(){
	monthsCompare();
	mediaApproval();
});

$(".filter").click(function(){
	mediaApproval();
	showHideGraphs();
	getMonthsData($(this).index());
});

function showHideGraphs() {
	if ($(".filter.month.active").attr("data-filter") == "all") {
		$("section.graphs#all").show();
		$("section.graphs#month").hide();
	} else {
		$("section.graphs#all").hide();
		$("section.graphs#month").show();
	}
}
