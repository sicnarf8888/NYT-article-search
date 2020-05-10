$("#search-btn").on("click", function() {
  var searchterm = $("#search-term").val().trim();
  var startYr = $("#start-year").val().trim();
  var endYr = $("#end-year").val().trim();
  var queryURL = "";
if(startYr == "" & endYr == ""){
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    + searchterm + "&api-key=0xsDbzpUAaE8VnGYtmAf814wlGkeicRA";
}else if(startYr = ""){
    endYr = parseInt(endYr);
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    + searchterm + "&facet_field=day_of_week&facet=true&end_date=" + endYr  + "0101"
    + "&api-key=0xsDbzpUAaE8VnGYtmAf814wlGkeicRA";
}else if(endYr = ""){
    startYr = parseInt(startYr);
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    + searchterm + "&facet_field=day_of_week&facet=true&begin_date=" + startYr + "0101"
    + "&api-key=0xsDbzpUAaE8VnGYtmAf814wlGkeicRA";
}else{
    startYr = parseInt(startYr);
    endYr = parseInt(endYr);
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="
    + searchterm + "&facet_field=day_of_week&facet=true&begin_date=" + startYr + "0101&end_date=" + endYr  + "0101"
    + "&api-key=0xsDbzpUAaE8VnGYtmAf814wlGkeicRA";
}
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      var results = response.response.docs;
      console.log(results)
      $(".article-list").empty();
      var articleNum = $("#select-number").val().trim();
      for (var i = 0; i < articleNum; i++) {
        var articleDiv = $("<div>");
        articleDiv.append("Title: " + results[i].headline.main + "<br>");
        articleDiv.append("Author: " + results[i].byline.original + "<br>");
        articleDiv.append("Section: " + results[i].section_name + "<br>");
        articleDiv.append("Date: " + results[i].pub_date + "<br>");
        articleDiv.append("URL: " + results[i].web_url + "<br><br>");
        articleDiv.css('border', '2px solid black');
        articleDiv.css('margin', '10px');
        $(".article-list").append(articleDiv);
      }
    });
});
$("#clear-form").on("click", function(){
  $(".article-list").empty();
});