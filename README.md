![mockup-image](assets/images/mockup.png)
## **Table of contents**
[**1. Name**](#1-project's-name)

[**2. Purpose**](#2-purpose) 

[**3. UX**](#3-ux)
- [3.1 User stories](#31-user-stories)
- [3.2 Structure](#32-structure)
- [3.3 Design](#33-design)  
  - [3.3.1 Colour scheme](#331-colour-scheme)
  - [3.3.2 Typography](#332-typography)
  - [3.3.3 Wireframes](#333-wireframes)

[**4. Features** ](#4-features)
- [4.1 Existing features](#41-existing-features)
- [4.2 Features left to implement](#42-features-left-to-implement)

[**5. Technologies used**](#5-technologies-used)

[**6. Testing**](#6-testing)

[**7. Deployment**](#7-deployment)
- [7.1 Run project locally](#71-run-project-locally)

[**8. Credits**](#8-credits)
- [8.1 Code](#81-code)
- [8.2 Media](#82-media)
- [8.3 Acknowledgements](#83-acknowledgements)

# 1. Project's Name
The project's name is **Quiz Time** and it was created using Front end technologies only. The live website can be found [here](https://stefanmdvs.github.io/quiz-codeInstitute/index.html). 

# 2. Purpose
The project was created as part of my journey with Code Institute for the Milestone 2 project. The purpose was to implement the front end technologies learned and create a website focused on user interaction. 

# 3. UX
## 3.1 User stories
1. User can intuitevely navigate across the website;
2. User can choose a category they want to play;
3. User can see their quiz progress;
4. User can see how they were doing at the end;
5. User can contact the developer.
## 3.2 Structure
The website contains the landing page where user can choose a category they wish to play, the *About* section containing information about the game, and the *Contact* page where user can fill in a contact form.  
For a good user experience, the header and footer are displayed on each page and a Facebook share button has been added.
## 3.3 Design
### 3.3.1 Colour scheme
I have started from the dark grey color as a background and from there I chose a light grey/blue colour for the text. For the navigation links and footer I went for a strong green, the same colour being used as border colour on hover over buttons.
### 3.3.2 Typography
The project uses two different Google fonts families, *Roboto mono* for headers  and *Raleway* for paragraphs, navigation and buttons.
### 3.3.3 Wireframes
Wireframes are available for each section and different screen sizes. Full size wireframes can be accessed as follows:
* [mobile view of home, game mode and end-game page](assets/wireframes/mobileView-home-game-end.pdf)
* [mobile view of the contact page](assets/wireframes/mobileContact.pdf)
* [tablet view of Home and game page](assets/wireframes/tabletView-home-game.pdf)
* [tablet view of end game page](assets/wireframes/tabletView-end.pdf)
* [tablet view of Contact page](assets/wireframes/tabletContact.pdf)
* [desktop view of Home page](assets/wireframes/desktop-home.pdf)
* [desktop view of game page](assets/wireframes/desktop-game.pdf)
* [desktop view of end game page](assets/wireframes/desktop-end.pdf)
* [desktop view of Contact page](assets/wireframes/desktopContact.pdf).
# 4. Features
## 4.1 Existing features
The project consists of:
- Landing page
- Game page
- End game page
- Contact page.

The *landing* page contains the project title and a call to action to choose a category to play. The user can choose one category to play and then the quiz game begins.  
Also on the landing page user can click the *About* button and a modal pops up with a short info about the quiz.  
The *game* page loads the questions and answers from the chosen category and the user needs to select an answer before moving on to the next question.  
At the end of the quiz, the user is presented with the number of questions they got right and a call to action button inviting them to play again.  
The *Contact* page contains a contact form which allows user to send an email using client-side technology only.
## 4.2 Features left to implement
One of the features I wish to implement in the future is adding the option to choose the **difficulty** of the questions, as the API used has 3 difficulty levels. For the time being the game loads the *medium* level, but I think it would increase the user experience if the other two categories were available to choose from.  
Another feature I wish to add is a **timer** to keep track of how long it takes for the user to finish the quiz.  
To further enhance the user experience I would also add a **leaderboard** holding names and scores of the players.
# 5. Technologies used
The project was built using:
- HTML
- CSS
- Javascript.

In addition I have also used the following:
- [Bootstrap](https://getbootstrap.com/) to build a responsive website
- [Google fonts](https://fonts.google.com/), for the main two font families
- [Balsamiq](https://balsamiq.com/) used to create the project's wireframes
- [Coolors](https://coolors.co/) to help match the color palette
- [Favicon](https://favicon.io/) for generating the favicon image 
- [Mockup generator](http://techsini.com/multi-mockup/index.php) used to generate the mockup of the project
- [HTML validator](https://validator.w3.org/) used to check for errors in html files
- [CSS validator](https://jigsaw.w3.org/css-validator/) used to check for errors in stylesheet