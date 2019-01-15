        API for HERE's place search
        searchWiki: function(arg) {
            var appID = "tjj6VJZDXVLQe1myb3qf";
            var appCode = "M-Z5rc6h_R8NnTOwcz-zzQ";

            var placeQuery = "https://places.cit.api.here.com/places/v1/discover/explore";
            placeQuery += "?app_id=" + appID;
            placeQuery += "&app_code=" + appCode;
            placeQuery += "&q=" + arg;
            placeQuery += "&cat=sights-museums";
            placeQuery += "&pretty";
            console.log("placeQuery: ", placeQuery);
            $.ajax({
                url: placeQuery,
                method: "GET"
                }).then(function(response) {
                    var placeResponse = response;
                    console.log(placeResponse);
                    // giftastic.newFunction(placeResponse);
                });

            
        },
