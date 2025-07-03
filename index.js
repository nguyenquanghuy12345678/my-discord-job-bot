import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`🤖 Bot đã đăng nhập với tên ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    try {
        if (message.content.startsWith('!job')) {
            const response = await fetch('https://zenquotes.io/api/random');
            const data = await response.json();
            const quote = `${data[0].q} — *${data[0].a}*`;
            await message.reply(`💼 **Gợi ý nghề nghiệp / động lực:**\n> ${quote}`);
        }

        else if (message.content.startsWith('!cv')) {
            const response = await fetch('https://zenquotes.io/api/random');
            const data = await response.json();
            const quote = `${data[0].q} — *${data[0].a}*`;
            await message.reply(`📄 **Tips CV hay:**\n> ${quote}`);
        }

        else if (message.content.startsWith('!interview')) {
            const response = await fetch('https://zenquotes.io/api/random');
            const data = await response.json();
            const quote = `${data[0].q} — *${data[0].a}*`;
            await message.reply(`🎤 **Chuẩn bị phỏng vấn:**\n> ${quote}`);
        }
    } catch (err) {
        console.error("❌ Lỗi khi gọi API:", err);
        await message.reply("⚠️ Không lấy được quote lúc này, thử lại sau nhé!");
    }
});

client.login(process.env.DISCORD_TOKEN);
