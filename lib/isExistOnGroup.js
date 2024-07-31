/** Pass parameter in @link {../handler.js} */
export default async (m, { conn, groupJid }) => {
	/** @see @link {../plugins/owner-handle-pass.js} */
	const { message } =
		global["db"]["data"]["settings"][conn.user.jid]["validatingUserOnGroup"];
	const groups = await conn.groupFetchAllParticipating();
	if (groups[groupJid]) {
		const existGroup = groups[groupJid];
		let isExist = false;
		for (const obj of existGroup["participants"]) {
			if (obj["id"] === m.sender) {
				isExist = true;
			}
		}
		if (!isExist) {
			/** @see @link {../plugins/owner-handle-pass.js} */
			await conn.sendMessage(
				m["chat"],
				{ text: message || "Join group dulu mek" },
				{ quoted: m, ephemeralExpiration: ephemeral }
			);
		}
		return isExist;
	}
};
