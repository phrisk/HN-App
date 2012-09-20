var serverAddress = "http://127.0.0.1:3000"

//	After the News listView has been loaded
$('#HNmainView').live('pageinit',function(event){

	showNews();
	
});

//////////////////////////////////////////////////
//	Main Application Functions
//////////////////////////////////////////////////

// Show the News Items
var showNews = function(){

	// Get the Raw JSON from the HackerNews API
	$.getJSON(serverAddress + "/links?callback=?",
	  function(data) {
	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.items, function(i,item){

	      $("#HNcontentarea").append("<li><a href='" + item.href + "'><h3>" + item.title + "</h3><p>" + item.points + " points by " + item.by + " " + item.date + " ago | " + item.comments + " comments</p><span class='ui-li-count'>" + item.points + "</span></a><a href='javascript:showComments(" + item.postid + ");'></a></li>");

	    });
	  }).complete(function() { $("#HNcontentarea").listview("refresh"); });
	  // Once complete, refresh the list view to update the styling

};

/* Take the clicked post's ID and use it to retrieve the post comments etc
var showComments = function( postID ){

	// Get the Raw JSON from the HackerNews API
	$.getJSON("http://api.ihackernews.com/post/" + postID,
	  function(data) {
	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.items, function(i,item){

	      $("#HNcontentarea").append("<li><a href='" + item.url + "'><h3>" + item.title + "</h3><p>" + item.points + " points by " + item.postedBy + " " + item.postedAgo + " | " + item.commentCount + " comments</p><span class='ui-li-count'>" + item.points + "</span></a><a href='http://news.ycombinator.com/item?id=" + item.id + "'>Purchase album</li>");

	    });
	  }).complete(function() { $("#HNcontentarea").listview("refresh"); });
	  // Once complete, refresh the list view to update the styling

}; */