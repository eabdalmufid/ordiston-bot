import fetch from 'node-fetch';

export const sendWebhookRequest = async (value) => {
  const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const currentTime = new Date();
  const webhookUrl = 'https://webhook.botika.online/webhook/';
  const payload = {
    app: {
      id: "blaael9y3cu1684390361270",
      time: currentTime,
      data: {
        sender: {
          id: randomId
        },
        message: [
          {
            id: randomId,
            time: currentTime,
            type: "text",
            value: value,
          }
        ]
      }
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8'
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const webhookResponse = await response.json();

    if (webhookResponse) {
      const messages = webhookResponse.app.data.message;

      if (Array.isArray(messages)) {
        const responseMessages = messages.map((message) => message.value);
        const combinedResponse = responseMessages.join('\n\n').replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
        return combinedResponse;
      }
    } else {
      console.error('Webhook error:', webhookResponse.error);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};