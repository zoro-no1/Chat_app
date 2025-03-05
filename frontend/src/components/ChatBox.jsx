import { useEffect,useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { authStore } from "../store/authAxios";
import { formatMessageTime } from "../util/dateFunction";



const ChatBox = () => {
  const { message, getMessage, isMessagesLoading, selectUser,listenToMessage,unListenToMessage } = useChatStore();

  const { authUser } = authStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessage(selectUser._id);

    listenToMessage()
     
    return ()=>unListenToMessage()
  }, [selectUser._id, getMessage,listenToMessage,unListenToMessage,message ]);

  useEffect(()=>{
    if (messageEndRef.current && message) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  }},[message])

  if (isMessagesLoading) return <div>Loading......</div>;
  return (
    <div className="flex flex-1 flex-col h-full mt-0 justify-between">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-auto">
        {message.map((i) => (
          <div key={i._id}
            className={`chat ${
              i.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div>
              <div className=" bg-black rounded-md text-center border-2-black">
                {i.text}
              </div>
            
                <time>{formatMessageTime(i.createdAt)}</time>             
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
