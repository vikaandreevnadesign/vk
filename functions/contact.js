export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    const message = `📩 <b>Новая заявка с сайта VK Studio!</b>\n\n👤 <b>Имя:</b> ${data.name}\n📱 <b>Контакт:</b> ${data.contact}\n💼 <b>Услуга:</b> ${data.service}\n💬 <b>Сообщение:</b> ${data.message || 'Нет'}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot8629887371:AAE1twwWOZHJMBqAWMze_HNoLEC8ftaEZtI/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '7023627812',
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error('Failed to send to Telegram');
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Заявка отправлена!'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  
  return new Response('Method not allowed', { status: 405 });
}
