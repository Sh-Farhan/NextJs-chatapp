// "use client"

// import ConversationContainer from '@/components/shared/conversation/ConversationContaniner'
// import { api } from '@/convex/_generated/api'
// import { Id } from '@/convex/_generated/dataModel'
// import { useQuery } from 'convex/react'
// import { Loader2 } from 'lucide-react'
// import React, { use, useEffect, useState } from 'react'
// import Header from './_components/Header'
// import Body from './_components/body/body'
// import ChatInput from './_components/input/ChatInput'

// type Props = {
//   params: {
//     conversationId: Id<"conversations">;
//   };
// }

// // type Props = {
// //   params: {
// //     id: Id<"conversations">;
// //   };
// // }

// const ConversationPage = ({ params} : Props) => {
//   // console.log("redering conversation page")
//   const [projectId, setProjectId] = useState("");
  
//   useEffect(() => {
//     const getId = async () => {
//       const paramId = await params.conversationId;
//       setProjectId(paramId);
//     }
//   }, [params]);
  
//   const conversation = useQuery(api.conversation.get, {id: projectId});

//   return(
//     conversation === undefined ?
//     <div className='w-full h-full flex items-center justify-center'><Loader2/></div> :
//     conversation === null ?
//     <p className='w-full h-full flex items-center justify-center'>Conversation not found</p>:
//     <ConversationContainer>
//       <Header 
//       name={(conversation.isGroup ? conversation.name : conversation.otherMember.username) || ""}
//       imageUrl={conversation.isGroup ? undefined : conversation.otherMember.imageUrl}/>
//       <Body/>
//       <ChatInput/>
//     </ConversationContainer>
//   )
// }

// export default ConversationPage

"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContaniner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { use, useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/body";
import ChatInput from "./_components/input/ChatInput";

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
};

const ConversationPage = ({ params }: Props) => {
  // 🌟 Unwrap the params with React.use() 
  const { conversationId } = use(params);

  // ✅ Fetch conversation data
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);


  // ✅ Handle loading, errors, and success states
  if (conversation === undefined)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 />
      </div>
    );

  if (conversation === null)
    return (
      <p className="w-full h-full flex items-center justify-center">
        Conversation not found
      </p>
    );

  return (
    <ConversationContainer>
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember.username) || ""
        }
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember.imageUrl}
        options={conversation.isGroup ? [] : []}
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;

