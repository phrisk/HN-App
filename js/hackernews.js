var serverAddress = "http://127.0.0.1:3000"

//	After the News listView has been loaded
$('#HNmainView').live('pageinit',function(event){

	showNews();
	
});

// Listen for comment link to be clicked
$(".commentLink").live("click", function(evt){

    showComments( $(this).attr('id') );
    
});

//////////////////////////////////////////////////
//	Main Application Functions
//////////////////////////////////////////////////

// Show the News Items
var showNews = function(){

	// Get the Raw JSON from the HN-API
	var showNewsCall = $.getJSON(serverAddress + "/links?callback=?",
	  function(data) {
	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.items, function(i,item){

	      $("#HNcontentarea").append("<li><a href='" + item.href + "'><h3>" + item.title + "</h3><p>" + item.points + " points by " + item.by + " " + item.date + " ago | " + item.comments + " comments</p><span class='ui-li-count'>" + item.points + "</span></a><a href='#' id='" + item.postid + "' class='commentLink'></a></li>");

	    });
	  });

	// Once complete, refresh the list view to update the styling
	showNewsCall.complete(function() { $("#HNcontentarea").listview("refresh"); });

};

// Take the clicked post's ID and use it to retrieve the post: title, comments etc
// Load in a template for the view and populate it with the JSON data
var showComments = function( postID ){

	var commentView = "<div data-role='page' id='commentsView'>" +
					  "<div data-role='header' id='commentsHeader'>" +
					  "<a href='#HNmainView' class='ui-btn-left' data-icon='arrow-l'>Back</a>" +
					  "</div>" +
					  "<ul data-role='listview' data-inset='false' id='comments'>" +
					  "</ul>" +
					  "</div>";

	// If there is an old commentView, remove it
	if( $("#commentsView") )
		$("#commentsView").remove();

	// Get the Raw JSON from the HN-API
	var showCommentsCall = $.getJSON(serverAddress + "/post/" + postID + "?callback=?",
	  function(data) {

	  	// First load the comments view template
	  	$("body").append(commentView);

	  	// Add title to view
	  	$("#commentsHeader").append("<h1>" + data.post.title + "</h1>");

	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.comments, function(i,item){

	      $("#comments").append("<li>" + item.text + "</li>");

	    });

	    // Switch to comments view
	    window.location.replace("#commentsView");

	  });

	// Once complete, refresh the list view to update the styling
	showCommentsCall.complete(function() { $("#comments").listview("refresh"); });

};