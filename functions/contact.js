export async function onRequestPost(context) {
  const data = await context.request.json();
  
  const message = `📩 <b>Новая заявка с сайта!</b>\n\n👤 <b>Имя:</b> ${data.name}\n📱 <b>Контакт:</b> ${data.contact}\n💼 <b>Услуга:</b> ${data.service}\n💬 <b>Сообщение:</b> ${data.message || 'Нет'}`;

  try {
    await fetch(`https://api.telegram.org/bot8629887371:AAE1twwWOZHJMBqAWMze_HNoLEC8ftaEZtI/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '7023627812',
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
