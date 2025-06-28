# PRINCESS PEACH TOADSTOOL


### Technologies Used:
HTML
CSS
JS
python
[kaboom](https://github.com/replit/kaboom)
django 
django allauth for user authentication
google sign in: https://docs.allauth.org/en/latest/socialaccount/providers/google.html 
canva.com to layout the homepage and choose a colour palette based on Princess Peach
coolors.com - image picker to extract the correct hex values for the palette used across the site.
[Tiled](https://www.mapeditor.org/)

PEACH PALETTE
/* CSS HEX */
--white: #FFFDFDff;
--jasmine: #FCD370ff;
--bleu-de-france: #2988F5ff;
--vista-blue: #9E9EDEff;
--black: #030304ff;
--salmon-pink: #F08293ff;
--razzmatazz: #E62F78ff;
 
### Bugs
#### Checkout session completed without email.

![Bug: Stripe webhook handler](README-folder/bug1-webhook-handler.webp)

![Bug: Stripe response](README-folder/bug1-stripe-response.webp)

Issue: Stripe object returned an empty customer_email upon checkout despite entering an email during the checkout process. Subscription model would not then be generated nor associated with an authenticated user.
Fix: The stripe object had logged the email under customer_details{ email } so the variable customer_email needed to point at that instead:
    session.get('customer_email') or (
            session.get('customer_details', {}).get('email')
            )

#### Double score being posted to database.

![Bug: double score being posted on collision with pipes](README-folder/bug2-double-score-1.webp)

![Bug: double score being posted transitioning from W1 to W2](README-folder/bug2-double-score-2.webp)

Issue: Whilst transitioning from world 1 to world 2 and on completion of world 2 the total score would be saved twice for each level.
Fix: Add boolean flag around player-pipe interaction using [onCollideEnd](https://kaboomjs.com/#onCollideEnd).

#### Session's score not starting from 0 on play again
Issue: Upon completion of the game, if the user tried playing again, the score would carry on from the previous game instead of starting from 0. 
Fix: A helper async function that resets the score by using the method: request.session.pop(score, None) and then setting the redirect url values at the end of the game to window.location.href = '/game/world1/?new=true' - the query string refering to the conditional within the world1 view: if request.GET.get('new') == 'true': which then 'pops' the score and level from the session allowing the new game to start with a clean record. 


### Reference
#### Base JS/Kaboom code and idea:  
- Ania Kubow: [2hrs to code Mario with Auth + save scores | JavaScript, CSS, HTML](https://youtu.be/1CVSI3MZNNg?si=TbMVZsDU_YM94oDa)
#### Additional useful resources:  
- FreeCodeCamp - GameDev with JavaScript and Kaboom.js: [Metroidvania Game Tutorial](https://youtu.be/iM1iSvloMlo?si=RQNq9j1hE3W3yzap) 
- JSLegendDev’s Substack: [How to use Tiled with Kaplay/Kaboom.js](https://jslegenddev.substack.com/p/how-to-use-tiled-with-kaboomjs)
- JSLegendDev: [How to build a platformer in Js with kaboom](https://www.youtube.com/watch?v=wZpbTR7pYR0)
- JSLegendDev's GitHub: [Mario-Game-Kaboom](https://github.com/JSLegendDev/Mario-Game-Kaboom.js/blob/master/main.js)
- Reddit post about using Django to design a game: [reddit.com](https://www.reddit.com/r/django/comments/181i3ix/can_you_design_a_game_with_django/)
- Box Shadow : [CSS-Tricks](https://css-tricks.com/almanac/properties/b/box-shadow/)
- Navbar styling: [W3S](https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_horizontal_black_active)
- Responsive font sizing: [W3S](https://www.w3schools.com/css/css_font_size.asp)
- Clamp() function: [W3S](https://www.w3schools.com/cssref/func_clamp.php)
- Clamp() calculator: [marcbacon.com](https://www.marcbacon.com/tools/clamp-calculator/)
- Window location reload with clear cache: [Stack Overflow](https://stackoverflow.com/questions/5721704/window-location-reload-with-clear-cache)
- async() :[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- Extension Modules: [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions)
- Request and response objects: [Django docs](https://docs.djangoproject.com/en/5.2/ref/request-response/#django.http.HttpRequest.GET)
- Query Strings: [Wikipedia](https://en.wikipedia.org/wiki/Query_string)
Stripe documentation: 
 - https://docs.stripe.com/get-started/development-environment#api-keys
 - https://docs.stripe.com/checkout/embedded/quickstart
 - https://docs.stripe.com/billing/quickstart
 - https://dashboard.stripe.com/test/products/