export type ChatGptAgent = "user" | "system"

export interface ChatGptMessage {
    role: ChatGptAgent;
    content: string
}

export interface openAIStreamPayload {
    model: string,
    messages: ChatGptMessage[],
    temperature: number,
    top_p: number,
    frequency_penalty: number,
    precence_penalty:number,
    max_token: number,
    stream: boolean,
    n:number
}

export async function openAIStream(payload:openAIStreamPayload) {
    const encoder = 's' 
}