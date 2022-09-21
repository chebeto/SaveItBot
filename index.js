require('dotenv').config();

const baseURL = 'https://discord.com/channels/'
const { discord_token } = process.env
 const { Client, GatewayIntentBits, Partials, EmbedBuilder, DMChannel } = require('discord.js');
const keepAlive = require("./server");
const client = new Client({ 
    intents: [ GatewayIntentBits.Guilds,
               GatewayIntentBits.GuildMembers,
               GatewayIntentBits.GuildMessages,
               GatewayIntentBits.MessageContent,
               GatewayIntentBits.GuildMessageReactions,
               GatewayIntentBits.GuildEmojisAndStickers,
               GatewayIntentBits.DirectMessages,
               GatewayIntentBits.DirectMessageReactions,
            ],
    partials: [ Partials.Message, 
                Partials.Channel, 
                Partials.Reaction
            ],
});

client.on('ready', ()=> {
    console.info('Bot succesfully connected 🥳');
});

client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.emoji.name === '📋'){
        let guild = reaction.message.guildId;
        let channel = reaction.message.channelId;
        let message = reaction.message.id;
        const farewell = [
                        'Saludos, viejo sabroso', 
                        'Adios, viejo cochino',
                        'Hasta la vista, baby',
                        'Adios, vaquero',
                    ]
        const randomizer = Math.floor(Math.random() * farewell.length);
		try {
            await reaction.fetch();
            let embed = new EmbedBuilder()
            .setColor(0xEFBA2D)
            .setAuthor({name: 'SaveIt_bot', 
                        iconURL: 'https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg', 
                        url: 'https://twitter.com/el_chebs'})
            .setTitle('📋 Ir al mensaje')
            .setDescription(`Aquí tienes el mensaje: '${reaction.message.content}', fue compartido por @${reaction.message.author.username} en el canal #${reaction.message.channel.name}`)
            .setURL(baseURL + guild + '/' + channel + '/' + message)
            .setTimestamp()
	        .setFooter({ text: farewell[randomizer]});

            user.send({ embeds: [embed] })
		} catch (error) {
			console.error('Algo salió mal obteniendo el mensaje:', error);
			return;
		}
	}  
});

keepAlive();
// Conexión a Discord
client.login(discord_token);