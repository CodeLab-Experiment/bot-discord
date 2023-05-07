const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

require("dotenv").config();

client.on("ready", () => {
	console.log(`${client.user.username} is ready to work`)

	client.user.setPresence({ 
		activities: [
			{ 
				name: 'discord.js',
				type: ActivityType.Playing,
			}
		],
		status: 'online' 
	}
	);
})

client.on("messageCreate", (message) => {
	console.log(message.content)
	if (message.content.toLowerCase() == 'ping') {
		message.reply('pong')
		.then(() => console.log(`Replied to message "${message.content}"`))
		.catch(console.error);;
	}
})

client.login(process.env.TOKEN);