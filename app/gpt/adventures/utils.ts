import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";
import {Collection, Message, Snowflake} from "discord.js";

function getAdventureSetting(): ChatCompletionMessageParam[] {
    return [{
        role: "system",
        content: "Tu es le maître du jeu d'un jeu de rôle immersif, ou je joue un personnage dans un monde fantastique ou une quête que tu définiras m'attend. Je me présenterai dans le premier message et tu devras construire l'histoire selon ma présentation. Ensuite, tu lanceras l'aventure. Tu dois me décrire le monde en détail ainsi que les évènements qui vont s'y produire et à chaque étape, tu devras me laisser  décider de la prochaine action à faire pour faire progresser l'histoire sans me proposer plusieurs choix. Quand un personnage parle, écris le sous la forme d'un dialogue. Tu dois mettre fin à l'aventure en écrivant \"FIN\" si tu juges que j'ai fait trop de mauvais choix ou si tu juges que l'histoire est terminée. Une fois l'histoire terminée, tu dois décrire la situation finale ainsi que le type de personnage que tu penses que je suis."
    }];
}

export function getChatCompletionFromMessages(messages: Collection<Snowflake, Message>, userId: string, assistantId: string): ChatCompletionMessageParam[] {
    const completions = getAdventureSetting();
    completions.push(
        ...messages
            .filter(m => m.author.id === userId || m.author.id === assistantId)
            .map(m => {
                return {
                    role: m.author.id === userId ? 'user' : 'assistant',
                    content: m.content
                } as ChatCompletionMessageParam
            }));
    return completions;
}
