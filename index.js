require("dotenv").config();
const Discord = require("discord.js");
const welcome = require("./welcome");
const client = new Discord.Client();

client.on("guildMemberAdd", (member) => {
  const username = member.user.username;
  const message = welcome(username);
  member.send(message);
  //
});

client.login(process.env.BOT_TOKEN);
