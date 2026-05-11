const OpenAI = require("openai");
const fs = require('bun:fs');

const systemprompt = fs.readFileSync('./systemprompt.md', 'utf8');

const client = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY,
    baseURL: process.env.OPENAIAPIURL
});

async function generate(prompt) {

    const response =
        await client.chat.completions.create({

        model: "deepseek-ai/deepseek-v4-pro",

        messages: [
            {
                role: "system",
                content: systemprompt
            },
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.7
    });

    return response.choices[0].message.content;
}

module.exports = {
    generate
};