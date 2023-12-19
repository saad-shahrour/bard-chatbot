// import { DiscussServiceClient } from "@google-ai/generativelanguage";
// import { GoogleAuth } from "google-auth-library";

// export default async function request() {

// const MODEL_NAME = "models/chat-bison-001";
// const API_KEY = 'AIzaSyACMI31I_JFBRqwVGJlUAfY3y6cuHBw6W8';


// const client = new DiscussServiceClient({
//   authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });

// let first = "Tell me a one fact about an animal"
// let messages = [{ content: first }];

// const result: any = await client.generateMessage({
//   model: MODEL_NAME,
//   prompt: { messages },
// });

// console.log("User:\n\n", first, "\n\n")
// console.log("Palm:\n\n", result[0].candidates[0].content, "\n\n");

// let second = "Oh, where do those live?"

// messages.push({ content: result[0].candidates[0].content });
// messages.push({ content: second });

// const secondResult: any = await client.generateMessage({
//   model: MODEL_NAME,
//   prompt: { messages },  
// });

// console.log("User:\n\n", second, "\n\n")
// console.log("Palm:\n\n", secondResult[0].candidates[0].content, "\n\n")
// }