const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Github fu-w`, `${client.user.username} Online!`,`Ticket Bot!` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type : ActivityType.Streaming , url : `https://www.twitch.tv/sanctusfurki` }), 22000);
}};