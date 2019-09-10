const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      autoAliases: true,
      aliases: ['👢', 'kic', 'remove'],
      permissionLevel: 1,
      runIn: ['text'],
      description: 'Kicks the mentioned user.',
      usage: '<User:member> [reason:reason]',
      usageDelim: ' '
    });
  }

  async run(message, [member, reason]) {
    if (!message.guild.me.hasPermission('KICK_MEMBERS'))
      return message.sendMessage('Sorry, but I need the `KICK MEMBERS` permission to execute this command.');
    await member['send'](
      `You were kicked from **${message.guild.name}** by \`${message.author.username}\` for the following reason: \`\`\`${reason}\`\`\``
    ).catch();
    await member['kick']({ reason });
    return message.sendMessage(
      new MessageEmbed({ footer: { icon_url: message.author.displayAvatarURL() } })
        .setTitle('MEMBER KICKED')
        .setTimestamp()
        .setColor('ORANGE')
        .setThumbnail(this.client.user.displayAvatarURL())
        .addField('USER', member['user'].username, true)
        .addField('MODERATOR', message.author, true)
        .addField('REASON', `*${reason}*`, true)
    );
  }
};