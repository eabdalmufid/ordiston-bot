import axios from 'axios';

export const defaultParams = {
  "model": "auto",
  "steps": 30,
  "cfg": 6,
  "sampler": "Euler a",
  "negative_prompt": "(bad_prompt:0.8), multiple persons, multiple views, extra hands, ugly, lowres, bad quality, blurry, disfigured, extra limbs, missing limbs, deep fried, cheap art, missing fingers, out of frame, cropped, bad art, face hidden, text, speech bubble, stretched, bad hands, error, extra digit, fewer digits, worst quality, low quality, normal quality, mutated, mutation, deformed, severed, dismembered, corpse, pubic, poorly drawn, (((deformed hands))), (((more than two hands))), (((deformed body))), ((((mutant))))', ",
  "quantity": 1
};

export const app_base = `https://app.prodia.com`;
export const api_base = `http://api.prodia.com`;
export const cloud_base = `https://images.prodia.xyz`;
export const host_base = `api.prodia.com`;

export const wait = async (ms) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

export const sliceQuotes = (str) => {
  if (str.charAt(0) === "'" && str.charAt(str.length - 1) === "'") {
    return str.slice(1, -1);
  }
  return str;
};

export const generateReq = async ({ prompt, model, negative_prompt = defaultParams.negative_prompt, steps = defaultParams.steps, cfg = defaultParams.cfg, seed = (Math.floor(Math.random() * 1000000)), sampler = defaultParams.sampler } = {}) => {
  const params = {
    prompt: prompt,
    model: model,
    negative_prompt: negative_prompt,
    steps: steps,
    cfg: cfg,
    seed: seed,
    sampler: sampler,
    aspect_ratio: "square"
  };
  let request = await axios.get(`${api_base}/generate`, {
    params: params,
    headers: {
      Referer: `${app_base}`,
      Host: `${host_base}`
    },
    timeout: 300000
  },
    params);
  return request.data;
};

export const jobReq = async (job) => {
  return (await axios.get(`${api_base}/job/${job}`)).data;
};

export const imageReq = async (job) => {
  return await axios.get(`${cloud_base}/${job}.png?download=1`, { responseType: 'arraybuffer' });
};

export const req = {
  generate: generateReq,
  job: jobReq,
  image: imageReq
};

export const getModels = async (select) => {
  const response = await axios.get(`${app_base}`);
  const regex = /<script defer="defer" src="(\/js\/app\.[a-f\d]+\.js)"><\/script>/;
  const match = response.data.match(regex);
  const jsPath = match[1];
  const jsResponse = await axios.get(`${app_base}${jsPath}`);
  const modelsMatch = jsResponse.data.match(/VUE_APP_AI_MODELS:'(.*?)',VUE_APP_STATS_STREAMS/);
  const modelsString = modelsMatch[1].replaceAll("\\", "");
  const models = JSON.parse(modelsString);
  return models;
};

export const draw = async (options) => {
  const {
    modelIds,
    model,
    quantity = 1,
    comp
  } = options;
  if (!model || model == 'auto') {
    options.model = modelIds.find(modelId => modelId.startsWith('anything-v4.5'));
  }
  const images = [];
  const length = comp ? quantity * modelIds.length : quantity;

  const promises = Array.from({ length: length }, async (_, i) => {
    comp ? options.model = modelIds[i % modelIds.length] : comp;
    //Если comp = true то перебираются все модели
    const jobInfo = await req.generate(options);
    const { job } = jobInfo;
    var statusCheck = 20;
    //Таймаут 
    var status;
    do {
      await wait(3000);
      //Ожидание 3 секунд перед повторной проверкой статуса 
      const statusInfo = await req.job(job);
      ({ status } = statusInfo);
      statusCheck--;
    } while (status !== "succeeded" && statusCheck > 0)
    if (status !== "succeeded") {
      return "Status check timeout";
    }
    const imageData = await req.image(job);
    const { data } = imageData;
    var image = {};
    image.buffer = Buffer.from(data, 'binary');
    image = { ...image, ...jobInfo };
    image.params.model = image.params.options.sd_model_checkpoint;
    delete image.params.options.sd_model_checkpoint;
    delete image.status;
    images.push(image);
  });

  await Promise.all(promises);
  return images;
};

export const generate = async (params, models = '') => {
  !models ? models = await getModels() : models;
  const modelIds = Object.values(models);
  return await draw({
    modelIds,
    ...params
  });
};