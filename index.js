require("dotenv").config();
const Discord = require("discord.js");
const welcome = require("./welcome");
const client = new Discord.Client();
const Commands = require("./command-handler");

// Handle new member messaging
client.on("guildMemberAdd", (member) => {
  Commands.newMemberHandler(member);
});

client.on("message", async (message) => {
  if (message.content === "HOCInfoDebug") {
    //debugging only
    Commands.newMemberHandlerDebugging(message);
  } else if (message.channel.type === "dm") {
    if (message.content.startsWith("!addgh")) {
      await Commands.githubUsernameHandler(message);
    } else if (message.content.startsWith("!addemail")) {
      await Commands.emailHandler(message);
    }
  }
});

client.login(process.env.BOT_TOKEN);
