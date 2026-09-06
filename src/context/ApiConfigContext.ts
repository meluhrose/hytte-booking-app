import { createContext, useContext } from "react";

interface ApiConfig {
    baseUrl: string;
}

export const ApiConfigContext = createContext<ApiConfig>({ baseUrl: "https://my-mock-api.com/api" });

export function useApiConfig() {
    return useContext(ApiConfigContext);
}