import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog/>}>
        Friends page
      </ItemList> 
      <ConversationFallback/>
    </>
  )
}

export default FriendsPage