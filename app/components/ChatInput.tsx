"use client"

import { FunctionComponent, HTMLAttributes, useState, useContext, useRef } from "react";
import { cn } from "../lib/utils";
import ReactTextareaAutosize from "react-textarea-autosize";
import {useMutation} from "@tanstack/react-query"
import { nanoid } from "nanoid";
import { Message } from "../lib/validators/message";
import { MessageContext } from "../context/message";
import { ChevronRightSquare, CornerDownLeft, Loader2, SendHorizontal } from "lucide-react";

interface ChatIputProps extends HTMLAttributes<HTMLDivElement> {
    
}
 
const ChatIput: FunctionComponent<ChatIputProps> = ({className, ...props}) => {

    const {messages, addMessage, isLoading, setIsLoading} = useContext(MessageContext)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const [input, setInput] = useState<string>('')
    const {mutate: sendMessage, isPending} = useMutation({
        mutationFn:async (message: Message) => {
            setIsLoading(true)
            addMessage(message)
            setInput('')
            try {
                const res = await fetch('/api/message', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({userMessages: message })
                })
                const chatbotResponse = await res.json()
                const chatbotResponseMessage = await chatbotResponse
                addMessage(chatbotResponseMessage)
                setIsLoading(false)
                setTimeout(() => {
                    textAreaRef.current?.focus()
                }, 10)
                
            } catch (error) {
                addMessage({id: nanoid(), isUserMessage:false, content: 'Something went wrong, please try again later.'})
                console.log(error);
                setIsLoading(false)
                setInput(message.content)
                setTimeout(() => {
                    textAreaRef.current?.focus()
                }, 10)
            }    
        },
        // onMutate(message) {
        //     // we can add something here to be executed after the mutation function
        // },
        // onSuccess: () => {
        //     setTimeout(() => {
        //         textAreaRef.current?.focus()
        //     }, 10)
            
        // },
        // onError: () => {
        //     textAreaRef.current?.focus()
        // }
    })
    

    return ( 
        <div className={cn('border-t border-zinc-300', className)}>
            <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
                <ReactTextareaAutosize 
                ref={textAreaRef}
                rows={2}
                maxRows={4}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {                        
                        e.preventDefault()
                        const message: Message = {
                            id: nanoid(),
                            isUserMessage: true,
                            content: input
                        }
                        sendMessage(message)
                    }
                }}
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
                disabled={isLoading}
                placeholder="write a massege..."
                className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
                />

                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
                        {isLoading? (
                            <Loader2 className="w-3 h-3 animate-spin font-bold text-gray-600"/>
                        ) : (
                            <CornerDownLeft className="w-3 h-3 text-gray-600 font-bold hover:cursor-pointer" onClick={() => {
                                const message: Message = {
                                    id: nanoid(),
                                    isUserMessage: true,
                                    content: input
                                }
                                sendMessage(message)
                            }}/>
                        )} 
                    </kbd>
                </div>

                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"/>

            </div>
        </div>
     );
}
 
export default ChatIput;