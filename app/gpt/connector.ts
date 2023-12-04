import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";

const openai = new OpenAI();


async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{role: "system", content: "You are a helpful assistant."}],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

export async function fetchMessages(messages: ChatCompletionMessageParam[]) {
    openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages
    })
}