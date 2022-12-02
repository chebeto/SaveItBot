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

// Se realiza conexión
client.on('ready', ()=> {
    console.info('🥳 Bot succesfully connected 🥳');
});

client.on('messageReactionAdd', async (reaction, user) => {

    //SECCIÓN PARA GUARDADO DEL MENSAJE

    //Se valida que el emoji sea el indicado
    if(reaction.emoji.name === '📋'){
        //Se obtiene información sobre servidor, canal y mensaje para referencia futura
        let guild = reaction.message.guildId;
        let channel = reaction.message.channelId;
        let message = reaction.message.id;
        const farewell = [
                        'Saludos, viejo sabroso', 
                        'Adios, viejo cochino',
                        'Hasta la vista, baby',
                        'Adios, vaquero',
                        'My job here is done'
                    ]
        const randomizer = Math.floor(Math.random() * farewell.length);
		try {
            //Se genera el mensaje a enviar
            await reaction.fetch();
            let embed = new EmbedBuilder()
            .setColor(0xEFBA2D)
            .setAuthor({name: 'SaveIt', 
                        url: 'https://twitter.com/el_chebs'})
            .setTitle('💬 Ir al mensaje')
            .setDescription(`Aquí tienes el mensaje: '${reaction.message.content}', fue compartido por @${reaction.message.author.username} en el canal #${reaction.message.channel.name}`)
            .setURL(baseURL + guild + '/' + channel + '/' + message)
            .setTimestamp()
	        .setFooter({ text: farewell[randomizer]});
            //Se envia el mensaje
            user.send({ embeds: [embed] })
		} catch (error) {
			console.error('Algo salió mal obteniendo el mensaje:', error);
			return;
		}
	}
});

/* client.on('messageReactionAdd', (reaction) => {

    //SECCIÓN PARA GUARDADO DEL MENSAJE

    //Bloque para borrado de mensaje, se necesita que sea enviado por un Bot y emoji indicado
    if (reaction.message.author.bot && reaction.emoji.name === "✅") {
        try{
            reaction.fetch();
            reaction.message.delete();
        } catch(error){
            console.error(error)
            return;
        }

    }
}) */

// Servidor Express
keepAlive();

// Conexión a Discord
client.login(discord_token);