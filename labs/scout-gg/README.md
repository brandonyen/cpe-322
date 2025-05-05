# Scout.gg

This project showcases a League of Legends profile scouter similar to sites like op.gg or u.gg. By entering a username and tagline, you can get information about the summoner profile and the most recent games:

To run the project, first clone the repository to your local machine.

Install required dependencies with

`npm install`

You will need a Riot API Key. You can get one at developer.riotgames.com.

Create a .env file in the root directory and add the API key. For example:

`REACT_APP_RIOT_API_KEY = RGAPI-0b324893-dsf9-k3j3-8594-106432dfd91s`

Start the local development server:

`npm run dev`

Finally, start the backend server:

`nodemon server.ts`
