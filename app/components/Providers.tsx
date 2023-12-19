'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FunctionComponent, ReactNode } from "react";
import { MessageProvider } from "../context/message";

interface ProvidersProps {
    children: ReactNode
}
 
const Providers: FunctionComponent<ProvidersProps> = ({children}) => {

    const queryClient = new QueryClient()

    return ( 
        <QueryClientProvider client={queryClient}>
            <MessageProvider>
                {children}
            </MessageProvider>
        </QueryClientProvider>
     );
}
 
export default Providers;