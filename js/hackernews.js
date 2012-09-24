var serverAddress = 'http://127.0.0.1:3000'

//	After the News listView has been loaded
$('#HNmainView').live('pageinit',function(event){

	showNews();
	
});

// Listen for comment link to be clicked
$('.commentLink').live('click', function(evt){

    showComments( $(this).attr('id') );
    
});

//////////////////////////////////////////////////
//	Main Application Functions
//////////////////////////////////////////////////

// Show the News Items
var showNews = function(){

	// Get the Raw JSON from the HN-API
	var showNewsCall = $.getJSON(serverAddress + '/links?callback=?',
	  function(data) {
	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.items, function(i,item){

	      $('#HNcontentarea').append('<li><a href="#" id="' + item.postid + '" class="commentLink"><h3>' + item.title + ' <small style="font-weight:normal;font-size:0.6em;">' + item.domain + '</small></h3><p>' + item.points + ' points by ' + item.by + ' ' + item.date + ' ago | ' + item.comments + ' comments</p><span class="ui-li-count">' + item.comments + '</span></a><a href="' + item.url + '"></a></li>');

	    });
	  });

	// Once complete, refresh the list view to update the styling
	showNewsCall.complete(function() { $('#HNcontentarea').listview('refresh'); });

};

// Take the clicked post's ID and use it to retrieve the post: title, comments etc
// Load in a template for the view and populate it with the JSON data
var showComments = function( postID ){

	// indentColour and indentFormatting are used to colour code nested comments
	var indentColour = [ '', '#FFA200', '#FF4100', '#015666', '#04859D', '#FF4100', '#015666', '#04859D' ];
	var indentFormatting;

	// Comments view template which is loaded dynamically
	var commentView = '<div data-role="page" id="commentsView">' +
					  '<div data-role="header"><h1>Hacker News</h1>' +
					  '<a href="#HNmainView" class="ui-btn-left" data-icon="arrow-l">Back</a>' +
					  '</div>' +
					  '<div data-role="content" id="commentsHeader"></div>'  +
					  '<ul data-role="listview" data-inset="false" id="comments">' +
					  '</ul>' +
					  '</div>';

	// If there is an old commentView, remove it
	if( $('#commentsView') )
		$('#commentsView').remove();

	// Get the Raw JSON from the HN-API
	var showCommentsCall = $.getJSON(serverAddress + '/post/' + postID + '?callback=?',
	  function(data) {

	  	// First load the comments view template
	  	$('body').append(commentView);

	  	// Add title to view
	  	$('#commentsHeader').append('<a href="' + data.post.url + '" target="_blank">' + data.post.title + '</a><br><small>' + data.post.by + ' via ' + data.post.domain + '</small>');

	  	// Process each of the JSON items, appending them to the list view
	    $.each(data.comments, function(i,item){

	    	// Check if current comment is indented
	    	// if it is, colour code it accordingly
	    	if(item.indent>0)
	    		indentFormatting = 'border-left: solid 5px ' + indentColour[item.indent] + ';';
	    	else
	    		indentFormatting = '';

	      	$('#comments').append('<li id="' + item.id + '" style="margin-left:' + item.indent*50 + 'px;' + indentFormatting + '">' +
	      						'<small><p><b>' + item.by+ '</b> ' + item.date + ' ago' + '</p>' +
	      						item.text + '</small></li>');

	    });

	    if( data.comments.length == 0 )
	    	$('#comments').append('<li>There are no comments to display</li>');

	    // Switch to comments view
	    window.location.replace('#commentsView');

	  });

	// Once complete, refresh the list view to update the styling
	showCommentsCall.complete(function() { $('#comments').listview('refresh'); });

};