const guildSettings = require('../../lib/guilddb');

module.exports = {
    name: 'setTopic',
    description: 'Change the servers set ticket log.',
    guildOnly: true,
    permissionsRequired: ['ADMINISTRATOR'],
    cooldown: 60,
    args: true,
    aliases: ['topic', 'set topic'],
    usage: '[command name] "Topic"',
    async execute(client, message, args) {
        const currentGuildID = message.guild.id;
        let topic = args.slice(0).join(" ");
        guildSettings.findOne({
            id: currentGuildID
        }, (err, g) => {
            if (err) {
                console.error(err);
            }
            if (g.channels.ticketCategoryID === message.channel.parentID) {
                message.channel.setName(topic + ' - ' + message.author.username);
                message.reply('I\'ve set the topic to `' + topic + '`');
            } else {
                message.reply('You have to send this command in a ticket channel!');
            }
        });
    }
};