"use client"

import { nanoid } from 'nanoid'
import {ReactNode, createContext, useState} from 'react'
import { Message } from '../lib/validators/message'

const defaultValue = [
    {
      id: nanoid(),
      content: 'Hello, how can I help you?',
      isUserMessage: false,
    },
  ]

export const MessageContext = createContext<{
    // types
    messages: Message[],
    addMessage: (message: Message) => void,
    isLoading: boolean,
    setIsLoading: (status: boolean) => void
}>({
    // default values
    messages: [],
    addMessage: () => {},
    isLoading: false,
    setIsLoading: () => {}
})

export function MessageProvider({children}: {children: ReactNode}) {
    const [messages, setMessages] = useState(defaultValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loadingUpdate = (status:boolean) => {
        setIsLoading(status)
    }

    function addMessage(messageToAdd: Message) {
        setMessages(prev => [...prev, messageToAdd])
    }

    return (
    <MessageContext.Provider value={{messages, addMessage, isLoading, setIsLoading: loadingUpdate}}>
         {children} 
    </MessageContext.Provider>
    )
}