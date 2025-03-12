import ConversationContainer from '@/components/shared/conversation/ConversationContaniner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
}

const ConversationPage = ({params: {conversationId}}: Props) => {
  // console.log("redering conversation page")
  const conversation = useQuery(api.conversation.get, {id: conversationId});
  return (
    <ConversationContainer>
      ConversationPage
    </ConversationContainer>
  )
}

export default ConversationPage