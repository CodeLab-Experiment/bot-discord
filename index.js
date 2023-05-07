const { Client, GatewayIntentBits, ActivityType, EmbedBuilder, Embed } = require("discord.js");
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
	if (message.author.bot) return;
	const prefix = "/";
	if (!message.content.startsWith(prefix)) return; // not a slash command
	const args = message.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase()
	switch (command) {
		case 'ping':
			message.reply(`🏓pong \`${client.ws.ping}ms\``)
			break;
		case 'say':
			if (message.deletable) message.delete();
			message.channel.send(args.join(' '))
			break;
		case 'avatar':
			// @ somebody in Discord => mention (tag)
			// guild -> server
			const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member // member who sends the msg
			const avatarURL = member.displayAvatarURL({
				extension: "png",
			})
			console.log(avatarURL)
			const name = member.displayName || member.username;
			const embed = new EmbedBuilder()
				.setTitle(`This is ${name}'s avatar`)
				.setImage(avatarURL)
			message.channel.send({
				embeds: [embed]
			})
			break;
		default:
			message.reply('Invalid command')
			break;
	}
})

client.login(process.env.TOKEN);