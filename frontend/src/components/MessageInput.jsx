import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();
  const sendText = async(e) => {
    e.preventDefault();
    if(!text.trim())return
    try {
        await sendMessage({text:text.trim()})
        
        //clear input box
        setText("")
    } catch (error) {
        console.error("Failed to Send Message",error);
        
    }
  };
  return (
    <div className="p-4 w-full">
      <form onSubmit={sendText} className="flex gap-2 items-center">
        <div className="flex gap-2 flex-1">
          <input type="text" 
          className="w-full input input-sm sm:input-md input-bordered rounded-lg"
          placeholder="Message"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-circle btn-sm" disabled={!text.trim()}>
            <Send/>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
