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
        var $gifButtons = $("#gifbuttons");

        var $gifButton = $("<button/>", {"class": 'btn-info'});
    
        // add value to button
        $gifButton.attr("value", val);

        // attach button to #gifButtons div
        $gifButtons.append($gifButton);
    };


    function cardGenerator(){
        $("#chooseChar").append(charCard.append(cardBody.append(cardImg, cardTitle, cardText)));

        // card generator
        var gifCard = $("<div/>", {"class": "card p-2", "id": cardID, "style": "width:150px;", "name": value.name,
        "healthpoints": value.health, "attackpower": value.attack, "counterattackpower": value.counter, 
        "sigSpell": value.signatureSpell});
    
        var cardBody = $("<div/>", {"class": 'card-body'});
        var cardImg = $("<img/>", {"class": "card-img-top", "src": "assets/images/" + value.image});
        var cardTitle = $("<div/>", {"class": "card-title text-center " + cardID, text: value.name});
        var cardText = $("<div/>", {"class": "card-text text-center " + cardID, text: value.health});
    
       $("#chooseChar").append(charCard.append(cardBody.append(cardImg, cardTitle, cardText)));
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
