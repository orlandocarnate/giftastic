$(document).ready(function() {
    var topics = [
        "Chicago", "London", "Paris", "Hong Kong", "Seoul", "Prague", "Zurich", "Venice", "Vienna", "Firenze", "Bangkok", "Moscow"
    ];

    var topic;

    var favTopics = JSON.parse(localStorage["mytopics"]);
    console.log("Currently Stored: ",favTopics);


    // var topics = [
    //     "Star Wars", "Blade Runner", "Tron", "Tron Legacy", "Interstellar",
    //     "The Last Starfighter", "Buck Rogers", "Star Trek", "Battlestar Galactica",
    //     "Firefly", "Cowboy Bebop", "Doctor Who"
    // ];

    var $gifID = $("#gifs");
    var rating = 'pg'; // this rating plus anything below it.
    var searchLimit = 10; // limit searches to 10

    var giftastic = {
        // API method - getting data object from Giphy
        giphy: function (value, offset) {
            var apikey = '33r6HmHtPq3Os3xN54dVLKR8MM1Qs3lv'; // giphy API key
            var imgQuery = value;
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imgQuery 
                + "&api_key=" + apikey + "&rating=" + rating + "&limit=" + searchLimit + "&offset=" + offset;
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                var imgResponse = response;
                console.log(imgQuery,imgResponse);
                giftastic.cardGenerator(imgResponse);
            });
        },


        //API for Wikipedia's search
        searchWiki: function(arg) {
            var wikiRESTAPI = "https://en.wikipedia.org/api/rest_v1/page/summary/";
            wikiRESTAPI += arg;
            console.log("wikiRESTAPI: ", wikiRESTAPI);
            $.ajax({
                url: wikiRESTAPI,
                method: "GET"
                }).then(function(response) {
                    $(".aside").empty();
                    $wiki = $("<div/>").attr({"id":"wiki"});
                    if (response.hasOwnProperty("thumbnail")) {
                        var $img = $("<img>").attr({"class" : "wiki-img", "src": response.thumbnail.source});
                    } else {
                        var $img = $("<img>").attr({"class" : "wiki-img", 
                        "src": 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/418px-Wikipedia-logo-v2-en.svg.png'});
                        
                    }
                    
                    var $heading = $("<h3>");
                    var $a = $('<a />').attr({href: response.content_urls.desktop.page, target: "_blank"});
                    $a.append(response.title);
                    $a.append($img);
                    $heading.append($a);
                    var $summary = $("<span>").html(response.extract_html);
                    $(".aside").append($wiki.append($heading, $summary));
                });

            
        },

        // button generator
        buttonGenerator: function (val, element) {
            // create bootstrap button
            var $gifButtons = $(element); // #gifbuttons or #fav-buttons element
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
            console.log("Value: ", value);
            if (value && topics.indexOf(value.trim()) === -1) {
                topics.push(value.trim());
                
                console.log("Topics: " , topics);
                $gifButtons.empty();
                // clear and rerender buttons
                
                topics.forEach(function (item) {
                    giftastic.buttonGenerator(item, "#gifbuttons");
                });
            }
            $("#getimage").val('');

        },

        storeTopics:function() {
            localStorage["mytopics"] = JSON.stringify(favTopics);
            giftastic.buttonGenerator(topic, "#fav-buttons");
            console.log("localStorage: ", JSON.parse(localStorage["mytopics"]));

        }
    }

    // call button generator for array
    topics.forEach(function (item) {
        console.log(item);
        giftastic.buttonGenerator(item, "#gifbuttons");
    });

    // call button generator for localStorage
    favTopics.forEach(function (item) {
        console.log(item);
        giftastic.buttonGenerator(item, "#fav-buttons");
    });

    

    $("#submit").click(function() {
        // event.preventDefault();
        giftastic.addButton();
        
    });

    // this event method must work on newly generated buttons
    $(document).on("click", ".btn-topic", function() {
        // event.preventDefault();
        topic = $(this).val();
        imgOffset = $(this).attr("data-imgoffset");

        // if current topic is not clicked, clear #gifs div
        if ($(this).attr("data-active") === "false") {
            $("#gifs").empty();
            // reset all the button offsets to 0
            $(".btn-topic").attr("data-imgoffset", "0");
            // set all button data-active to false
            $(".btn-topic").attr("data-active", "false");
            $(".btn-topic").css({"background-color": "transparent"});
            $(this).attr("data-active", "true");
            $(this).css({"background-color": "gray"});
        };

        // send two values to giftastic object
        giftastic.giphy(topic, imgOffset);

        // increase button's offset value by 10
        imgOffset = parseInt(imgOffset) + 10;
        console.log("button offset:",imgOffset);
        $(this).attr("data-imgoffset", imgOffset);
        console.log(topic);

        // call the second API method
        giftastic.searchWiki(topic);
    });

    // click event for generated element
    $(document).on("click", ".card", function() {
        $(this).children(".still").toggle(); 
        $(this).children(".gif").toggle(); 
        console.log("Image Clicked");
    });

    // add topic to savedTopic array
    $(document).on("click", "#save-topic", function() {
        if (topic && favTopics.indexOf(topic) === -1) {
            favTopics.push(topic);
            giftastic.storeTopics();
            console.log("Fav Topics: " + favTopics);
        } else {
            console.log("topic is null or exists");
        }
        
    });

//------ end ------
});
