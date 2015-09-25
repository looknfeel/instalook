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
	monthsWithPosts.shift();
	monthsWithPosts.sort();
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

	likesData = [];
	commentsData = [];
	scoreData = [];
	$.each(monthsWithPosts, function(){
		currentLikes = 0;
		currentComments = 0;
		currentScore = 0;

		$(".item[data-month="+this+"]").each(function(){
			currentLikes = parseInt(currentLikes) + parseInt($(this).attr("data-likes"));
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
	});

	console.log(likesData);
	console.log(commentsData);
	console.log(scoreData);

	var data = {
	    labels: monthsWithPosts,
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
	        }
	    ]
	};

	// Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#myChart").get(0).getContext("2d");
	// This will get the first returned node in the jQuery collection.
	var myLineChart = new Chart(ctx).Line(data, options);
}

function monthsCompare() {
	eliminatesMonthsFilterNotExistant();
	graph();
}

monthsCompare();
