# ReadME for GameLibrary

## Project Description
GameLibrary is a React Single Page Application (SPA) that allows users to browse, search, and save free-to-play video games all on one webpage.
Examples of organization the user can use is:
- Favorites -> users can save their favorite free-to-play games
- Play Later -> users can save games they wish to play later
- Completed -> users can save games they have completed
The goal of this project is to assist gamers with organizing their personal libraries to keep track of all of the games they're interested in or have played.

---

## Purpose

- React SPA Architecture
- API Integration
- State Management Using React Context API
- Data Storage Using LocalStorage
- Component Based UI Design

---

## Technolgies Used

- React
- React Router DOM
- JavaScript
- HTML
- CSS
- Vite
- FreeToGame API
- LocalStorage
- Vercel

---

## Setup

1. Clone the repository to your device
2. Once in the proper directory use 'npm install' to install dependencies
3. Create a '.env' file with the code "VITE_GAME_API_URL=https://www.freetogame.com/api" to access the API data
4. Once dependencies are installed run with 'npm run dev' to view the application on your local server

---

## Routes

- / : Browse all free-to-play games
- /favorites : View saved favorite games
- /play-later : View saved play later games
- /completed : View completed games

---

## Features

- Game browsing with responsive design
- Search functionality on all pages

---

## API Documentation

Base URL: https://www.freetogame.com/api
More information on this API or its functionality can be found at the following link: https://www.freetogame.com/api-doc

---

## Authentication

Using the login button you can enter any username and password.
If you select admin you will get a star by youe username in the top right corner. Currently this is the only difference betwene Admin and Regular roles.
You wont be able to view your saved games until you have logged in.

---

## Deployment

The live application can be viewed at the following link: https://game-library-po9ymxsa6-winterwyrm12s-projects.vercel.app/

The deployment platform used was Vercel.

### Deployment Instructions

1. Push repository to GitHub
2. Sign into Vercel and navigate to Projects
3. Add a new Project
4. Import the repository
5. Configure variables from your '.env' file
6. Deploy the application

### Errors

As of 03/02/2026 there is a deployment issue. Due to a CORS policy data is blocked from accessing the API. When run locally this is not an issue.

### Future Enhanement

- CSS Design Improvements
- Saved data on completed and play-later pages

### Screenshots

- Home:
![Home]("./images/Home.png")

- Favorites:
![Favorites]("./images/Favorites.png")
- Login:
![Login]("./images/Login.png")
