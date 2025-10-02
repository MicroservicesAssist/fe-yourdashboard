"use client";
import React, { useState } from "react";
import { Input } from "antd";
import AudioBlue from "../../assets/audioBlue.svg";
import AgregarBlue from "../../assets/agregarBlue.svg";
import OptionsChatWindow from "./OptionsChatWindow";

interface InputChatWindowProps {
  onSendMessage: (message: string) => void;
}

const InputChatWindow: React.FC<InputChatWindowProps> = ({ onSendMessage }) => {
    const [isOptionsChatOpen, setIsOptionsChatOpen] = useState(false);


  const [text, setText] = useState("");
  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };
  return (
    <div
      className="relative pr-12 pl-10 pt-6
      bg-white flex items-center space-x-2
        border-l border-[#1D2EB6]"
      style={{ fontFamily: "Montserrat" }}
    >
      <div
        className="flex gap-3 items-center justify-center 
        w-[666px] h-[42px] rounded-[8px] px-2.5 py-3 
        flex-1 border border-[#6E95FF]"
      >
        <AgregarBlue 
        className="w-[24px] h-[24px] cursor-pointer" 
        onClick={() => setIsOptionsChatOpen(true)}
        />
        <Input
          style={{
            border: "none",
            boxShadow: "none",
            outline: "none",
          }}
          placeholder="Escribe un mensaje..."
          className="w-[500px] h-[20px]
            text-sm text-[#000000] 
            placeholder:text-[#647487] placeholder:text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleSend}
        />
        <AudioBlue className="w-[24px] h-[24px]" />
      </div>

      {isOptionsChatOpen && (
  <div
    className="fixed inset-0 bg-opacity-25 z-50 flex"
    onClick={() => setIsOptionsChatOpen(false)} 
  >
    <div
      className="ml-auto"
      style={{
        left: "calc(50% + -210px)", 
        top: "600px",
        position: "absolute",
      }}
      onClick={(e) => e.stopPropagation()} 
    >
      <OptionsChatWindow
        onClose={() => setIsOptionsChatOpen(false)}
      />
    </div>
  </div>
)}

    </div>
  );
};
export default InputChatWindow;
