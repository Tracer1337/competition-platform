const Guild = require("../../Models/Guild.js")

async function run(args, message) {
    const model = await Guild.findBy("id", message.guild.id)

    if (!model) {
        return await message.channel.send("This guild is not registered")
    }

    if (model.announcement_channel_id) {
        const channel = message.channel.guild.channels.cache.get(model.announcement_channel_id)

        if (channel) {
            await channel.send("This channel is now unregistered")
        }
    }

    model.announcement_channel_id = message.channel.id

    await model.update()

    await message.channel.send("This channel is now registered")
}

module.exports = {
    run,
    desc: "Sets the channel in which announcements (like new competitions) will be sent. There can only be one announcement channel per guild.",
    usage: "set-announcement-channel",
    alias: ["announcement-channel", "announcements"]
}