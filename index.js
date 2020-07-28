require("dotenv").config();
const Discord = require("discord.js");
const welcome = require("./welcome");
const client = new Discord.Client();

const channelNames = ["general", "brainstorming", "logistics", "workshops"];

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

// debugging only
client.on("message", (message) => {
  let channelIDMap = {};
  channelNames.forEach((name) => {
    const id = message.guild.channels.cache
      .find((channel) => channel.name === name)
      .toString();
    channelIDMap[name] = id;
  });
  if (message.content === "HOCInfo")
    message.reply(welcome(message.author.username, channelIDMap));
});

client.login(process.env.BOT_TOKEN);
