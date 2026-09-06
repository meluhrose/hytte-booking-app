
import type { ReactNode } from "react";
import { ApiConfigContext } from "./ApiConfigContext";

interface ApiConfigProviderProps {
    children: ReactNode;
    baseUrl?: string;
}

export function ApiConfigProvider({ children, baseUrl = "https://my-mock-api.com/api" }: ApiConfigProviderProps) {
    const config = { baseUrl };

    return (
        <ApiConfigContext.Provider value={config}>
            {children}
        </ApiConfigContext.Provider>
    );
} 