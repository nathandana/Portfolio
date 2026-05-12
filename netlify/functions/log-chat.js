// netlify/functions/log-chat.js
exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
  
    const { user, bot, page, timestamp } = body;
  
    console.log(`[ChatLog] [${timestamp}] Page: ${page}\nUser: ${user}\nBot: ${bot}\n`);
  
    // You can later store in a DB or external service here
  
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  };