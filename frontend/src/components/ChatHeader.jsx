import React from "react";
import { useChatStore } from "../store/useChatStore";
import {X} from "lucide-react"

const ChatHeader = () => {
  const { selectUser, setSelectUser } = useChatStore();
  return (
    <div className="w-full border-b">
      <div className="flex justify-between ">
        <div>
          <img
            src={selectUser.profileImg || "avatar.webp"}
            alt="error"
            className="size-10 rounded-full"
          />
          <span>{selectUser.username}</span>
        </div>
        <div>
          <button onClick={()=>setSelectUser(null)}><X/></button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
