import fetch from "node-fetch"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let ends = [
        "abs",
        "arccos",
        "arcsin",
        "arctan",
        "area",
        "cos",
        "derive",
        "factor",
        "integrate",
        "log",
        "simplify",
        "sin",
        "tan",
        "tangent",
        "zeroes"
    ]
    let [modes, kodes] = text.split(/[^\w\s]/g)
    if (!ends.includes(modes)) return m.reply("*Example:*\n.newton sin|0\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join('\n'))

    if (ends.includes(modes)) {
        let res = await NewTon(modes, kodes);
        await m.reply(res.result);
    }

}
handler.help = ["newton type query"]
handler.tags = ["internet"]
handler.command = /^(newton)$/i

export default handler
async function NewTon(mode, input) {
    let res = await fetch(`https://newton.now.sh/api/v2/${mode}/${encodeURIComponent(input)}`)
    return await res.json()
}
