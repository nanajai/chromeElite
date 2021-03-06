$(document).ready(function() {
  $('#redditWidget').hide();
  $('#clock').hide();
  $('#background').hide();
  
  //Clock  
  function updateClock() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    if (minutes < 10)
      minutes = "0" + minutes

    $('#realClock').empty() // clear out prev
    $('#realClock').prepend('<h1>' + hours + ':' + minutes + '</h1>');
    setTimeout(updateClock, 3000)
  }
  updateClock();

  //Reddit
  $.get("http://www.reddit.com/r/pics",function(data,status) {
    var imageDOM = $(data).find("a").filter(function() {
      return $(this).attr('href').match(/.*jp[g|eg]/);
    });
    var length = imageDOM.size();
    var ran = Math.floor(Math.random() * length);
    var imageObj = imageDOM.get(ran);
    var image = $(imageObj).attr('href');
    var text = $(imageObj).text();
    $('#redditWidget').fadeIn("slow");
    $('#clock').fadeIn("slow");
    $("#background").css("background-image", "url("+image+")");
    $('#background').fadeIn('slow');
    $("#redditWidget").append('<img src="'+image+'">');
  });

  //Calendar
   $.ajax({
     url: 'https://www.google.com/calendar/feeds/epotter12%40gmail.com/private-abe8896746754799ccd2fadcb2e38818/basic?max-results=5&orderby=starttime&sortorder=ascending&futureevents=true',
    dataType: 'xml',
    success: parseXML
  });
  
  function parseXML(xml){
    $(xml).find('entry').each( function() {
      var summary =  $(this).find('summary').text();
      var title =  $(this).find('title').text();
      $('#calendarWidget').append('<h4>'+title + '</h4><h5>' + summary.substring(summary.indexOf('First start:')+12,summary.indexOf('First start:')+36)+ '</h5><br />');

   });
   }

});
