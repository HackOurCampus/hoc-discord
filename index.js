require("dotenv").config();
const Discord = require("discord.js");
const welcome = require("./welcome");
const client = new Discord.Client();
const { addParticipantData } = require("./db-functions");

const channelNames = ["general", "brainstorming", "logistics", "workshops"];

// Handle new member messaging
client.on("guildMemberAdd", (member) => {
  const username = member.user.username;
  let channelIDMap = {};
  channelNames.forEach((name) => {
    const id = member.guild.channels.cache
      .find((channel) => channel.name === name)
      .toString();
    channelIDMap[name] = id;
  });

  const message = welcome(username, channelIDMap);
  member.send(message);
});

client.on("message", async (message) => {
  if (message.content === "HOCInfoDebug") {
    //debugging only
    let channelIDMap = {};
    channelNames.forEach((name) => {
      const id = message.guild.channels.cache
        .find((channel) => channel.name === name)
        .toString();
      channelIDMap[name] = id;
    });
    message.reply(welcome(message.author.username, channelIDMap));
  } else if (
    message.channel.type === "dm" &&
    message.content.startsWith("!addgh")
  ) {
    const userId = message.author.id;
    const username = message.author.username;
    const githubName = message.content.split(" ")[1];
    message.reply("Please wait...");
    try {
      await addParticipantData(userId, username, githubName);
    } catch (err) {
      return message.reply(err.message);
    }
    message.reply("We've successfully registered your GitHub account!");
  }
});

client.login(process.env.BOT_TOKEN);
