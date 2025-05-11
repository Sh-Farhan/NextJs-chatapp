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
import Body from "./_components/body/body"

import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import { remove } from "@/convex/friend";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

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
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);


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
      <RemoveFriendDialog
       conversationId={conversationId} 
       open={removeFriendDialogOpen}
       setOpen={setRemoveFriendDialogOpen}
       />
      <LeaveGroupDialog
       conversationId={conversationId} 
       open={leaveGroupDialogOpen}
       setOpen={setLeaveGroupDialogOpen}
       />
      <DeleteGroupDialog
       conversationId={conversationId} 
       open={deleteGroupDialogOpen}
       setOpen={setDeleteGroupDialogOpen}
       />
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        imageUrl={conversation.isGroup ? undefined : conversation.otherMember?.imageUrl}
        options={conversation.isGroup ? [
          {
            label: "Leave Group",
            destructive: false,
            onClick: () => setLeaveGroupDialogOpen(true),
          },
          {
            label: "Delete Group",
            destructive: true,
            onClick: () => setDeleteGroupDialogOpen(true),
          },
        ] : [
          {
            label: "Remove friend",
            destructive: true,
            onClick: () => setRemoveFriendDialogOpen(true),
          },
        ]
      }
      />
      <Body members={
        conversation.isGroup ?
        conversation.otherMembers ? conversation.otherMembers : []
        :
        conversation.otherMember ? [conversation.otherMember] : []
      }/>
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;

