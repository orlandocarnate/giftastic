$(document).ready(function() {
    // Example queryURL for Giphy API
    var apikey = '33r6HmHtPq3Os3xN54dVLKR8MM1Qs3lv';
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";


    function giftastic(value) {
        $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + apikey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        // $("body").append($("<img/>", {"src": response.data[i].images.downsized.url}));
        // for (i=0; i < response.data.length; i++) {
        for (i=0; i < 10; i++) {
            $("#gifs").append($("<img/>", {"src": response.data[i].images.preview_gif.url}));
        }
        });
    }

    $("button").click(function() {
        var value = $("#getimage").val();
        if (value !== '') {
            giftastic(value);
        }

    })

})
