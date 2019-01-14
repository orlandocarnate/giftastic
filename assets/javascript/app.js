$(document).ready(function() {
    var topics = [
        "Chicago", "London", "Paris", "Hong Kong", "Seoul"
    ];

    // var topics = [
    //     "Star Wars", "Blade Runner", "Tron", "Tron Legacy", "Interstellar",
    //     "The Last Starfighter", "Buck Rogers", "Star Trek", "Battlestar Galactica",
    //     "Firefly", "Cowboy Bebop", "Doctor Who"
    // ];

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

        //API for HERE's place search
        // searchPlace: function(arg) {
        //     var appID = "tjj6VJZDXVLQe1myb3qf";
        //     var appCode = "M-Z5rc6h_R8NnTOwcz-zzQ";

        //     var placeQuery = "https://places.cit.api.here.com/places/v1/discover/explore";
        //     placeQuery += "?app_id=" + appID;
        //     placeQuery += "&app_code=" + appCode;
        //     placeQuery += "&q=" + arg;
        //     placeQuery += "&cat=sights-museums";
        //     placeQuery += "&pretty";
        //     console.log("placeQuery: ", placeQuery);
        //     $.ajax({
        //         url: placeQuery,
        //         method: "GET"
        //         }).then(function(response) {
        //             var placeResponse = response;
        //             console.log(placeResponse);
        //             // giftastic.newFunction(placeResponse);
        //         });

            
        // },

        //API for Wikipedia's search
        searchPlace: function(arg) {
            var appID = "tjj6VJZDXVLQe1myb3qf";
            var appCode = "M-Z5rc6h_R8NnTOwcz-zzQ";

            var wikiRESTAPI = "https://en.wikipedia.org/api/rest_v1/page/summary/";
            wikiRESTAPI += arg;
            // wikiRESTAPI += "&origin=*"; // Used to prevent CORS

            // var placeQuery = "http://en.wikipedia.org/w/api.php";
            // placeQuery += "?format=json";
            // placeQuery += "&action=query";
            // placeQuery += "&titles=" + arg;
            // placeQuery += "&prop=description";
            // placeQuery += "&origin=*";

            //opensearch string
            // placeQuery += "?format=json";
            // placeQuery += "&action=opensearch";
            // placeQuery += "&search=" + arg;
            // placeQuery += "&namespace=0";
            // placeQuery += "&limit=1";
            // placeQuery += "&origin=*"
            console.log("wikiRESTAPI: ", wikiRESTAPI);
            $.ajax({
                url: wikiRESTAPI,
                method: "GET"
                }).then(function(response) {
                    console.log(response);
                    // giftastic.newFunction(placeResponse);
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

        addButton: function() {
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

        },
    }

    // call button generator 
    topics.forEach(function (item) {
        console.log(item);
        giftastic.buttonGenerator(item);
    });

    $("#submit").click(function() {
        giftastic.addButton();
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

        // call the second API method
        giftastic.searchPlace(imgValue);
    });

    // click event for generated element
    $(document).on("click", ".card", function() {
        $(this).children(".still").toggle(); 
        $(this).children(".gif").toggle(); 
        console.log("Image Clicked");
    });

//------ end ------
});
