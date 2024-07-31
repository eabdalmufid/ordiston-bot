import fetch from "node-fetch"

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input quotes atau reply teks yang ingin di jadikan quotes!"
    
    let quote = await createQuote(m.name, text)
    await conn.sendFile(m.chat, quote, '', "*Request by:*\n" + m.name, m)

}
handler.tags = ["search"]
handler.command = handler.help = ["quozio"]

export default handler

// Create an inspriational quote either based on a slash command or somebody else's message
// This uses a public(?) API that I "reverse engineered" from quozio.com

async function createQuote(author, message) {
    const host = "https://quozio.com/";
    let path = "";

    // Submit quote
    path = "api/v1/quotes";
    const body = JSON.stringify({
        author: author,
        quote: message,
    });

    const quote = await fetch(host + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
    }).then((val) => val.json());

    console.debug("Created quote at: " + quote["url"], "quote");
    const quoteId = quote["quoteId"];

    // Choose a random template
    path = "api/v1/templates";
    const templates = await fetch(host + path).then((val) => val.json()).then((
        val,
    ) => val["data"]);

    const index = Math.floor(Math.random() * templates.length);
    console.debug("Chose template from: " + templates[index]["url"], "quote");
    const templateId = templates[index]["templateId"];

    // Apply the template to the quote
    path = `api/v1/quotes/${quoteId}/imageUrls?templateId=${templateId}`;
    const imageUrl = await fetch(host + path).then((val) => val.json()).then((
        val,
    ) => val["medium"]);
    console.debug("Created quote image at: " + imageUrl, "quote");

    // Return generated image
    return imageUrl;
}