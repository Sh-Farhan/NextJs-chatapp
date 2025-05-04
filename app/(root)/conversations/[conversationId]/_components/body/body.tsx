"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useConversation } from '@/hooks/useConversation'
import { useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import Message from './Message'
import { useMutationState } from '@/hooks/useMutationState'
import { format } from 'path'

type Props = {
  members: {
    lastSeenMessageId?: Id<"messages">,
    username?: string;
    [key: string]: any;
  }[]
}

const body = ({members}: Props) => {
  const {conversationId} = useConversation();

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  }); 

  const {mutate: markRead} = useMutationState(api.conversation.markRead)

  useEffect(() => {
    if(messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0].message._id
      })
    }
  }, [messages?.length, conversationId, markRead]);

  const getSeenMessage = (messageId: Id<"messages">) => {
    const seenUsers = members.filter(member => member.lastSeenMessageId === messageId)
    .map(user => user.username!.split(" ")[0]);

    if(seenUsers.length === 0) return undefined;

    return formatSeenBy(seenUsers);
  }

  return (
    <div className='flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar'>
      {messages?.map(({message, senderImage, senderName, isCurrentUser}, index) => {
        const lastByUser = messages[index-1]?.message.senderId === messages[index].message.senderId;

        const seenMessage = isCurrentUser ? getSeenMessage(message._id) : undefined;

        return <Message key={message._id}
        fromCurrentUser={isCurrentUser}
        senderImage={senderImage}
        senderName={senderName}
        lastByUser={lastByUser}
        content={message.content}
        createdAt={message._creationTime}
        type={message.type}/>
      })}
    </div>
  )
}

export default body