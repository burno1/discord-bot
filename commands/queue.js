const Discord = require('discord.js');

module.exports = {
    name: "queue",
    description: "Get the list of songs.",
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) return message.channel.send('There is nothing playing.');
        else {
            let msg = new Discord.MessageEmbed()
                .setColor('#49B224')
                .setTitle('Queue');
            serverQueue.songs.forEach(song=> {
                msg.addField(song.title)
            });
            return message.channel.send(msg);
        }
        
    }
}