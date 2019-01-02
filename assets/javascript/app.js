$(document).ready(function() {
    var topics = [
        "cake",
        "pie",
        "cookies",
        "bread",
        "chocalate",
        "vanilla",
        "apple",
        "strawberry",
        "cheesecake",
        "ice cream",
        "gelato",
        "halo halo",
        "mochi",
        "fritter",
        "pastry"

    ];


    // var rating = ['PG', 'G'];

    // Example queryURL for Giphy API
    var apikey = '33r6HmHtPq3Os3xN54dVLKR8MM1Qs3lv';
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    // button generator
    function buttonGenerator(val) {
        var $gifButtons = $("#gifbuttons"); // #gifbuttons element

        var $gifButton = $("<button/>", {"class": 'btn btn-info'}); // create bootstrap button

        $gifButton.attr("value", val); // add value to button

        $gifButtons.append($gifButton); // attach button to #gifButtons div
    };

    // call button generator 
    topics.forEach(buttonGenerator());

    // card generator
    function cardGenerator(arg){
        var $gifID = $("#gifs");
        var $card = $("<div/>", {"class":"card", "id": arg.index}) // card class
        var $cardBody = $("<div/>", {"class": 'card-body'}); // card body
        var $cardHeader = $("<div/>", {"class": "card-header", text: arg.rating}); // gif rating
        var $cardStill = $("<img/>", {"class": "card-img-top", "src": arg.still}); // still image from URL
        var gifAnim = arg.url; // store GIF URL
        // var $cardTitle = $("<div/>", {"class": "card-title text-center " + cardID, text: value.name});
        // var $cardText = $("<div/>", {"class": "card-text text-center " + cardID, text: value.health});
    
        // append jquery elements to #gifs div element
       $gifID.append($card.append($cardBody.append($cardHeader, $cardStill)));
    }


    // API method
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
