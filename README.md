# giftastic
A web app that uses the GIPHY API to make a dynamic web page that populates with gifs of your choice.

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


## Programming Notes
* Always add `$(document).ready(function() {})` to a jQuery script
* Add validation, such as if there is no string in the input don't do anything.
* Any element generated after the listening event is created must have a differmt kind of event listener
```
    // click event for generated element
    $(document).on("click", ".card", function() {
        alert("Image Clicked");
    });
```
* You can add a rating and limit to the GIPHY API cURL (Client URL) line
```       
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imgQuery 
                + "&api_key=" + apikey 
                + "&rating=" + rating 
                + "&limit=" + searchLimit;
```


## Reference Links
* Background patters from [Subtle Patterns](https://subtlepatterns.com/)