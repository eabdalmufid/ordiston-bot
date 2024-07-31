import axios from 'axios'; // For making HTTP requests
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

const models = {
    "gpt-4": {
        "id": "gpt-4",
        "name": "GPT-4",
        "maxLength": 24000,
        "tokenLimit": 8000,
    },
    "gpt-3.5-turbo": {
        "id": "gpt-3.5-turbo",
        "name": "GPT-3.5",
        "maxLength": 12000,
        "tokenLimit": 4000,
    },
    "gpt-3.5-turbo-16k": {
        "id": "gpt-3.5-turbo-16k",
        "name": "GPT-3.5-16k",
        "maxLength": 48000,
        "tokenLimit": 16000,
    },
};

class Liaobots {
    constructor() {
        this.url = "https://liaobots.com";
        this.working = false;
        this.supports_gpt_35_turbo = true;
        this.supports_gpt_4 = true;
        this._auth_code = null;
    }

    async* createAsyncGenerator(
        model,
        messages,
        auth = null,
        proxy = null,
        ...kwargs
    ) {
        model = model in models ? model : "gpt-3.5-turbo";
        const headers = {
            "authority": "liaobots.com",
            "content-type": "application/json",
            "origin": this.url,
            "referer": this.url + "/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        };

        let auth_code = auth !== null ? auth : this._auth_code;

        if (!auth_code) {
            try {
                const response = await axios.post(this.url + "/api/user", { authcode: "" }, { proxy });
                auth_code = this._auth_code = response.data.authCode;
            } catch (error) {
                throw error;
            }
        }

        const data = {
            conversationId: uuidv4(),
            model: models[model],
            messages,
            key: "",
            prompt: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully.",
        };

        try {
            const response = await axios.post(this.url + "/api/chat", data, { proxy, headers: { "x-auth-code": auth_code } });

            yield* response.data;
        } catch (error) {
            throw error;
        }
    }

    get params() {
        const params = [
            ["model", "str"],
            ["messages", "list[dict[str, str]]"],
            ["stream", "bool"],
            ["proxy", "str"],
            ["auth", "str"],
        ];
        const param = params.map(p => p.join(": ")).join(", ");
        return `g4f.provider.${this.constructor.name} supports: (${param})`;
    }
}

export { Liaobots };