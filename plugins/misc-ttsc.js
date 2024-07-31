import {
    randomUUID
} from "crypto"
let fetchear;
import("node-fetch").then(function({
    default: fetch
}) {
    fetchear = fetch
})
const fakeYouToken = "187b56b2217ac09dbe6ae610f19b35dfbc53cdd5857f818f03b45d048287b4bc"

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    let ListVoice = await (await fetch("https://api.fakeyou.com/tts/list")).json()
    let lister = ListVoice.models
    let readMore = String.fromCharCode(8206).repeat(4001);

    let query = `Input query!\n\n*Example:*\n${usedPrefix + command} [angka]|[teks]\n\n*Pilih angka yg ada*\n` + readMore + lister.map((item, index) => "  " + (index + 1) + ". " + item.title).join("\n");
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let [atas, bawah] = text.split("|")
    if (!atas) return m.reply(query)
    if (!bawah) return m.reply(query)
    const {
        modelToken,
        title
    } = await getModelByIndex(ListVoice, atas);
    await m.reply(wait + "\n" + title)

    try {
        let res = await requestSpeech(modelToken, bawah)
        if (res) await conn.sendMessage(m.chat, {
            audio: await(await conn.getFile(res)).data,
            mimetype: 'audio/mp4',
            ptt: true,
            waveform: [0, 100, 0, 100, 0]
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
    } catch (e) {
        await m.reply(eror)
    }

}
handler.help = ["ttsc *number|your text*"]
handler.tags = ["misc"]
handler.command = /^(ttsc)$/i
export default handler

async function getModelByIndex(arrayObject, index) {
    const response = arrayObject;

    const model = response.models[index - 1];
    if (model) {
        const {
            model_token,
            title
        } = model;
        return {
            modelToken: model_token,
            title
        };
    } else {
        throw new Error('Invalid index');
    }
}

/*
  Name: fetchPatiently(String url, Object params): Object
  Description: Wrapper for node-fetch which retries upon 408 and 502 error codes
  Returns: HTTP response
*/
async function fetchPatiently(url, params) {
    let response = await fetchear(url, params);
    while (response.status === 408 || response.status === 502) {
        // Wait three seconds between each new request
        await new Promise(res => setTimeout(res, 3000));
        response = await fetchear(url, params);
    }
    return response;
}

/*
  Name: poll(String token): String
  Description: Polls until a speech request is complete
  Returns: URL on success, error string on failure
*/
function poll(token) {
    return new Promise(async (resolve, reject) => {

        // Wait one second between each poll request
        await new Promise(res => setTimeout(res, 1000));

        // Retrieve status of current speech request
        const response = await fetchPatiently("https://api.fakeyou.com/tts/job/" + token, {
            method: "GET",
            headers: {
                "Authorization": fakeYouToken,
                "Accept": "application/json"
            }
        }).catch(error => {
            reject(`HTTP error! ${error.name}`);
            console.error(error);
        });
        if (!response.ok) return;

        const json = await response.json().catch(error => {
            reject("Failed to parse poll JSON!");
            console.error(error);
        });
        if (!json) return;

        if (!json.success) {
            reject(`Failed polling! ${json.error_reason}`);
            console.error(json);
            return;
        }

        switch (json.state.status) {
            case "pending":
            case "started":
            case "attempt_failed": {
                // Continue polling until success
                await poll(token).then(resolve).catch(reject);
                return;
            }
            case "complete_success": {
                // Success, return audio URL
                resolve("https://storage.googleapis.com/vocodes-public" + json.state.maybe_public_bucket_wav_audio_path);
                return;
            }
            case "complete_failure":
            case "dead":
            default: {
                // Failure, stop polling
                reject(`Failed polling! ${json.state.status}`);
                console.error(json);
                return;
            }
        }
    });
}

/*
  Name: requestSpeech(String voice, String message): String
  Description: Requests speech and polls until job is complete
  Returns: URL on success, error string on failure
*/
async function requestSpeech(voice, message) {
    return new Promise(async (resolve, reject) => {

        // Request generation of speech
        const response = await fetchPatiently("https://api.fakeyou.com/tts/inference", {
            method: "POST",
            body: JSON.stringify({
                tts_model_token: voice,
                uuid_idempotency_token: randomUUID(),
                inference_text: message
            }),
            headers: {
                "Authorization": fakeYouToken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).catch(error => {
            reject(`HTTP error! ${error.name}`);
            console.error(error);
        });
        if (!response.ok) return;

        const json = await response.json().catch(error => {
            reject("Failed to parse request JSON!");
            console.error(error);
        });
        if (!json) return;

        if (!json.success) {
            reject(`Failed voice request! ${json.error_reason}`);
            console.error(json);
            return;
        }

        // Poll until request has been fulfilled
        await poll(json.inference_job_token).then(resolve).catch(reject);
    });
};