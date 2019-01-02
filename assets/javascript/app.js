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
        $gifButtons.empty();
        // loop through topics array
        for (var i=0; i<val.length; i++) {


            var $gifButton = $("<button/>", {"class": 'btn btn-info mx-1 my-1', text: val[i]}); // create bootstrap button
    
            $gifButton.attr("value", val[i]); // add value to button
    
            $gifButtons.append($gifButton); // attach button to #gifButtons div
        }


    };

    // call button generator 
    buttonGenerator(topics);

    // card generator
    function cardGenerator(arg){
        var $gifID = $("#gifs");

        // generate 10 cards using for loop
        for (i=0; i < 10; i++) {
            var $card = $("<div/>", {"class":"card p-1 m-1"}); // card class
            // var $cardBody = $("<div/>", {"class": 'card-body'}); // card body
            var $cardHeader = $("<div/>", {"class": "card-header", text: arg.data[i].rating.toUpperCase()}); // gif rating
            var $cardStill = $("<img/>", {"class": "card-img-top", "src": arg.data[i].images.fixed_width_still.url}); // still image from URL
            var gifAnim = arg.data[i].images.fixed_width.url; // store GIF URL
            console.log("gifAnim url: ", gifAnim);
            // var $cardTitle = $("<div/>", {"class": "card-title text-center " + cardID, text: value.name});
            // var $cardText = $("<div/>", {"class": "card-text text-center " + cardID, text: value.health});
        
            // append jquery elements to #gifs div element
           $gifID.append($card.append($cardHeader, $cardStill));
        }


    };

    // toggle image and GIF method
    function toggleImg() {
        // toggles self or this element between still and GIF animation
    };

    // API method
    function giftastic(value) {
        // $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + apikey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log("response: ",response);
            // $("body").append($("<img/>", {"src": response.data[i].images.downsized.url}));
            // for (i=0; i < response.data.length; i++) {
            // for (i=0; i < 10; i++) {
            //     $("#gifs").append($("<img/>", {"src": response.data[i].images.preview_gif.url}));
            // }
            cardGenerator(response);
        });
    };

    $("button").click(function() {
        var value = $("#getimage").val();
        if (value !== '') {
            giftastic(value);
        }

    });

    $(".btn").click(function() {
        imgValue = $(this).val();
        giftastic(imgValue);
        $("#getimage").val(imgValue);
        alert(imgValue);
        
    });

    // click event for generated element
    $(document).on("click", ".card", function() {
        // cardValue = $(this).val(); 
        alert("Image Clicked");
    });


//------ end ------
});
