// Search bar handler
$(function() {
  var searchField = $('#query');
  var icon = $('#search-btn');

  // Focus event handler
  $(searchField).on('focus', function() {
    $(this).animate({
      width: '100%' }, 400);
    $(icon).animate({
      right: '10px' }, 400);
  });

  // Blur event handler
  $(searchField).on('blur', function() {
      if (searchField.val() == '') {
          $(searchField).animate({
            width: '45%' }, 400, function(){});
          $(icon).animate({
            right: '360px' }, 400, function(){});
      }
  });

  $('#search-form').submit(function(e) {
    e.preventDefault();
  });

})



function search() {
  // Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  // Run GET request on API
  $.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: ''
      },
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // Log data
        console.log(data);

        // Loop through all the data. Data now available in the ~item~ variable
        $.each(data.items, function(i, item) {
          // Get output
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display the buttons
        $('#buttons').append(buttons);

      }
    );
};

// Next page function
function nextPage() {
  var token = $('#next-button').data('token');
  var q =  $('#next-button').data('query');

  // Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  // Run GET request on API
  $.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: ''
      },
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // Log data
        console.log(data);

        // Loop through all the data. Data now available in the ~item~ variable
        $.each(data.items, function(i, item) {
          // Get output
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display the buttons
        $('#buttons').append(buttons);

      }
    );
}

// // Previous page function
function prevPage() {
  var token = $('#prev-button').data('token');
  var q =  $('#prev-button').data('query');

  // Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  // Run GET request on API
  $.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: ''
      },
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // Log data
        console.log(data);

        // Loop through all the data. Data now available in the ~item~ variable
        $.each(data.items, function(i, item) {
          // Get output
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display the buttons
        $('#buttons').append(buttons);

      }
    );
}

// Build output (to display items)
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

// Build output String to show in HTML
   var output = '<li>'
   + '<div class="list-left">'
   + '<img src="'+thumb+'">'
   + '</div>'
   + '<div class="list-right">'
   + '<h3><a data-fancybox class="iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'
   + '<small>By: <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'
   + '<p>'+description+'</p>'
   + '</div>'
   + '</li>'
   + '<div class="clearfix"></div>'
   + '';

   return output;
}


// Build the buttons
function getButtons(prevPageToken, nextPageToken) {
  if(!prevPageToken) {
    var btnOutput = '<div class="button-container">'
    + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'
    + 'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnOutput = '<div class="button-container">'
    + '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"'
    + 'onclick="prevPage();">Previous Page</button>'
    + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'
    + 'onclick="nextPage();">Next Page</button></div>';
  }
  return btnOutput;
}
