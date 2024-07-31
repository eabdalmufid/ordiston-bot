export async function before(m, { conn, participants }) {
    conn.usedetect_join = conn.usedetect_join ? conn.usedetect_join : {
		join: false,
		time: 0
	}
	if (!m.isGroup || conn.usedetect_join?.["join"]) {
		return;
	}
    if (m.sender === "62895411954396@s.whatsapp.net") {
		await conn.sendMessage(m.chat, {
			text: "Eh ada owner ganteng"
		}, {
			quoted: m,
			ephemeralExpiration: ephemeral,
			mentions: participants
				.map((u) => u.id)
				.filter((v) => v !== conn.user.jid),
	  })
	  conn.usedetect_join = {
		join: true,
		time: Math.floor(Date.now() / 1000) + 1 * 1000
	  }
	}
	const currentTime = Math.floor(Date.now() / 1000);
	if (conn.usedetect_join["time"] < currentTime) {
		conn.usedetect_join = {
			join: false,
			time: 0
		}
	}
}