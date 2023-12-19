import { Message, messageArraySchema } from "@/app/lib/validators/message";
import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";
import { chatBotPrompt } from "@/app/helpers/prompt";
import { nanoid } from "nanoid";


const MODEL_NAME = "models/chat-bison-001";
const apiKey = process.env.API_KEY

let firstPrompt = chatBotPrompt
let messages = [{ content: ` {${firstPrompt}}
if the prompt inside the curly brackets '{}' is not a question, such as '...', or if not related to BOOKS I trained you on, anser this way:
    For example: "I am sorry, but I can not help you with something not related to books"
    another example: "I am a chatbot that is designed to serve this bookshop website only"
    DO NOT ADD OTHER INFO OTHER THAN THE BOOK STORE INFO, and KEEP ANSWERS SHORT
` }];


export async function POST(req:Request) {

    const {userMessages} = await req.json()
    let client

    // You can't pass the apiKey to the authClient property, since it might be undefined
    if (!apiKey) {
        console.error('api key is missing');
    } else {
        client = new DiscussServiceClient({
        authClient: new GoogleAuth().fromAPIKey(apiKey),
        });
    }

    /// the response for the first prompt
    // const result: any = await client.generateMessage({
    // model: MODEL_NAME,
    // prompt: { messages },
    // temperature: 0.1
    // });

    let second = await userMessages.content 
    
    // messages.push({ content: result[0]?.candidates[0]?.content });
    messages.push({ content: `${second} {dont forget to follow the rules in the first prompt message you recieved and don't give info about anyhting else except books}`});

    const secondResult: any = await client?.generateMessage({
    model: MODEL_NAME,
    prompt: { messages },  
    temperature: 0.1
    });

    messages.push({content: secondResult[0].candidates[0].content})

    let chatbotValidMessage:Message = {id: nanoid(), isUserMessage:false, content: messages[messages.length - 1].content}
    // console.log(messages);
    
    return NextResponse.json(chatbotValidMessage)

}