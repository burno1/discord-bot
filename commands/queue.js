const Discord = require('discord.js');
const { Menu } = require('discord.js-menu');

module.exports = {
    name: "queue",
    description: "Get the list of songs.",
    async execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        var songs = [];
        let pages = [];
        var i, j, temporary, chunk = 5;

        if(!serverQueue) return message.channel.send('There is nothing playing.');
            
        songs = serverQueue.songs.map((song,index) =>{
           return {id:index, title:song.title, url:song.url}
        })
        
        for (let i = 0, j = songs.length; i < j; i += chunk) {
            temporary = songs.slice(i, i + chunk);

            let page;
            let msg = new Discord.MessageEmbed({
                color: '#49B224',
                title: 'Queue',
                fields: []
            });

            temporary.forEach(song =>{
                msg.fields.push({name:`${song.id} - ${song.title}`, value:song.url})
            })

            page = {
                name: 'Queue',
                content: msg,
                reactions:{
                    "⏮️": "first",
                    "◀️": "previous",
                    "▶️": "next",
                    "⏭️": "last"
                }
            }

            pages.push(page);
        }

        let menu = new Menu(
            message.channel,
            message.author.id,
            pages,
            0
        )
        menu.start();
    }
}
