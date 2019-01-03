$(document).ready(function() {
    var topics = [
        "Star Wars",
        "Blade Runner",
        "Tron",
        "Tron Legacy",
        "Interstellar",
        "The Last Starfighter",
        "Buck Rogers",
        "Star Trek",
        "Battlestar Galactica",
        "Firefly",
        "Cowboy Bebop",
        "Doctor Who"
    ];
    var $gifID = $("#gifs");

    var $gifButtons = $("#gifbuttons"); // #gifbuttons element
    $gifButtons.empty();

    var rating = 'pg'; // this rating plus anything below it.

    var searchLimit = 10; // limit searches to 10

    // Example queryURL for Giphy API
    var apikey = '33r6HmHtPq3Os3xN54dVLKR8MM1Qs3lv';
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    // button generator
    function buttonGenerator(val) {
        // loop through topics array
        // for (var i=0; i<val.length; i++) {


            var $gifButton = $("<button/>", {"class": 'btn btn-info mx-1 my-1', text: val}); // create bootstrap button
    
            $gifButton.attr("value", val); // add value to button
    
            $gifButtons.append($gifButton); // attach button to #gifButtons div
        // }


    };

    // call button generator 
    topics.forEach(function (item) {
        console.log(item);
        buttonGenerator(item);
    });

    // card generator
    function cardGenerator(arg){
        var newCard = arg;
        // generate 10 cards using for loop
        for (var i = 0; i < 10; i++) {
            var $card = $("<div/>", {"class":"card p-1 m-1"}); // card class
            // var $cardBody = $("<div/>", {"class": 'card-body'}); // card body

            // avoid blank titles
            var cardTitle;
            if (newCard.data[i].title === "") {
                cardTitle = "No Title";
            } else {
                cardTitle = newCard.data[i].title;
            }
            var $cardTitle = $("<p/>", {"class": "card-title", "text": cardTitle}); // gif rating
            var $cardSubtitle = $("<p/>", {"class": "card-subtitle", "text": newCard.data[i].rating.toUpperCase()}); // gif rating
            var $cardStill = $("<img/>", {"class": "card-img-top still", "src": newCard.data[i].images.fixed_width_still.url}); // still image from URL
            var $cardGIF = $("<img/>", {"class": "card-img-top gif", "src": newCard.data[i].images.fixed_width.url}); // gif image that is hidden by default
        
            // append jquery elements to #gifs div element
            $gifID.append($card.append($cardStill, $cardGIF.hide(), $cardTitle, $cardSubtitle));
        }
    };

    // toggle image and GIF method
    // function toggleImg() {
    //     // toggles self or this element between still and GIF animation
    // };

    // API method
    function giftastic(value) {
        // $("#gifs").empty();
        var imgQuery = value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imgQuery 
                                                    + "&api_key=" + apikey 
                                                    + "&rating=" + rating 
                                                    + "&limit=" + searchLimit;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            var imgResponse = response;
            console.log(imgQuery,imgResponse);
            // $("body").append($("<img/>", {"src": response.data[i].images.downsized.url}));
            // for (i=0; i < response.data.length; i++) {
            // for (i=0; i < 10; i++) {
            //     $("#gifs").append($("<img/>", {"src": response.data[i].images.preview_gif.url}));
            // }
            cardGenerator(imgResponse);
        });
    };

    $("#submit").click(function() {
        var value = $("#getimage").val();
        if (value !== '') {
            topics.push(value);
            $gifButtons.empty();
            // clear and rerender buttons
            $("#getimage").val('');
            topics.forEach(function (item) {
                buttonGenerator(item);
    });
            
        }

    });

    // this event method must work on newly generated buttons
    $(document).on("click", ".btn", function() {
        imgValue = $(this).val();
        giftastic(imgValue);
        // $("#getimage").val(imgValue);
        console.log(imgValue);
        
    });

    // click event for generated element
    $(document).on("click", ".card", function() {
        $(this).children(".still").toggle(); 
        $(this).children(".gif").toggle(); 
        console.log("Image Clicked");
    });


//------ end ------
});
