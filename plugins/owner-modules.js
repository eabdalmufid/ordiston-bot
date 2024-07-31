import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
let exec = promisify(_exec).bind(cp);

let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return;
  m.reply('Executing...');

  const compressedFilePath = 'node_modules.tar.gz';
  if (!fs.existsSync(compressedFilePath)) {
    try {
      await exec('tar -czf node_modules.tar.gz node_modules');
      m.reply('Successfully created node_modules.tar.gz!');
    } catch (e) {
      m.reply('Failed to create node_modules.tar.gz');
      return; // Stop execution if tar command failed
    }
  } else {
    m.reply('node_modules.tar.gz already exists, skipping creation...');
  }

  // Check again if the file exists after compression attempt
  if (fs.existsSync(compressedFilePath)) {
    const compressedData = fs.readFileSync(compressedFilePath);
    await conn.sendMessage(
      m.chat,
      {
        document: compressedData,
        mimetype: 'application/gz',
        fileName: 'node_modules.tar.gz',
      },
      {
        quoted: m,
        ephemeralExpiration: ephemeral
      }
    );
  } else {
    m.reply('File not found. Compression may have failed.');
  }
};

handler.help = ['modules'];
handler.tags = ['owner'];
handler.command = /^(modules)$/i;
handler.owner = true;

export default handler;