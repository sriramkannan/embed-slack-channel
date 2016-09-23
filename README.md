##Synopsis

If your organization uses Slack and you want comments from one of the public channels to be shown in a website and at the same time, want to be able to post messages in the same channel - use this code. 

##Motivation

Lightweight, simple to use Express js code that is meant for expansion according to your needs

##Installation

1. Download the code
2. Go to Slack and create a new bot user (if not sure - just google :))
3. Using a REST client (Chrome has a plugin) call <your-slack-url>/api/rtm.start?token=<token-of-user-created-in-step-2>
4. From the json response, find the 8-Character id of the slack channel you want to use
5. Set the channel as an environment variable or replace "process.env.channel" value in routes/channels.js file with the channel id
6. Same thing for user token
7. On the root of the downloaded code, run "npm install". This should download the dependencies. 
8. To start the app, run "npm start"
9. Access the site http://localhost:3000/slack/channel

