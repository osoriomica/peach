# PRINCESS PEACH TOADSTOOL (AKA PEACH KABOOM)

![Peach Kaboom](README-folder/full-screenshots/all-devices-black.webp)

The deployed site can be found here: [Peach](https://peachkaboom-132026d215d5.herokuapp.com/)

**Click below to view full screenshots of the website on the README folder:**

[Full Screenshots](README-folder/full-screenshots)</strong>


---

## Table of Contents

- [Introduction](#introduction)
- [UXD](#uxd)
  - [User Stories](#user-stories)
  - [Features](#features)
  - [Design](#design)
- [Database Schema](#database-schema)
- [Wireframes](#wireframes)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
  - [Validation](#validation)
  - [Manual Testing](#manual-testing)
  - [Fixed Bugs](#fixed-bugs)
- [Deployment](#deployment)
- [Running the Project Locally](#running-the-project-locally)
- [Credits](#credits)
  - [Code](#code)
  - [Media](#media)
  - [Acknowledgements](#acknowledgements)

---

## Introduction

**Princess Peach Toadstool (AKA Peach Kaboom)** is a Django-powered Webgamne inspired by Super Mario Bros and powered by kaboom.js.
The site includes full backend functionality with admin controls, user authentication, payment handling and game interactions. 
The project was developed following the tutorial for "Boutique Ado" by Code Institute, as well as different tutorials on PLatformer games on Kaboom. See Credits for more information.

---

## UXD

### Development Timeline

| Week commencing: | Task 1                                                                                                 | Task 2                                                                               | Task 3                                                                               | Task 4                                                                             | Task 5                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 05-26-25         | Mentorship session 1                                                                                   | Brainstorm project ideas                                                             |                                                                                      |                                                                                    |                                                                         |
| 06-02-25         | Study Code with Ania's tutorial: "2hrs to code Mario with Auth + save scores \| JavaScript, CSS, HTML" | Draft strategy, scope, structure, skeleton and surface planes. Draft database schema | Make initial wireframes and mockups.                                                 | Explore imagery and color palette to be used in site.                              | Initial Commit. Add user authentication. Add base template and home app |
| 06-09-25         | Mentorship session 2                                                                                   | Wire up About app                                                                    | Wire up Game app. Import Kaboom code from Ania's tutorial and upgrade to kaboom 3000 | Debug Kaboom                                                                       |                                                                         |
| 06-16-25         | Add Game models                                                                                        | Wire up Subscriptions app and restrict access to world2.html                         | Stripe integration and webhook handlers                                              | Game flow from world1.html to world2.html passing user's scores                    | Debug subscriptions                                                     |
| 06-23-25         | Wire up Profiles app. Add CRUD over avatar image. Add cancel subscription renewal option               | Deploy. Config vars and check things are still working. Emails.                      | Mentorship session 3 - Debugging session                                             | Refine visuals. Extend base.css to Allauth templates. Optimise images for the web. | Clean up Readme file. Testing and validation.                           |

### User Stories

PAYMENTS AND SUBSCRIPTIONS
As a **logged-in user**:
I can purchase a subscription so that I can access more game levels. 
I can review my payment details before subscribing. 
I can cancel a payment.
I can checkout securely through Stripe.
I can view my current subscription details.
I can receive a confirmation email on the status of my subscription.

USER CRUD
As a **site user**, I can register for a new account. Login and out with ease. Recover my password if forgotten. Receive email confirmation after registering. 
As a **registered user**, I have CRUD abilities over my avatar picture and renewal of my subscription. I can also see my latest highest score and subscription details as well as my personal details registered in the website.

VIEWING AND NAVIGATION
As a **user**:
I can start and play a new game. If logged in, my score is automatically saved.
I can navigate through the website using the links provided
I can visit the site's facebook page
I can see some content depending on my subscription status i.e. world2.html

### Features

- **Homepage**:  
- **Profile**: Details, Game Stats and Subscription. User has crud over their avatar picture and subscription revewal.  
- **Authentication**: Django Allauth-powered login/signup/logout  
- **About**: About us page  
- **Game**: Free to play: World - 1, Subscription required for World - 2    
- **Subscription**: With a pricing table powered by Stripe. Webhooks to manage subscriptions.  
- **Responsive Design**: Optimized for all screen sizes  

### Design
The color scheme and fonts were chosen inspired by the opening scene of [Super Mario Bros](https://supermarioplay.com/) with the colour palette of Super Princess Peach. All layouts are designed with a mobile-first approach.
![mario-peach](README-folder/mario-peach-layout.png)

- **Typography:**
  
  The project uses two main fonts to reinforce its retro arcade theme:
  
  - **Press Start 2P:** This pixel-style font is used for headings and titles, evoking the classic look of 8-bit and 16-bit video games. Its distinctive, blocky appearance immediately signals a nostalgic, playful atmosphere, making it ideal for a game inspired by classic platformers.
  - **VT323:** Used for general text elements, VT323 is a monospaced font that maintains readability while still referencing the era of vintage computer terminals and arcade machines. Its clean lines ensure that body text remains legible, even at smaller sizes, while still contributing to the overall retro aesthetic.
  
  Together, these fonts create a cohesive visual identity that supports both the game's theme and user experience.

- **Colour Palette:**

    | Color                                                                 | Hex         | Name           |
    |----------------------------------------------------------------------|-------------|----------------|
    | ![#8888df](https://placehold.co/15x15/8888df/8888df.png)             | #8888df     | Vista Blue     |
    | ![#fcd57a](https://placehold.co/15x15/fcd57a/fcd57a.png)             | #fcd57a     | Jasmine        |
    | ![#ffeab8](https://placehold.co/15x15/ffeab8/ffeab8.png)             | #ffeab8     | Shadow Light   |
    | ![#fa7085](https://placehold.co/15x15/fa7085/fa7085.png)             | #fa7085     | Salmon Pink    |
    | ![#0e0d0b](https://placehold.co/15x15/0e0d0b/0e0d0b.png)             | #0e0d0b     | Shadow Dark    |
    | ![#FFFDFD](https://placehold.co/15x15/FFFDFD/FFFDFD.png)             | #FFFDFD     | White          |
    | ![#2988F5](https://placehold.co/15x15/2988F5/2988F5.png)             | #2988F5     | Bleu de France |
    | ![#E62F78](https://placehold.co/15x15/E62F78/E62F78.png)             | #E62F78     | Razzmatazz     |


- **Images:**
    ---

    ## Database Schema

    | Model           | Field                  | Type / Relation                                                                        |
    |-----------------|------------------------|----------------------------------------------------------------------------------------|
    | **User**        | —                      | —                                                                                      |
    | **Subscriptions** | user                   | OneToOneField → User                                                                   |
    |                 | stripe_customer_id     | CharField (max_length=255, unique=True)                                                |
    |                 | stripe_subscription_id | CharField (max_length=255, unique=True)                                                |
    |                 | is_active              | BooleanField (default=True)                                                            |
    |                 | start_date             | DateTimeField (null=True, blank=True)                                                  |
    |                 | current_period_end     | DateTimeField (null=True, blank=True)                                                  |
    |                 | plan_interval          | CharField (max_length=10, null=True, blank=True)                                       |
    |                 | created_at             | DateTimeField (auto_now_add=True)                                                      |
    |                 | cancel_at_period_end   | BooleanField (default=False)                                                           |
    | **PostScore**   | user                   | ForeignKey → User                                                                      |
    |                 | score                  | IntegerField                                                                           |
    |                 | level                  | CharField                                                                              |
    |                 | created_at             | DateTimeField                                                                          |
    | **UserProfile** | user                   | OneToOneField → User (related_name="profile")                                          |
    |                 | joined                 | DateField (auto_now_add=True, blank=True, null=True)                                   |
    |                 | score                  | IntegerField (default=0)                                                               |
    |                 | level                  | CharField (max_length=100, default="Unknown")                                          |
    |                 | created_at             | DateTimeField (auto_now_add=True, blank=True, null=True)                               |
    |                 | profile_image          | CloudinaryField('image', default='static/media/default', blank=True, null=True)        |
    |                 | subscription           | OneToOneField → Subscriptions (on_delete=SET_NULL, null=True, blank=True)              |
    | **About**       | title                  | CharField                                                                              |
    |                 | about_image            | CloudinaryField                                                                        |
    |                 | content                | TextField                                                                              |
    |                 | created_at             | DateTimeField                                                                          |
    |                 | updated_at             | DateTimeField                                                                          |
---

## ERD
![Entity Relationship Diagram](README-folder/erd.webp)
---

## Wireframes
Wireframes created with [miro.com](https://miro.com/).

[See the site's wireframes in the README folder](README-folder/wireframes)

<details>
  <summary>Or click here to expand: WIREFRAMES</summary>

  ![Home Wireframe](README-folder/wireframes/home-wireframe.webp)
  
  ![Profile Wireframe](README-folder/wireframes/profile-wireframe.webp)
  
  ![Game Wireframe](README-folder/wireframes/game-wireframe.webp)
  
  ![Subscription Wireframe](README-folder/wireframes/subscription-wireframe.webp)

  ![About Wireframe](README-folder/wireframes/about-wireframe.webp)

  ![Sign up Wireframe](README-folder/wireframes/signup-wireframe.webp)

  ![Sign in Wireframe](README-folder/wireframes/signin-wireframe.webp)

</details>

---

## Technologies Used

- Languages: HTML5, CSS3, JS, Python
- [kaboom](https://github.com/replit/kaboom)
- [GitHub](https://github.com/) -  Used to host the project
- [Visual Studio Code](https://code.visualstudio.com/download) - IDE connected
- [canva.com](https://canva.com/) - Used to edit sprites and mock up the UI
- [coolors.co](https://coolors.co/) - Used to create the colour palette based on Super Princess Peach
- [Django 4.2](https://docs.djangoproject.com/en/4.2/) - Used for responsive design and UI components.
- [Heroku](https://www.heroku.com/) - Used to deploy the project
- [Cloudinary](https://console.cloudinary.com/app/) - Used to host static files and media.
- [Django Allauth](https://docs.allauth.org/en/latest/) - Used for user authentication and account management.
- [Google Fonts](https://fonts.google.com/) - Used to customize the project's fonts. 
- [cloudconvert](https://cloudconvert.com/) - to convert images' formats.
- [PE8CI](https://pep8ci.herokuapp.com/#)
- [Mockup Generator](https://websitemockupgenerator.com/)
- [prettier.io](https://prettier.io) - to beautify the js and css code
- [Google's Inspect Element](https://developer.chrome.com/docs/devtools) - to debug code and see console logs and errors
- [Chat GPT](https://chatgpt.com/) - Used to explain concepts that were not so obvious and as a very useful aid in debugging.
- [tabletomarkdown.com](https://tabletomarkdown.com/convert-spreadsheet-to-markdown/): to easily generate my tables by importing spreadsheets.
- [Markdown TOC generator](https://bitdowntoc.derlin.ch/) - Used to automatically generate a table of contents 
- [Autoprefixer](https://autoprefixer.github.io/): to parse my CSS file and add the needed prefixes for browser compatibility.  
- [miro.com](https://miro.com/): to generate the ERD and wireframes
- [Tiled](https://www.mapeditor.org/)
- [imgur.com](https://imgur.com/wbKxhcd): to host sprites used in game. 

---

## Testing

### Validation

[Validation Folder](README-folder/validation)
- HTML validated with [W3C Validator](https://validator.w3.org/) 
![valid html](README-folder/validation/valid-html.webp)  
Index.html: [valid index.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2F)   
game/world1.html: [valid world1.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Fgame%2Fworld1%2F)   
game/world2.html: [valid world2.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Fgame%2Fworld2%2F)  
profile.html: [valid profile.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Fprofile%2F)  
about.html:[valid about.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Fabout%2F)  
subscriptions/subscribe.html:[valid subscribe.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Fsubscriptions%2Fsubscribe%2F)  
signup.html:[valid signup.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Faccounts%2Fsignup%2F) -The only error shown is related to Allauth prebuilt forms:
    ![allauth signup form error](README-folder/validation/allauth-signup-error.webp)  
login.html: [valid login.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Faccounts%2Flogin%2F)  
logout.html:[valid logout.html](https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2Faccounts%2Flogout%2F)

- CSS validated with: [W3C Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fpeachkaboom-132026d215d5.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) 
    ![CSS](README-folder/validation/valid-css.webp)
        <p>
            <a href="https://jigsaw.w3.org/css-validator/check/referer">
                <img style="border:0;width:88px;height:31px"
                    src="https://jigsaw.w3.org/css-validator/images/vcss"
                    alt="Valid CSS!" />
            </a>
        </p>

- JS validated with [JSHint](https://jshint.com/)  
![Valid JS](README-folder/validation/JSHint-peachkaboom.webp)  
The only warnings thrown after prefixing were related to Kaboom 3000, which cannot be changed without risking the game no longer working as intended. 

- Python code checked with [flake8](https://flake8.pycqa.org/en/latest/):  
All python code was checked using flake8 on the terminal with the command: python3 -m flake8 --exclude .venv,.vscode,migrations  

![Valid Python](README-folder/validation/python-flake8.webp)  

### Manual Testing

<strong>Manual testing</strong> involves checking a project’s functionality by simulating user interactions, typically through clicking buttons, filling out forms, and testing the logic and responsiveness in different browsers and resolutions. It is an essential way to ensure that a product meets the user's expectations but comes with limitations. It can be time-consuming, resource-intensive, and prone to human error,  making it unreliable (especially for larger projects). Tiredness, biases, and/or oversight can lead to missed bugs and issues that can dampen the user’s experience. Manual testing is best deployed when we need to assess the user experience (UX), or when testing specific user stories that require human judgment to evaluate nuances, which would not be picked by automated tests. 

<strong>Automated testing</strong>, on the other hand, uses code to run tests on software, providing a faster, scalable solution for detecting errors early in the development process. Automated tests can be written to target specific scenarios and run hundreds of tests in a short amount of time, making them ideal when verifying that new code hasn't broken existing functionality. However, automated tests are only as reliable as the test cases designed to check, and they do not assess the user experience. Therefore, a combination of manual and automated testing is often the best approach, where automated testing handles repetitive tasks and error detection; manual testing focuses on areas where human insight and user experience are critical. 

This site was thoroughly tested using a <strong>manual testing</strong> approach. These tests led to catching and fixing issues from early in the development. Some friends and family also contributed towards testing the game’s logic and provided valuable feedback. 

Please see below for the tests and final results:
| Test Label                                | Test Action                                                                                                             | Expected Outcome                                                                                                                                                      | Test Outcome |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Styling of base.html                      | Resize the screen for media sizes                                                                                       | Navbar and footer are responsive upon resizing and the links are displayed clearly on the screen on different screen sizes                                            | Pass         |
| Navigation links                          | Click on links, check code                                                                                              | Opens requested page and updates the navbar links showing an active status                                                                                            | Pass         |
| Buttons and links                         | On hover, buttons and links change in style to show user they can be clicked on.                                        | On hover and when clicked, clickable elements change their styling to let user know they can interact with them.                                                      | Pass         |
| Site’s responsiveness                     | Resize site with Inspect Tool using different dimensions.                                                               | The site remains easy to read and uncluttered across different screen sizes. Images and text change depending on media queries.                                       | Pass         |
| Styling                                   | Hover and click buttons                                                                                                 | On hover and when clicked, buttons change their styling to let user know they can interact with them.                                                                 | Pass         |
| Start Game                                | Click on button                                                                                                         | Redirect to World1.html and start the game                                                                                                                            | Pass         |
| Anonymous user - world1                   | Play game without logging in                                                                                            | If not logged in, an anonymous user is allowed to play world1.html                                                                                                    | Pass         |
| Anonymous user - world2                   | Attempt to continue to world2.html without logging in                                                                   | Anonymous users are redirected to signup instead of world2.html                                                                                                       | Pass         |
| Logged in user - world2 (no subscription) | Attempt to continue to world2.html without subscription                                                                 | Logged-in users are redirected to subscribe instead of world2.html                                                                                                    | Pass         |
| Subscribed users - world2                 | Attempt to continue to world2.html with an active subscription                                                          | Subscribed user is able to go from world1.html to world2.html                                                                                                         | Pass         |
| Scores in Database                        | Play as a logged in user collecting score                                                                               | See score and level reflected in /Admin                                                                                                                               | Pass         |
| Start Game                                | Open /game/world1.html                                                                                                  | The game is automatically loaded and ready to go.                                                                                                                     | Pass         |
| Player moves - keyboard                   | Use left and right arrows to move player sideways. Spacebar to jump                                                     | Player is able to move the character across the level's map.                                                                                                          | Pass         |
| Player moves - onscreen                   | Use on-screen arrows to move player sideways on mobile screens                                                          | Player is able to move the character across the level's map by taping on the on-screen arrow buttons.                                                                 | Pass         |
| World1 to World2                          | Click arrow down to continue to next level using the pipes                                                              | Player can move forward in the game levels by standing on pipes and pressing arrow down.                                                                              | Pass         |
| CollectPoints                             | Player accummulates score by collecting coins and killing the enemies                                                   | Score is increased by 1 or by 10 respectively and updated to database.                                                                                                | Pass         |
| win()                                     | Player reaches the last pipe on world2, level 2                                                                         | Trigger win scene with congratulations message, final score and prompt to play again.                                                                                 | Pass         |
| lose()                                    | Player falls of map or killed by enemy                                                                                  | Game over is triggered, showing final score and allowing user to restart the game from world1                                                                         | Pass         |
| Sitemap                                   | Click on footer link                                                                                                    | Opens the sitemap list for the website                                                                                                                                | Pass         |
| Social links                              | Click on footer link                                                                                                    | Links open a new tab to site's Facebook page                                                                                                                          | Pass         |
| Profile                                   | Log in > My Account                                                                                                     | User's information stored in database is shown on the template. Including: Username and email details. Game Stats with personal highest score and subscription status | Pass         |
| Cancel Subscription                       | Click on Cancel Subscription                                                                                            | Post the request to Stripe triggering a webhook and updating the database. Conditional template code is shown to reflect the change.                                  | Pass         |
| Restart Subscription                      | Click on Restart Subscription                                                                                           | Post the request to Stripe triggering a webhook and updating the database. Conditional template code is shown to reflect the change.                                  | Pass         |
| Avatar image                              | User's profile avatar image is displayed properly. If no custom image is given, then a placeholder avatar is displayed. | Image field within about Profile app allows the user to upload an image, a placeholder is added by default if no image is specified.                                  | Pass         |
| Subscription                              | Use Stripe's embedded Pricing Table to subscribe                                                                        | Opens Stripe.com, use test card to complete subscription. Trigger webhook. Redirects to World2.html                                                                   | Pass         |


### Fixed Bugs
#### BUG1: Checkout session completed without email.

<details>
  <summary>Click to expand: Screenshots of Stripe webhook handler and response</summary>

  ![Bug: Stripe webhook handler](README-folder/bugs/bug-webhook-handler.webp)

  ![Bug: Stripe response](README-folder/bugs/bug-stripe-response.webp)

</details>

**Issue:** Stripe object returned an empty customer_email upon checkout despite entering an email during the checkout process. Subscription model would not then be generated nor associated with an authenticated user.
**Fix:** The stripe object had logged the email under customer_details{ email } so the variable customer_email needed to point at that instead:
    session.get('customer_email') or (
            session.get('customer_details', {}).get('email')
            )

#### BUG2: Double score being posted to database.

<details>
  <summary>Click to expand: Screenshots of double score being posted</summary>

  ![Bug: double score being posted on collision with pipes](README-folder/bugs/bug-double-score-1.webp)

  ![Bug: double score being posted transitioning from W1 to W2](README-folder/bugs/bug-double-score-2.webp)

</details>

**Issue:** Whilst transitioning from world 1 to world 2 and on completion of world 2 the total score would be saved twice for each level.  
**Fix:** Add boolean flag around player-pipe interaction using [onCollideEnd](https://kaboomjs.com/#onCollideEnd).

#### BUG3: Session's score not starting from 0 on play again
**Issue:** Upon completion of the game, if the user tried playing again, the score would carry on from the previous game instead of starting from 0.  
**Fix:** A helper async function that resets the score by using the method: request.session.pop(score, None) and then setting the redirect url values at the end of the game to window.location.href = '/game/world1/?new=true' - the query string refering to the conditional within the world1 view: if request.GET.get('new') == 'true': which then 'pops' the score and level from the session allowing the new game to start with a clean record. 

#### BUG4: Scrolling disabled across site
**Issue:** upon resizing the screen to small devices/screens, the block content of the body would not allow to scroll down, hiding the rest of the content under the footer.  
**Fix:** after reading this [stack overflow post](https://stackoverflow.com/questions/39360138/how-to-universally-enable-scrolling-on-website-that-disabled-scrolling), I found that there was indeed a global style applied to body{overflow:hidden;}element (originally there as part of the setup for kaboom). Removing the style fixed the issue.

#### BUG5: Emails not being sent on deployed site
<details>
  <summary>Click to expand: Screenshots of SSL Certification verification error on signup</summary>

  ![Bug: SSL Certification verification error on signup](README-folder/bugs/bug-email1.webp)

  ![Bug: heroku log showing the error 500 on Post](README-folder/bugs/bug-email2.webp)  
</details>

**Issue:** Server error upon trying to signup. Encountered during manual testing after deploying to Heroku and connecting Gmail to send emails.  
**Errors thrown:** SSLCertVerificationError during Email Sending.  
**Steps taken to fix the issue:**  
My mentor was kind enough to help me through this one (Thank you, maestro!). He identified, the original setting with django 3.2/python 3.12 was not to be trusted and suggested to upgrade to Django 4.2 to fix the keyfile issue but then we had the SSL verification issues -- which was due to the change in Python 3.12's handling of SSL certificates. This threw an error with an existing dependency which needed Python3.10 or higher. Finally, we downgraded to Python 3.11 (we did try downgrading to Python 3.9 but one of the libs required Python 3.10 or higher...)  
Lastly, it apparently is a common issue on macOS; so on my computer's terminal I ran the following command to install the required certificates.  
      /Applications/Python\ 3.11/Install\ Certificates.command  
      -- pip install --upgrade certifi 
**References:**  
  - https://stackoverflow.com/questions/77482831/smtp-starttls-got-an-unexpected-keyword-argument-keyfile  
  - https://docs.python.org/3/library/smtplib.html#smtplib.SMTP_SSL  
  

---

## Deployment
<strong>Create a GitHub Repository</strong>  
	1. Go to [GitHub website](https://github.com/) and navigate to the <strong>Settings</strong> tab.  
	2. [Create a new public repository](https://github.com/new) using the format username.github.io, where username is your GitHub username.    
	3. Optionally, add a repository description, select whether it will be public or private, and initialise it with a README file (optional).  
	4. <strong>Forking:</strong> If deploying a project you don’t own, fork the repository first by clicking the "Fork" button at the top right of the project repository.  
	5. Configure GitHub Pages later in the settings.  
2. <strong>Clone and Deploy a Project</strong>  
	1. (Optional) Install [GitHub Desktop](https://desktop.github.com/) if you prefer a graphical interface for managing repositories.  
	2. Clone the repository:  
		* After installing GitHub Desktop (if you're using it), refresh the page on GitHub and click the “Set up in Desktop” button.  
		* The GitHub Desktop app will open. Select a location to save the project and clone it.  
	3. Create an <strong>index.html</strong> file for your project if it doesn’t already exist.  
	4. Use the terminal to:  
		* <strong>Add</strong> your changes: git add .  
		* <strong>Commit</strong> your changes: git commit -m "Initial commit"  
		* <strong>Push</strong> your changes: git push origin main  
3. <strong>Clone and Deploy This Project</strong>  
	1. Go to my GitHub repository for this project: [Corazon de Patata](https://github.com/osoriomica/corazon_de_patata).  
	2. In the top right corner of the repository page, click the green Gitpod icon to open a new workspace in Gitpod.
	3. You can choose to work locally or download the project and edit it in an IDE like [Visual Studio Code](https://code.visualstudio.com/download).

### Deploy to [Heroku](https://www.heroku.com/) using the following steps:

1. Create `Procfile`, `requirements.txt`, `runtime.txt`
2. Set allowed hosts and static file settings in `settings.py`
3. Set up Cloudinary and environment variables
4. Push to GitHub → connect to Heroku via GitHub integration
5. Enable automatic deploys and run `heroku run python manage.py migrate`

---

## Running the Project Locally  

To run this project locally, follow the steps below:  

### 1. Clone the repository  
>```bash  
>git clone https://github.com/yourusername/peach.git  
>cd peach  
### 2. Create and activate a virtual environment  
>python3 -m venv venv  
>source venv/bin/activate  # On Windows: venv\Scripts\activate  
### 3. Install project dependencies  
>pip install -r requirements.txt  
### 4. Set environment variables  
Create a .env file in the root directory and include:  
>SECRET_KEY=your-django-secret-key  
>DEBUG=True  
>DATABASE_URL=sqlite:///db.sqlite3  
>CLOUDINARY_URL=your-cloudinary-url  
>ALLOWED_HOSTS=127.0.0.1,localhost  
### 5. Apply migrations 
>python manage.py makemigrations
>python manage.py migrate  
### 6. Run the development server  
>python manage.py runserver    
Visit http://127.0.0.1:8000 in your browser.  

---
## Stripe Setup and Webhook Walkthrough

To enable payments and subscriptions, you need to set up Stripe and configure webhooks for your Django project.

### 1. Create a Stripe Account
- Sign up at [Stripe Dashboard](https://dashboard.stripe.com/).
- Switch to "Developers" mode to access API keys and webhook settings.

### 2. Obtain Stripe API Keys
- In the Stripe dashboard, go to **Developers > API keys**.
- Copy your **Publishable key** and **Secret key**.
- In Heroku, add these as config vars:
  - `STRIPE_PUBLIC_KEY=your-publishable-key`
  - `STRIPE_SECRET_KEY=your-secret-key`
- These keys allow your backend to securely communicate with Stripe and your frontend to initialize payment flows.

### 3. Set Up Stripe Webhooks
- In Stripe, go to **Developers > Webhooks**.
- Click **Add endpoint** and enter your deployed app's webhook URL, e.g.:
  ```
  https://your-app.herokuapp.com/webhooks/stripe/
  ```
- Select events to listen for, such as:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- After creating, copy the **Signing secret** and add it to Heroku config vars:
  - `STRIPE_WEBHOOK_SECRET=your-signing-secret`
- This secret is used to verify that incoming webhook requests are from Stripe.

### 4. Local Webhook Testing
- Install the Stripe CLI:  
  ```bash
  npm install -g stripe
  ```
- Log in:  
  ```bash
  stripe login
  ```
- Forward webhooks to your local server:
  ```bash
  stripe listen --forward-to localhost:8000/webhooks/stripe/
  ```
- Use test cards and subscriptions in Stripe's test mode to trigger events.

### 5. Summary of Key Roles
- **Publishable Key:** Used in frontend JS to initialize Stripe.
- **Secret Key:** Used in backend to create sessions and manage subscriptions.
- **Webhook Secret:** Used to verify webhook authenticity.
- All keys should be stored securely as Heroku config vars, never hardcoded.
 
--- 
## Setting Up Cloudinary for Static and Media Files

After initially using AWS S3 for static files, I switched to Cloudinary due to deployment issues with Heroku. Cloudinary offers a simpler integration for Django projects and reliable media hosting.

### Steps to Integrate Cloudinary with Django

1. **Create a Cloudinary Account**
  - Sign up at [Cloudinary](https://cloudinary.com/).
  - In your Cloudinary dashboard, find your **Cloud Name**, **API Key**, and **API Secret**.

2. **Install Required Packages**
  ```bash
  pip install cloudinary django-cloudinary-storage
  ```

3. **Update `settings.py`**
  - Add `'cloudinary'` and `'cloudinary_storage'` to `INSTALLED_APPS`.
  - Configure storage backends:
    ```python
    INSTALLED_APPS = [
      # ...
      'cloudinary',
      'cloudinary_storage',
      # ...
    ]

    CLOUDINARY_STORAGE = {
      'CLOUD_NAME': 'your-cloud-name',
      'API_KEY': 'your-api-key',
      'API_SECRET': 'your-api-secret',
    }

    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    STATICFILES_STORAGE = 'cloudinary_storage.storage.StaticHashedCloudinaryStorage'
    ```

4. **Set Environment Variables**
  - In your `.env` file or Heroku config vars, add:
    ```
    CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
    ```
  - Never commit your API keys to source control.

5. **Collect Static Files**
  ```bash
  python manage.py collectstatic
  ```

6. **Usage**
  - Uploaded media and static files will now be served via Cloudinary URLs.

---

## Using PostgreSQL as external Database

To use PostgreSQL instead of SQLite, follow these steps:

### 1. Install Dependencies

```bash
pip install dj-database-url psycopg2-binary
pip freeze > requirements.txt
```

### 2. Update `settings.py`

Import `dj_database_url` at the top:

```python
import dj_database_url
```

Replace the default `DATABASES` setting with:

```python
DATABASES = {
  'default': dj_database_url.config(
    default=os.environ.get('DATABASE_URL')
  )
}
```

### 3. Set Up Environment Variable

Add your PostgreSQL connection string to your `.env` file or Heroku config vars:

```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
```

### 4. Apply Migrations

Run the following to check and apply migrations:

```bash
python manage.py showmigrations
python manage.py migrate
```
---

## Credits
- **Mario Bros sprites** from Ania Kubow's: [2hrs to code Mario with Auth + save scores | JavaScript, CSS, HTML](https://youtu.be/1CVSI3MZNNg?si=TbMVZsDU_YM94oDa)
- **Peach sprite** from [spriters-resource.com](https://www.spriters-resource.com/fullview/20692/)
- **Arrow icons** from [kenney.nl](https://kenney.nl/assets/game-icons)
### Reference
#### Base JS/Kaboom code and idea:  
- Ania Kubow: [2hrs to code Mario with Auth + save scores | JavaScript, CSS, HTML](https://youtu.be/1CVSI3MZNNg?si=TbMVZsDU_YM94oDa)
#### Additional useful resources:  
- FreeCodeCamp - GameDev with JavaScript and Kaboom.js: [Metroidvania Game Tutorial](https://youtu.be/iM1iSvloMlo?si=RQNq9j1hE3W3yzap) 
- JSLegendDev’s Substack: [How to use Tiled with Kaplay/Kaboom.js](https://jslegenddev.substack.com/p/how-to-use-tiled-with-kaboomjs)
- JSLegendDev: [How to build a platformer in Js with kaboom](https://www.youtube.com/watch?v=wZpbTR7pYR0)
- JSLegendDev's GitHub: [Mario-Game-Kaboom](https://github.com/JSLegendDev/Mario-Game-Kaboom.js/blob/master/main.js)
- Reddit post about using Django to design a game: [reddit.com](https://www.reddit.com/r/django/comments/181i3ix/can_you_design_a_game_with_django/)
- Add on-screen buttons to Kaboom.js [ourcade - Platformer Touch Controls on Phone or Tablet in Kaboom.js](https://www.youtube.com/watch?v=sB4Oq8D3p2c)
- Box Shadow : [CSS-Tricks](https://css-tricks.com/almanac/properties/b/box-shadow/)
- Navbar styling: [W3S](https://www.w3schools.com/css/tryit.asp?filename=trycss_navbar_horizontal_black_active)
- Responsive font sizing: [W3S](https://www.w3schools.com/css/css_font_size.asp)
- Clamp() function: [W3S](https://www.w3schools.com/cssref/func_clamp.php)
- Clamp() calculator: [marcbacon.com](https://www.marcbacon.com/tools/clamp-calculator/)
- Window location reload with clear cache used to reset scores: [Stack Overflow](https://stackoverflow.com/questions/5721704/window-location-reload-with-clear-cache)
- async() functions:[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- Extension Modules: [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions)
- How to delete an image from Cloudinary: [cloudinary.com](https://support.cloudinary.com/hc/en-us/articles/203465641-How-can-I-delete-an-image-via-the-API-Programmable-Media) 
**Django Docs:**
- Request and response objects: [Django docs](https://docs.djangoproject.com/en/5.2/ref/request-response/#django.http.HttpRequest.GET)
- How to use sessions : [Django docs](https://docs.djangoproject.com/en/3.2/topics/http/sessions/)-
- Sending email: [Django docs]https://docs.allauth.org/en/latest/account/configuration.html#sending-email
- Query Strings: [Wikipedia](https://en.wikipedia.org/wiki/Query_string)
**Stripe documentation:**
 - https://docs.stripe.com/get-started/development-environment#api-keys
 - https://docs.stripe.com/checkout/embedded/quickstart
 - https://docs.stripe.com/billing/quickstart
 - https://dashboard.stripe.com/test/products/

ACKNOWLEDGEMENTS
I am truly grateful for my brilliant mentor for all his time and care explaining concepts and helping me debug.
To my family for putting up with me during this process. Thank you.