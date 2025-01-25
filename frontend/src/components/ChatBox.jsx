import { useEffect } from 'react'

import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatBox = () => {
    const {message,getMessage,isMessagesLoading,selectUser}=useChatStore()

    useEffect(() => {
        getMessage(selectUser._id)
    }, [selectUser._id,getMessage]);

    if(isMessagesLoading)return <div>Loading......</div>
  return (
   <div className='flex flex-1 flex-col h-full mt-0 justify-between'>
   <ChatHeader/>
   <p>Message.......</p>
   <MessageInput/>
   </div>
  )
}

export default ChatBox