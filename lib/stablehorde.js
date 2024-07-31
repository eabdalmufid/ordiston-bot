export class StableHorde {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.pendingTextGenerationIds = [];
    this.pendingImageGenerationIds = [];
    this.startTime = 0; // Initialize the start time to 0
  }

  async imageModels() {
    const full_url = 'https://stablehorde.net/api/v2/status/models';
    try {
      const response = await fetch(full_url);
      return await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async textModels() {
    try {
      const response = [
        "koboldcpp/MythoMax-L2-13b",
        "aphrodite/Undi95/Emerhyst-20B",
        "aphrodite/Undi95/MXLewd-L2-20B",
        "aphrodite/Undi95/PsyMedRP-v1-20B",
        "koboldcpp/Emerhyst-20B.q6_k",
      ];
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async generateText(prompt, model) {
    const headers = {
      "Content-Type": "application/json",
      "apikey": this.apiKey,
    };

    const response = await fetch(
      "https://stablehorde.net/api/v2/generate/text/async",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          prompt,
          params: {
            max_context_length: 2048,
            max_length: 512,
            singleline: false,
            temperature: 0.7,
            top_p: 0.2,
            top_k: 85,
            top_a: 0,
            typical: 1,
            tfs: 1,
            rep_pen: 1.1,
            rep_pen_range: 1024,
            rep_pen_slope: 0.7,
            sampler_order: [6, 0, 1, 3, 4, 2, 5],
          },
          models: [model],
        }),
      }
    ).catch((error) => {
      console.log(error);
    });

    if (response.status == 401) {
      console.log(response);
      return null;
    }

    const { id } = await response.json();

    this.pendingTextGenerationIds.push(id); // Store the ID for checking
    this.startTime = Date.now(); // Update the start time

    const timeout = 120000; // 2 minutes (in milliseconds)

    while (this.pendingTextGenerationIds.length > 0) {
      const currentTime = Date.now();
      if (currentTime - this.startTime > timeout) {
        console.log("Text generation timeout.");
        break;
      }

      const idToCheck = this.pendingTextGenerationIds[0];
      const checkResponse = await fetch(
        `https://stablehorde.net/api/v2/generate/text/status/${idToCheck}`,
        {
          headers,
        }
      );
      const checkData = await checkResponse.json();
      console.log(checkData);

      if (checkData.finished) {
        this.pendingTextGenerationIds.shift(); // Remove the processed ID
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const statusResponse = await fetch(
      `https://stablehorde.net/api/v2/generate/text/status/${id}`,
      {
        headers,
      }
    );
    const statusData = await statusResponse.json();
    const finalText = statusData.generations[0].text;
    console.log(statusResponse);

    return finalText;
  }

  async generateImage(model, prompt) {
    const headers = {
      apikey: this.apiKey,
      "Content-Type": "application/json",
    };

    const postData = {
      prompt: prompt,
      params: {
        sampler_name: "k_lms",
        height: 512,
        width: 512,
        karras: true,
        tiling: false,
        hires_fix: false,
        clip_skip: 2,
        image_is_control: false,
        return_control_map: false,
        steps: 30,
        n: 1,
      },
      nsfw: true,
      trusted_workers: false,
      slow_workers: true,
      censor_nsfw: false,
      models: [model],
      r2: true,
      shared: true,
    };

    const response = await fetch('https://stablehorde.net/api/v2/generate/async', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    const id = responseData.id;
    console.log(`Img job id: ${id}`);

    this.pendingImageGenerationIds.push(id); // Store the ID for checking
    this.startTime = Date.now(); // Update the start time

    const timeout = 120000; // 2 minutes (in milliseconds)

    while (this.pendingImageGenerationIds.length > 0) {
      const currentTime = Date.now();
      if (currentTime - this.startTime > timeout) {
        console.log("Image generation timeout.");
        break;
      }

      const idToCheck = this.pendingImageGenerationIds[0];
      const pollResponse = await fetch(`https://stablehorde.net/api/v2/generate/check/${idToCheck}`);
      const pollData = await pollResponse.json();
      const done = pollData.done;
      console.log(`Polling img job: ${done}`);

      if (done) {
        this.pendingImageGenerationIds.shift(); // Remove the processed ID
        const imageResponse = await fetch(`https://stablehorde.net/api/v2/generate/status/${idToCheck}`);
        const imageResponseData = await imageResponse.json();
        const imageUrl = imageResponseData.generations[0].img;
        console.log(`Received img URL: ${imageUrl}`);
        return imageUrl;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
}