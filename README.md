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


## Personal Notes
* Always add `$(document).ready(function() {})` to a jQuery script
* Add validation, such as if there is no string in the input don't do anything.

## Reference Links
* Background patters from [Subtle Patterns](https://subtlepatterns.com/)