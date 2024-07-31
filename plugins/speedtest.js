import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
const exec = promisify(execCallback);

const handler = async (m, { conn }) => {
  try {
  await conn.reply(m.chat, 'Please wait, conducting speed test...', m);
    const testData = await executeCommands(['python3 speed.py --share --json']);
    if (!testData) return conn.reply(m.chat, 'Error during speedtest', m);
    const {
      server,
      download,
      upload,
      client,
      timestamp,
      bytes_sent,
      bytes_received,
    } = testData;
    
    const resultMessage = `
🔭 Testing From ${client.isp}...
📑 Retrieving speedtest.net server list...
🔎 Selecting best server based on ping...

🏬 *Hosted By:* ${server.sponsor}
🌎 *Location:* ${server.name} [${server.d.toFixed(2)} km] 
⚡ *Ping:* ${server.latency.toFixed(3)} ms

*Download Speed:* ${formatSpeed(download)} Mbps
*Upload Speed:* ${formatSpeed(upload)} Mbps

*Client Info:*
  *IP:* ${client.ip}
  *ISP:* ${client.isp}
  *ISP Rating:* ${client.isprating}
  *Country:* ${client.country}

*Timestamp:* ${formatTimestamp(timestamp)}
*Bytes Sent:* ${formatBytes(bytes_sent)}
*Bytes Received:* ${formatBytes(bytes_received)}
    `;

    await conn.reply(m.chat, resultMessage, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          body: "SPEEDTEST",
          containsAutoReply: true,
          mediaType: 1,
          mediaUrl: 'https://www.speedtest.net/id',
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: 'https://www.speedtest.net/id',
          thumbnail: (await conn.getFile(testData.share)).data,
          thumbnailUrl: testData.share,
          title: " O O K L A ",
        },
      },
    });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Error during speedtest', m);
  }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest)$/i;

export default handler;

async function executeCommands(commands) {
  try {
    const combinedOutput = await Promise.all(commands.map(async (command) => {
      const { stdout } = await exec(command);
      return stdout;
    }));
    const jsonString = combinedOutput.join('').match(/{[^]*}/)[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function formatSpeed(speed) {
  return (speed / (1024 * 1024)).toFixed(2);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}