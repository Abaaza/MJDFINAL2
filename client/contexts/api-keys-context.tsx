"use client"

import React, { createContext, useContext, useState } from "react"

interface ApiKeyContextType {
  openaiKey: string
  cohereKey: string
  geminiKey: string
  setKeys: (keys: Partial<{openaiKey:string;cohereKey:string;geminiKey:string}>) => void
  saveKeys: () => void
}

const ApiKeyContext = createContext<ApiKeyContextType>({
  openaiKey: process.env.NEXT_PUBLIC_OPENAI_KEY ?? "",
  cohereKey: process.env.NEXT_PUBLIC_COHERE_KEY ?? "",
  geminiKey: process.env.NEXT_PUBLIC_GEMINI_KEY ?? "",
  setKeys: () => {},
  saveKeys: () => {}
})

export function ApiKeyProvider({children}:{children:React.ReactNode}){
  const [openaiKey,setOpenai] = useState(process.env.NEXT_PUBLIC_OPENAI_KEY ?? "")
  const [cohereKey,setCohere] = useState(process.env.NEXT_PUBLIC_COHERE_KEY ?? "")
  const [geminiKey,setGemini] = useState(process.env.NEXT_PUBLIC_GEMINI_KEY ?? "")

  const setKeys = (keys: Partial<{openaiKey:string;cohereKey:string;geminiKey:string}>) => {
    if(keys.openaiKey!==undefined) setOpenai(keys.openaiKey)
    if(keys.cohereKey!==undefined) setCohere(keys.cohereKey)
    if(keys.geminiKey!==undefined) setGemini(keys.geminiKey)
  }

  const saveKeys = () => {
    // Keys are provided via environment variables in production
  }

  return (
    <ApiKeyContext.Provider value={{openaiKey,cohereKey,geminiKey,setKeys,saveKeys}}>
      {children}
    </ApiKeyContext.Provider>
  )
}

export const useApiKeys = () => useContext(ApiKeyContext)

