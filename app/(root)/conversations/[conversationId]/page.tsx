import ConversationContainer from '@/components/shared/conversation/ConversationContaniner'
import React from 'react'

type Props = {}

const ConversationPage = (props: Props) => {
  console.log("redering conversation page")
  return (
    <ConversationContainer>
      ConversationPage
    </ConversationContainer>
  )
}

export default ConversationPage