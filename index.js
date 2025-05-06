
const { WAConnection, MessageType, Mimetype } = require('@whiskeysockets/baileys');
const conn = new WAConnection();

conn.on('open', () => {
    console.log('Conectado a WhatsApp!');
});

conn.connect();

// Respuesta automática a un mensaje
conn.on('chat-update', async (chat) => {
    if (!chat.hasNewMessage) return;
    const message = chat.messages.all()[0];
    if (message.key.fromMe) return;

    const text = message.message.conversation.toLowerCase();
    let response = 'No entendí tu mensaje 🤖. Puedes preguntar por precios, canales o soporte.';

    if (text.includes('hola') || text.includes('buenas')) {
        response = '¡Hola! Bienvenido a Mxpremiumtv 🙌';
    } else if (text.includes('precio')) {
        response = 'Nuestros precios son: $10 al mes, $25 por tres meses, $40 por seis meses.';
    } else if (text.includes('canales')) {
        response = 'Contamos con más de 200 canales en vivo de deportes, entretenimiento, cine y más.';
    } else if (text.includes('soporte')) {
        response = 'Puedes contactar a nuestro soporte enviando un mensaje a este mismo número.';
    }

    conn.sendMessage(message.key.remoteJid, response, MessageType.text);
});
