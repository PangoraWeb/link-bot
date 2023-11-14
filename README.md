<div align="center">
  
![GitHub tag (latest SemVer)](https://img.shields.io/github/release/PangoraWeb/link-bot.svg?style=for-the-badge)
[![GitHub issues](https://img.shields.io/github/issues-raw/PangoraWeb/link-bot.svg?style=for-the-badge)](https://github.com/PippitWeb/pippit/issues)
[![License](https://img.shields.io/github/license/PangoraWeb/link-bot.svg?style=for-the-badge)](LICENSE)
![GitHub stars](https://img.shields.io/github/stars/PangoraWeb/link-bot.svg?style=for-the-badge)

</div>
<div align="center">
  <img src="https://github.com/PangoraWeb/link-bot/assets/73616169/6bdf131b-d311-4b2e-b0c8-1bf2e3464f0a" width=200px height=200px></img>
  <h3 align="center"><a href="">Link Bot</a></h3>
  <p align="center">

    A bot for Pangora, Lemmy, and Kbin to post recommended communities based on keywords in the post title.
  </p>
</div>

## About the Bot
This bot looks at post names in given communities and sees if any contain any keywords youve defined. If so it replies with a comment on that post it found it in with all of the matching communities to the keywords it found.

![image](https://github.com/PangoraWeb/link-bot/assets/73616169/289e3424-2eb9-4329-b2e7-ddd77dac640f)

## Self-Hosting Setup
You need node.js downloaded to run this

1. Clone the repository (`git clone https://github.com/PangoraWeb/link-bot.git` in a terminal)
2. Create an account in the instance you want the bot to have as its home (just make a regular user)
3. Create a file called .env in the bot folder and give it values in this format with the data in the quotes (dont add the slashes or the part after the slashes)
```
LEMMY_INSTANCE="" // The instance the bot account is in
LEMMY_USERNAME="" // The bot username
LEMMY_PASSWORD="" // The bot password
```
4. Change the data in config.yaml based on what you want set
5. Open a terminal in the bot folder and run `npm install` to install dependendies and then `node main.js` to run the bot (whenever you want to start the bot again you can just do ctrl+c to interrupt the process and node main.js to start the bot)

I recommend installing something like [forever.js](https://www.npmjs.com/package/forever) for running it in the background on your server

If you run into issues feel free to dm me on Matrix [here](https://matrix.to/#/@ategon:matrix.org)

## Contributing
If you want to contribute to add some sort of feature feel free to make a pull request with it added

[This repository](https://github.com/firstcontributions/first-contributions) has some info on how to do development in a repository and make a pull request

## Credits
Icon base by [Lorc]([https://delapouite.com/](https://lorcblog.blogspot.com)) under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) with modifications to add a gradient


