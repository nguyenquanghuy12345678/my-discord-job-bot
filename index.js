import { Client, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';
import config from './config.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

client.once('ready', () => {
    console.log(`🤖 Bot đã đăng nhập với tên ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!job')) {
        const prompt = "Gợi ý cho tôi 5 nghề nghiệp phù hợp với xu thế tương lai, giải thích ngắn.";
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        message.reply(completion.choices[0].message.content);
    }

    if (message.content.startsWith('!cv')) {
        const prompt = "Hãy cho tôi 5 tips để viết CV thu hút nhà tuyển dụng.";
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        message.reply(completion.choices[0].message.content);
    }

    if (message.content.startsWith('!interview')) {
        const prompt = "Giả sử bạn là nhà tuyển dụng, hãy đặt cho tôi 5 câu hỏi phỏng vấn xin việc ngành CNTT.";
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        message.reply(completion.choices[0].message.content);
    }
});

client.login(config.discordToken);
