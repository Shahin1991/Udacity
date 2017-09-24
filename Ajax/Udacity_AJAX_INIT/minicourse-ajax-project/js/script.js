
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var cityStr = $('#city').val();
    var streetStr = $('#street').val();

    var address = streetStr+", "+cityStr;

    $greeting.text("So you want to line at "+address+"?");

    var streetAddressUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address;
    $body.append('<img class="bgimg" src="'+streetAddressUrl+'">');
    // load streetview

    // YOUR CODE GOES HERE!
    var url = "https://api.nytimes.com/svc/search/v2/articlesrearch.json";
    url += '?' + $.param({
        'api-key': "50800bd17c0648b48a71ff2c04412ffe",
        'q':cityStr,
        'sort':'newest'
      });


    $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        var items=[];
        console.log(result);
        console.log(result.length);
        var articles = result.response.docs;
        $nytHeaderElem.text('Newyork Times article for city - '+cityStr);
        // $.each(result, function(key,val){
        //    check1=key;
        //    console.log(key);
        //    //console.log(value);
        //     // items.push("<li id='"++);
        // });
        for (var i=0;i<articles.length;i++)
        {
            console.log("<li class='article'><a href='"+articles[i].web_url+"'>"+articles[i].headline.main+"</a><p>"+articles[i].snippet+"</p></li>");
            $nytElem.append("<li class='article'><a href='"+articles[i].web_url+"'>"+articles[i].headline.main+"</a><p>"+articles[i].snippet+"</p></li>");
        }
      }).fail(function(err) {
        $nytHeaderElem.text('Could not load article'+err);
        throw err;
      });

    return false;
};

$('#form-container').submit(loadData);
