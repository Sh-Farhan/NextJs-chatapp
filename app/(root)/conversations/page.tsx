import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import React from 'react'

type Props = {}

const ConversationsPage = (props: Props) => {
  console.log("conversation page...")
  return (  
    <ConversationFallback/>
  )
}

export default ConversationsPage