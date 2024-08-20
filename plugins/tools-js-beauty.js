const {
    js,
    css,
    html,
    js_beautify,
    css_beautify,
    html_beautify
} = await (await import('js-beautify')).default;
let handler = async (m, {
    args,
    command,
    usedPrefix
}) => {
    const usage = "*Example:*\n" + usedPrefix + command + " (Input text or reply text to enc code)"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply(usage)

    if (command === "beautyjs") {
        try {
            const beautifulJS = js(text);
            await m.reply(beautifulJS)
        } catch (e) {
            try {
                const beautifulJS = js_beautify(text);
                await m.reply(beautifulJS)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
    if (command === "beautycss") {
        try {
            const beautifulCSS = css(text);
            await m.reply(beautifulCSS)
        } catch (e) {
            try {
                const beautifulCSS = css_beautify(text);
                await m.reply(beautifulCSS)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
    if (command === "beautyhtml") {
        try {
            const beautifulHTML = html(text);
            await m.reply(beautifulHTML)
        } catch (e) {
            try {
                const beautifulHTML = html_beautify(text);
                await m.reply(beautifulHTML)
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["beauty *[js/css/html]*"]
handler.tags = ["tools"]
handler.command = /^beauty(js|css|html)$/i
export default handler