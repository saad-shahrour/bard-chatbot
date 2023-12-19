"use client"

import { FunctionComponent, HTMLAttributes, useContext, useRef } from "react";
import { MessageContext} from "../context/message";
import { cn } from "../lib/utils";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement>{
    
}
 /// To pass all div properties to this component when called
const ChatMessages: FunctionComponent<ChatMessagesProps> = ({className, ...props}) => {

    const {messages} = useContext(MessageContext)
    const reversedMessages = [...messages].reverse()

    return ( 
        <div {...props}
        className={cn('flex gap-3 flex-col-reverse overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch', className)}>
            {/* <div className="flex-1 flex-grow"/> */}
                {reversedMessages.map(message => (
                    <div key={message.id} className={cn('flex items-end', {'justify-end': message.isUserMessage})}>
                        <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                                'order-1 items-end ml-8': message.isUserMessage,
                                'order-2 items-start mr-8': !message.isUserMessage,})}>
                                    <p className={cn('px-4 py-2 rounded-lg max-w-full', {
                                        'bg-blue-600 text-white': message.isUserMessage,
                                        'bg-gray-200 text-gray-900': !message.isUserMessage, })}>
                                    {/* <MarkdownLite text={message.content} /> */}
                                        {message.content}
                                    </p>
                        </div>
                    </div>
                ))}
        </div>
     );
}
 
export default ChatMessages;