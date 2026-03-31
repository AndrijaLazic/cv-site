import {
  fetchServerSentEvents,
  useChat,
  createChatClientOptions,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

const defaultChatOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/resume-chat'),
})

export type ResumeChatMessages = InferChatMessages<typeof defaultChatOptions>

export const useResumeChat = () => {
  const chatOptions = createChatClientOptions({
    connection: fetchServerSentEvents('/api/resume-chat'),
  })

  return useChat(chatOptions)
}
