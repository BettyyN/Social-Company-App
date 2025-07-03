"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode, useState } from "react";

interface ProviderProps{
    children: ReactNode;
}

const provider: FC<ProviderProps> = ({children}) => {
  const [queryClient] = useState(() => new QueryClient());
  return <SessionProvider> <QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider></SessionProvider>
};

export default provider;
