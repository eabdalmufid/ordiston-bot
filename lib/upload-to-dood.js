import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'

class Doodstream {
    constructor(fileBuffer, api_key) {
        if (api_key !== undefined && fileBuffer !== undefined) {
            this.api_key = api_key;
            this.fileBuffer = fileBuffer;
        }
    }

    async init() {
        if (this.api_key !== undefined && this.fileBuffer !== undefined) {
            try {
                this.uploadUrl = await this.getLink();
                this.result = await this.upload();
                return this.result;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }

    async getLink() {
        const response = await fetch(`https://doodapi.com/api/upload/server?key=${this.api_key}`);
        const data = await response.json();
        return data.result;
    }

    async upload() {
        const { ext, mime } = await fileTypeFromBuffer(this.fileBuffer) || {};
        if (!ext || !mime) {
            throw new Error('Tipe file tidak dapat diidentifikasi');
        }

        const formData = new FormData();
        const blob = new Blob([this.fileBuffer.buffer], { type: mime });
        formData.append('type', 'submit');
        formData.append('api_key', this.api_key);
        formData.append('file', blob, `tmp.${ext}`);

        const options = {
            method: 'POST',
            body: formData,
            //headers: formData.getHeaders(),
        };

        const response = await fetch(this.uploadUrl, options);
        const data = await response.json();
        const result = data.result[0];

        return result.protected_embed;
    }
}

export { Doodstream };