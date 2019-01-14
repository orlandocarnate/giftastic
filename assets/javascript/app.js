$(document).ready(function() {
    var topics = [
        "Star Wars", "Blade Runner", "Tron", "Tron Legacy", "Interstellar",
        "The Last Starfighter", "Buck Rogers", "Star Trek", "Battlestar Galactica",
        "Firefly", "Cowboy Bebop", "Doctor Who"
    ];
    var $gifID = $("#gifs");

    var $gifButtons = $("#gifbuttons"); // #gifbuttons element
    var rating = 'pg'; // this rating plus anything below it.
    var searchLimit = 10; // limit searches to 10

    // Example queryURL for Giphy API
    var apikey = '33r6HmHtPq3Os3xN54dVLKR8MM1Qs3lv';

    var giftastic = {
        // API method - getting data object from Giphy
        giphy: function (value, offset) {
            var imgQuery = value;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imgQuery 
                                                        + "&api_key=" + apikey 
                                                        + "&rating=" + rating 
                                                        + "&limit=" + searchLimit
                                                        + "&offset=" + offset;
            console.log(queryURL);
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                var imgResponse = response;
                console.log(imgQuery,imgResponse);
                giftastic.cardGenerator(imgResponse);
            });
        },

        // button generator
        buttonGenerator: function (val) {
            // create bootstrap button
            var $gifButton = $("<button/>", 
                {
                    "class": 'btn-topic', 
                    "data-imgoffset": 0, 
                    "data-active": "false",
                    "text": val
                }); 
            $gifButton.attr("value", val); // add value to button
            $gifButtons.append($gifButton); // attach button to #gifButtons div
        },

        // card generator
        cardGenerator: function (arg){
            var newCard = arg;
            // generate 10 cards using for loop
            for (var i = 0; i < 10; i++) {
                var $cardContainer = $("<div/>", {"class": 'card-container'}); // card container
                var $card = $("<div/>", {"class":"card"}); // card class
                var cardName;
                if (newCard.data[i].title === "") {     // fill blank titles
                    cardName = "No Title";
                } else {
                    cardName = newCard.data[i].title;
                }
                var $cardName = $("<div/>", {"class": "card-name"}); // gif rating
                var $cardRating = $("<div/>", {"class": "card-rating", "text": "Rating: " + newCard.data[i].rating.toUpperCase()}); // gif rating
                var $cardStill = $("<img/>", {"class": "still", "src": newCard.data[i].images.fixed_height_still.url}); // still image from URL
                var $cardGIF = $("<img/>", {"class": "gif", "src": newCard.data[i].images.fixed_height.url}); // gif image that is hidden by default
            
                // append jquery elements to #gifs div element
                $gifID.prepend($cardContainer.append($card.append($cardStill, $cardGIF.hide(), $cardName, $cardRating)));
                $cardName.html(cardName);
            }
        },
    }

    // call button generator 
    topics.forEach(function (item) {
        console.log(item);
        giftastic.buttonGenerator(item);
    });

    $("#submit").click(function() {
        var value = $("#getimage").val();
        if (value !== '') {
            topics.push(value);
            $gifButtons.empty();
            // clear and rerender buttons
            $("#getimage").val('');
            topics.forEach(function (item) {
                giftastic.buttonGenerator(item);
            });
        }
    });

    // this event method must work on newly generated buttons
    $(document).on("click", ".btn-topic", function() {
        imgValue = $(this).val();
        imgOffset = $(this).attr("data-imgoffset");

        // if current topic is not clicked, clear #gifs div
        if ($(this).attr("data-active") === "false") {
            $("#gifs").empty();
            // reset all the button offsets to 0
            $("#gifbuttons").children(".btn").attr("data-imgoffset", "0");
            // set all button data-active to false
            $("#gifbuttons").children(".btn").attr("data-active", "false");
            $(this).attr("data-active", "true");
        };

        // send two values to giftastic object
        giftastic.giphy(imgValue, imgOffset);

        // increase button's offset value by 10
        imgOffset = parseInt(imgOffset) + 10;
        console.log("button offset:",imgOffset);
        $(this).attr("data-imgoffset", imgOffset);
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
