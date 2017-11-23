'use strict';
const color = require('../wavelength-plugins/colors');
function font(color, text) { return '<font color="' + color + '">' + text + '</font>'; }
function bold(text) { return '<b>' + text + '</b>'; }
exports.commands = {
	givechatcolor: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		if (!target) return this.errorReply('USAGE: /givechatcolor [USER]');
		Db.chatcolors.set(target, 1);
		this.sendReply(target + ' has been given the ability to use chat colors.');
		Users(target).popup('You have been given the ability to use chat color.');
	},
	takechatcolor: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		if (!target) return this.errorReply('USAGE: /takechatcolors [USER]');
		if (!Db.chatcolors.has(user)) return this.errorReply('This user does not have the ability to use chat colors.');
		Db.chatcolors.remove(user);
		this.sendReply('this user has had their ability to use chat colors is taken from them.');
	},
	chatcolour: 'chatcolor',
	chatcolor: function (target, room, user) {
		let group = user.getIdentity().charAt(0);
		if (room.auth) group = room.auth[user.userid] || group;
		if (user.hiding) group = ' ';
		let targets = target.split(',');
		if (targets.length < 2) return this.parse('/help chatcolor');
		if (!Db.chatcolors.has(user.userid)) return this.errorReply('You dont have ability to use chat colors.');
		if (!this.canTalk()) return this.errorReply("You may not use this command while unable to speak.");
		this.add('|raw|' + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='background: none ; border: 0 ; padding: 0 5px 0 0 ; font-family: &quot;verdana&quot; , &quot;helvetica&quot; , &quot;arial&quot; , sans-serif ; font-size: 9pt ; cursor: pointer'><font color='" + user.name + "'>" + bold(font(color(user), user.name + ":</font></button>" + '<b><font color="' + targets[0].toLowerCase().replace(/[^#a-z0-9]+/g, '') + '">' + Chat.escapeHTML(targets.slice(1).join(",")) + '</font></b>')));
	},
	chatcolorhelp: ["/chatcolor OR /chatcolour [colour], [message] - Outputs a message in a custom colour."],
};
