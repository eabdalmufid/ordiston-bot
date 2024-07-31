const handler = async (m, { conn, args, usedPrefix, command, text }) => {
	if (!args[0]) {
		return m.reply(`Available agruments:
> msg (set msg)
> gcjid (set group jid)
> on/off (enable/disable)

Example: *${usedPrefix + command}* msg [your msg]`);
	}
	const _args = {
		msg: {
			required: true,
			value: text.replace(args[0].toLowerCase(), "").trim() || null,
			key: "message",
		},
		gcjid: {
			required: true,
			value: text.replace(args[0].toLowerCase(), "").trim() || null,
			key: "groupJid",
		},
		on: {
			required: false,
			value: true,
			ok: "Enabled",
			key: "enable",
		},
		off: {
			required: false,
			value: false,
			ok: "Disabled",
			key: "enable",
		},
	};
	if (_args[args[0]]) {
		if (_args[args[0]]["required"] && !_args[args[0]]["value"]) {
			return m.reply("This parameter required a value");
		}
		global.db.data.settings[conn.user.jid]["validatingUserOnGroup"][_args[args[0].toLowerCase()]["key"]] = _args[args[0].toLowerCase()]["value"];
		m.reply(`Validating User On Group ${_args[args[0].toLowerCase()]["key"]} set To *${_args[args[0].toLowerCase()]["value"]}*`);
	}
};
handler["owner"] = true;
handler["tags"] = ["owner"];
handler["help"] = ["handle"];
handler["command"] = ["handle"];

export default handler;
