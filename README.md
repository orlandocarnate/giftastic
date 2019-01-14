# giftastic
A web app that uses the GIPHY API to make a dynamic web page that populates with gifs of your choice.

## CSS GRID & FLEXBOX
I decided to use CSS Grid and Flexbox instead of Bootstrap to get more experience and reduce the amount of HTML code.

## App Checklist
* The app creates buttons based on a `topics` array.
* When the user clicks on a button, a page loads 10 gif **stills** (not animated) on the page.
* When the user clicks on the image, it plays the gif animation.
* When the user clicks on the same image again, the animation stops and reverts to the still image.
* Each gif should display a rating (PG, G, etc.)
* A text box on the side of the page is filled with the topic when a button is clicked.
* The user can add their own topic to display 10 gifs after they click the submit button. The value is also added to the `topics` array and added as a new button.

## Bonus Goals
* Allow users to request an addition 10 gifs to be added to the page.
    * I added an `imgOffset` attribute to each topic button.
    * When the topic button is pressed the `imgOffset` value is passed to the API function and added to the `"&offset=" + offset"` string.
    * Finally the `imgOffset` attribute is increased by 10.
* For the second API I will use the **[Wikipedia MediaWiki API Main Page](https://www.mediawiki.org/wiki/API:Main_page)**
    * API Endpoint: `https://en.wikipedia.org/w/api.php`
    * JSON Example `https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&prop=info&format=jsonfm`
* For searching a place I used Here's [Free-text Search](https://developer.here.com/documentation/places/topics/free-text-search.html) API to find info about the topic.
* Will also try **[Wikipedia REST API](https://www.mediawiki.org/wiki/Page_Previews)**
    * https://www.mediawiki.org/wiki/Page_Previews/API_Specification



## Programming Notes
* To have text wrap based on the image width I found that I needed to use `width: min-content` on my card class. **DOESN'T WORK** on Microsoft Edge though , just Chrome and Firefox.
* Always add `$(document).ready(function() {})` to a jQuery script
* Add validation, such as if there is no string in the input don't do anything.
* Any element generated after the listening event is created must have a different kind of event listener
```
    // click event for generated element
    $(document).on("click", ".card", function() {
        alert("Image Clicked");
    });
```

* You can add a **rating, limit, and offset** to the GIPHY API cURL (Client URL) line
```       
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imgQuery 
                                                        + "&api_key=" + apikey 
                                                        + "&rating=" + rating 
                                                        + "&limit=" + searchLimit
                                                        + "&offset=" + offset;
```

* For custom attributes I use `data-`, as referenced in **[HTML data-* Attributes](https://www.w3schools.com/tags/att_global_data.asp)**
* I created the custom attribute `data-active` and `data-imgoffset`
    * The topic buttons have the attribute `data-active` with true or false. If it's true then 10 more gifs are added. If False the gifs are emptied to start a new 10 gifs.
    * The topic buttons also have the attribute `data-imgoffset`. If the same topic button is selected the value is incremented by 10.

## Reference Links
* Background patterns from [Subtle Patterns](https://subtlepatterns.com/)