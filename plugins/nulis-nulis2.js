import { format } from 'util'
import { spawn } from 'child_process'

let handler = async (m, { conn, command, args, text }) => {
    if (!global.support.convert &&
        !global.support.magick &&
        !global.support.gm) return handler.disabled = true // Disable if doesnt support
    let inputPath = 'src/kertas/biasa/b.jpg'
    let folioal = 'src/kertas/folio/al.jpg'
    let folioar = 'src/kertas/folio/ar.jpg'
    let foliobl = 'src/kertas/folio/bl.jpg'
    let foliobr = 'src/kertas/folio/br.jpg'
    let bukual = 'src/kertas/buku/al.jpg'
    let bukuar = 'src/kertas/buku/ar.jpg'
    let bukubl = 'src/kertas/buku/bl.jpg'
    let bukubr = 'src/kertas/buku/br.jpg'
    let fontPath = 'src/font/Zahraaa.ttf'
    let d = new Date()
    let tgl = d.toLocaleDateString('id-Id')
    let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
    let splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
    let teks = splitText.split('\n').slice(0, 31).join('\n')
    if (command == 'nuliskiri') {
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        bukual,
        '-font',
        fontPath,
        '-size',
        '960x1280',
        '-pointsize',
        '22',
        '-interline-spacing',
        '2',
        '-annotate',
        '+140+153',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ]
    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Hati² ketahuan:v', m)
        })
        .stdout.on('data', chunk => bufs.push(chunk))
        }
        if (command == 'nuliskanan') {
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        bukuar,
        '-font',
        fontPath,
        '-size',
        '960x1280',
        '-pointsize',
        '23',
        '-interline-spacing',
        '2',
        '-annotate',
        '+128+129',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ]
    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Hati² ketahuan:v', m)
        })
        .stdout.on('data', chunk => bufs.push(chunk))
        }
        if (command == 'foliokanan') {
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        folioal,
        '-font',
        fontPath,
        '-size',
        '1720x1280',
        '-pointsize',
        '23',
        '-interline-spacing',
        '4',
        '-annotate',
        '+48+185',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ]
    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Hati² ketahuan:v', m)
        })
        .stdout.on('data', chunk => bufs.push(chunk))
        }
        if (command == 'foliokanan') {
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        folioar,
        '-font',
        fontPath,
        '-size',
        '960x1280',
        '-pointsize',
        '23',
        '-interline-spacing',
        '3',
        '-annotate',
        '+89+190',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ]
    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Hati² ketahuan:v', m)
        })
        .stdout.on('data', chunk => bufs.push(chunk))
        }
}
handler.help = ['nuliskiri', 'nuliskanan', 'foliokiri', 'foliokanan'].map(v => v + ' <teks>')
handler.tags = ['nulis']
handler.command = /^(foliok(anan|iri)|nulisk(anan|iri))$/i
export default handler
