import OpenAI from "openai";
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";

const openai = new OpenAI();

export async function fetchCompletion(messages: ChatCompletionMessageParam[]) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messages,
        n: 1
    });

    return response.choices.at(0).message.content;
}