const { Message, MessageEmbed, Channel, Client } = require('discord.js')
module.exports = [{
    name: "channelCreate",
    type: 'event',
    /**
     * 
     * @param {Channel} channel 
     * @param {Client} client 
     * @returns 
     */
    async execute(channel,client) {
        if(!channel.guild) return client.error('New dm channel created');
        const ch = await client.db.get('chlogs_' + channel.guild.id) ? client.channels.cache.get(await client.db.get('chlogs_' + channel.guild.id)) : null
        if(!ch) return;
        /**
         * @returns {String}
         */
        let desc; 
        switch(channel.type) {
case 'GUILD_TEXT':  desc = `New channel created\nName: ${ch.name},\n ID: ${ch.id} \n NSFW ${channel.nsfw ? 'yes' : 'no'} \n Topic: ${channel.topic}`
break;
case 'GROUP_DM':
client.error('group dm found')
break;
case 'GUILD_STAGE_VOICE':  
desc = `New Stage Channel\nName: ${channel.name} \n ID: ${channel.id} \n User limit: ${channel.userLimit} \n bitrate: ${channel.bitrate} \n Topic ${channel.topic}`
break;
case 'GUILD_VOICE': 
desc = `New voice Channel\nName: ${channel.name} \n ID: ${channel.id} \n User limit: ${channel.userLimit} \n bitrate: ${channel.bitrate} `
break
case 'GUILD_NEWS': desc = `New channel created\nName: ${ch.name},\n ID: ${ch.id} \n NSFW ${channel.nsfw ? 'yes' : 'no'} \n Topic: ${channel.topic}`
break
case 'GUILD_CATEGORY': desc = `New catagory created\nName: ${ch.name} \n ID: ${ch.id} \n pos ${channel.rawPosition}` 
break;
case 'GUILD_NEWS_THREAD': desc = `New thread created\nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
case 'GUILD_PRIVATE_THREAD': desc = `New thread created\nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
case 'GUILD_PUBLIC_THREAD': desc = `New thread created\nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
default:
    client.error(channel.type)
break;
        }
       if(!desc) return;
        let embeds = [new MessageEmbed().setTitle(`new Channel`).setDescription(desc).setColor('NOT_QUITE_BLACK').setTimestamp()]
        ch.send({ embeds })
    }
},
{
    name: 'channelDelete',
    async execute(channel,client) {
        console.log(channel)
        if(!channel) return client.error('no channel provided')
        if(channel.partial) await channel.fetch()
        if(!channel.guild) return client.error('New dm channel created');
        const ch = await client.db.get('chlogs_' + channel.guild.id) ? client.channels.cache.get(await client.db.get('chlogs_' + channel.guild.id)) : null
        if(!ch) return client.error('debug: no channel found!');
        /**
         * @returns {String}
         */
        let desc; 
        switch(channel.type) {
case 'GUILD_TEXT':  desc = `channel deleted \nName: ${ch.name},\n ID: ${ch.id} \n NSFW ${channel.nsfw ? 'yes' : 'no'} \n Topic: ${channel.topic}`
break;
case 'GROUP_DM':
client.error('group dm found')
break;
case 'GUILD_STAGE_VOICE':  
desc = `Stage Channel deleted \nName: ${channel.name} \n ID: ${channel.id} \n User limit: ${channel.userLimit} \n bitrate: ${channel.bitrate} \n Topic ${channel.topic}`
break;
case 'GUILD_VOICE': 
desc = `voice Channel deleted \nName: ${channel.name} \n ID: ${channel.id} \n User limit: ${channel.userLimit} \n bitrate: ${channel.bitrate} `
break
case 'GUILD_NEWS': desc = `channel deleted\nName: ${ch.name},\n ID: ${ch.id} \n NSFW ${channel.nsfw ? 'yes' : 'no'} \n Topic: ${channel.topic}`
break
case 'GUILD_CATEGORY': desc = `catagory deleted\nName: ${ch.name} \n ID: ${ch.id} \n pos ${channel.rawPosition}` 
break;
case 'GUILD_NEWS_THREAD': desc = `thread deleted \nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
case 'GUILD_PRIVATE_THREAD': desc = `thread deleted \nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
case 'GUILD_PUBLIC_THREAD': desc = `thread deleted \nName: ${ch.name} \n autoArchiveDuration: ${require('ms')(channel.autoArchiveDuration)} \n ID: ${channel.id} \n creator: <@${channel.ownerId}> (${channel.ownerId})`
break
default:
    client.error(channel)
break;
        }
       if(!desc) return client.error('desc is null');
        let embeds = [new MessageEmbed().setTitle(`new Channel`).setDescription(desc).setColor('NOT_QUITE_BLACK').setTimestamp()]
        ch.send({ embeds }).catch(client.error)
    },
    type: 'event',
}, {
    name: 'channelUpdate', 
    type: 'event',
    /**
     * 
     * @param {Channel} ochannel 
     * @param {Channel} nchannel 
     * @param {Client} client 
     */
    async execute(ochannel, nchannel, client) {
    if(ochannel.isText()) {

    } else if(ochannel.isVoice()) {

    } else if(ochannel.isThread()) {

    } else {
        client.error(ochannel.type+nchannel.type)
    }
    }
}]