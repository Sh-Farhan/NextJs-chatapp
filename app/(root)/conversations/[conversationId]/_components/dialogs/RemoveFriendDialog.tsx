

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId: Id<"conversations">;
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveFriendDialog = ({conversationId, open, setOpen}: Props) => {
  const {mutate: removeFriend, pending} = useMutationState(api.friend.remove);
  const handleRemoveFriend = async() => {
    removeFriend({conversationId})
    .then(() => toast.success("Removed friend"))
    .catch((error) => {
        toast.error(
            error instanceof ConvexError ? 
            error.data 
            :
            "Unexpected error occured"
        )
    })
  }
  return (
    <div>RemoveFriendDialog</div>
  )
}

export default RemoveFriendDialog