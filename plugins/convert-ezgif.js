import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "videotogif",
        "giftovideo",
        "optijpeg"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.ezgif videotogif|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "videotogif") {
            if (!inputs) return m.reply("Input query link\nExample: .ezgif videotogif|link")
            try {
                let item = await VideoToGif(inputs)
                let cap = `🔍 [ RESULT ]

📁 *fileSize:* ${item.fileSize}
📏 *width:* ${item.width}
📐 *height:* ${item.height}
🖼️ *frames:* ${item.frames}
📄 *fileType:* ${item.fileType}

 ${item.outputImageUrl}
`
                let urlgif = item.outputImageUrl
                await conn.sendMessage(m.chat, {
                    video: {
                        url: urlgif
                    },
                    gifPlayback: true,
                    gifAttribution: ~~(Math.random() * 2),
                    caption: cap
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "giftovideo") {
            if (!inputs) return m.reply("Input query link\nExample: .ezgif giftovideo|link")
            try {
                let item = await GifToVideo(inputs)
                let cap = `🔍 [ RESULT ]

📁 *fileSize:* ${item.fileSize}
 ${item.outputImageUrl}
`
                let urlgif = item.outputImageUrl
                await conn.sendMessage(m.chat, {
                    video: {
                        url: urlgif
                    },
                    caption: cap
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "optijpeg") {
            if (!inputs) return m.reply("Input query link\nExample: .ezgif optijpeg|link")
            try {
                let item = await OptiJpeg(inputs, inputs_, inputs__)
                let cap = `🔍 [ RESULT ]

📁 *fileSize:* ${item.fileSize}
 ${item.outputImageUrl}
`
                let urlgif = item.outputImageUrl
                await conn.sendMessage(m.chat, {
                    image: {
                        url: urlgif
                    },
                    caption: cap
                }, {
                    quoted: m,
                    ephemeralExpiration: ephemeral
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["ezgif"]
handler.tags = ["internet"]
handler.command = /^(ezgif)$/i
export default handler

/* New Line */
async function VideoToGif(video_url) {
    const response = await fetch('https://ezgif.com/video-to-gif?url=' + video_url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const data = new URLSearchParams({
        file: $('input[name="file"]').val(),
        start: $('#start').val(),
        end: $('#end').val(),
        size: $('#size').val(),
        fps: $('#fps').val(),
        method: $('#method').val(),
        diff: $('input[name="diff"]').prop('checked') ? 'on' : '',
    });

    const postResponse = await fetch($('form.ajax-form').attr('action'), {
        method: 'POST',
        body: data
    });
    const postHtml = await postResponse.text();
    const $$ = cheerio.load(postHtml);

    return {
        outputImageUrl: 'https:' + $$('#output .outfile img').attr('src'),
        fileSize: $$('#output .filestats strong').text(),
        width: $$('#output .filestats').text().match(/width: (\d+)/)[1],
        height: $$('#output .filestats').text().match(/height: (\d+)/)[1],
        frames: $$('#output .filestats').text().match(/frames: (\d+)/)[1],
        fileType: $$('#output .filestats').text().match(/type: (\w+)/)[1],
    };
}

async function GifToVideo(video_url) {
    const response = await fetch('https://ezgif.com/gif-to-mp4?url=' + video_url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const form = $('form.form'); // Select the form element with class 'form'
    const action = form.attr('action'); // Get the 'action' attribute value
    const file = form.find('input[name="file"]').val(); // Get the value of the 'file' input

    const data = new URLSearchParams({
        file: file
    });

    const postResponse = await fetch('https://ezgif.com' + action, {
        method: 'POST',
        body: data
    });
    const postHtml = await postResponse.text();
    const $$ = cheerio.load(postHtml);

    const outfileHtml = $$('#output .outfile').html(); // Get the HTML content of the 'outfile' element
    const filestatsText = $$('#output .filestats').text(); // Get the text content of the 'filestats' element

    // Extract the output image URL from the outfile HTML
    const outputImageUrl = 'https:' + outfileHtml.match(/src="([^"]+)"/)[1];

    // Extract the file size, width, height, frames, and file type from the filestats text
    const fileSize = filestatsText.match(/File size: ([^,]+)/)[1].trim();
    return {
        outputImageUrl,
        fileSize

    };

}

async function OptiJpeg(video_url, percent, sizes) {
    const response = await fetch('https://ezgif.com/optijpeg?url=' + video_url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const form = $('.ajax-form');
  const action = form.attr('action');

  const fileInput = form.find('input[type="hidden"][name="file"]');
  const fileValue = fileInput.val();

  const losslessCheckbox = form.find('input[name="lossless"]');
  const losslessChecked = losslessCheckbox.prop('checked');

  const toKBCheckbox = form.find('input[name="tokb"]');
  const toKBChecked = toKBCheckbox.prop('checked');
  const toKBCustomValue = form.find('input[name="tokb_custom_value"]').val();

  const toPercentCheckbox = form.find('input[name="topercent"]');
  const toPercentChecked = toPercentCheckbox.prop('checked');
  const percentageValue = form.find('input[name="percentage"]').val();

  const formData = new FormData();
  formData.append('file', fileValue);
  formData.append('lossless', losslessChecked ? 'on' : 'off');
  formData.append('tokb', toKBChecked ? 'on' : 'off');
  formData.append('tokb_custom_value', sizes ? sizes : toKBCustomValue);
  formData.append('topercent', toPercentChecked ? 'on' : 'off');
  formData.append('percentage', percent ? percent : percentageValue);

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

    const postResponse = await fetch(action, requestOptions);
    const postHtml = await postResponse.text();
    const $$ = cheerio.load(postHtml);

    const outfileHtml = $$('#output .outfile').html(); // Get the HTML content of the 'outfile' element
    const filestatsText = $$('#output .filestats').text(); // Get the text content of the 'filestats' element

    // Extract the output image URL from the outfile HTML
    const outputImageUrl = 'https:' + outfileHtml.match(/src="([^"]+)"/)[1];

    // Extract the file size, width, height, frames, and file type from the filestats text
    const fileSize = filestatsText.match(/File size: ([^,]+)/)[1].trim();
    return {
        outputImageUrl,
        fileSize
    };

}