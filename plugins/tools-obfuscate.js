import JavaScriptObfuscator from "javascript-obfuscator"

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
    
   try {
        const message = await Encrypt(text)
        await m.reply(message)
   } catch (e) {
       await m.reply(eror)
    }
}
handler.command = /^(obfus(cate)?|enc)$/i
export default handler

async function Encrypt(query) {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        sourceMap: false,
        sourceMapMode: "separate",
    })

    return obfuscationResult.getObfuscatedCode()
}