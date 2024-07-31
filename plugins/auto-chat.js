import { TextGenerationAPI } from '../lib/auto-chat.js';

// Sample buildPrompt function
function buildPrompt(messages) {
  return messages.join('\n');
}

export async function before(m) {
  this.autochat = this.autochat ? this.autochat : {};
  if (m.isBaileys || !this.autochat.status || !m.text) return false;
  let text = m.text;
  if (text) {
    try {
      const replicateApiKey = '3a4886dd3230e523600d3b555f651dc82aba3a4e';
      const cohereApiKey = 'mJ9GVG9lcV8iO7TJYOuQjqfcw4JB2y1CmirFXdX1';
      const textGenerationApi = new TextGenerationAPI(replicateApiKey, cohereApiKey);

      let generatedText = '';

      if (text.startsWith('settype')) {
        const setType = parseInt(text.split(' ')[1]);
        this.autochat.settype = setType;
        if (setType === 1) {
          delete this.autochat.modelName;
          await this.reply(m.chat, `Set settype to ${setType}.`, m);
        } else if (setType === 2) {
          delete this.autochat.modelId;
          await this.reply(m.chat, `Set settype to ${setType}.`, m);
        } else {
          await this.reply(m.chat, 'Invalid settype value.', m);
        }
      } else if (text.startsWith('setmodel')) {
        const setModel = parseInt(text.split(' ')[1]);
        const selectedModelIndex = setModel - 1;

        if (this.autochat.settype === 1 && selectedModelIndex < replicateModel.length) {
          this.autochat.modelId = replicateModel[selectedModelIndex];
          await this.reply(m.chat, `Set model to Replicate model ${selectedModelIndex + 1}.`, m);
        } else if (this.autochat.settype === 2 && selectedModelIndex < cohereModel.length) {
          this.autochat.modelName = cohereModel[selectedModelIndex];
          await this.reply(m.chat, `Set model to Cohere model ${selectedModelIndex + 1}.`, m);
        } else {
          await this.reply(m.chat, 'Invalid setmodel value or model type mismatch.', m);
        }
      } else if (text.includes('ai') || text.includes('autochat')) {
        const startIdx = Math.max(text.indexOf('ai'), text.indexOf('autochat')) + 2;
        const inputText = text.substring(startIdx).trim();
        const messages = [inputText];

        if (this.autochat.settype === 1) {
          if (!this.autochat.modelId) {
            await this.reply(m.chat, 'Please set the model ID for Replicate API using setmodel.', m);
            return;
          }
          generatedText = await textGenerationApi.generateTextFromReplicate(this.autochat.modelId, messages);
        } else if (this.autochat.settype === 2) {
          if (!this.autochat.modelName) {
            await this.reply(m.chat, 'Please set the model name for Cohere API using setmodel.', m);
            return;
          }
          generatedText = await textGenerationApi.generateTextFromCohere(this.autochat.modelName, messages);
        } else {
          await this.reply(m.chat, 'Please set the type using settype.', m);
          return;
        }

        await this.reply(m.chat, generatedText, m);
      } else if (text.startsWith('reset')) {
        delete this.autochat;
        await this.reply(m.chat, `*Autochat reset*`, m);
      } else if (text.startsWith('off')) {
        this.autochat.status = false;
        await this.reply(m.chat, `*Autochat OFF*`, m);
      }
    } catch {
      await this.reply(m.chat, 'Error occurred.', m);
    }
  }
}

const replicateModel = [
  'replicate/llama7b-v2-chat:058333670f2a6e88cf1b29b8183405b17bb997767282f790b82137df8c090c1f',
  'replicate/llama13b-v2-chat:d5da4236b006f967ceb7da037be9cfc3924b20d21fed88e1e94f19d56e2d3111',
  'replicate/llama70b-v2-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1'
];

const cohereModel = [
  'command-light-nightly',
  'command-nightly'
];