"use client";

import React, { useState, useRef } from "react";
import { List, Avatar } from "antd";
import DropDownBlue from "../../assets/dropdownBlue.svg";
import DropUpBlue from "../../assets/dropupBlue.svg";
import OptionsMessage from "./OptionsMessage";

interface ChatItem {
  conversation_id: string;
  name: string;
  last_message: string;
  time: string;
}

interface Props {
  chats: ChatItem[];
  onSelectChat: (id: string) => void;
  selectedChat: string | null;
}

const MyChatsMessage: React.FC<Props> = ({ chats, onSelectChat, selectedChat }) => {
  const [optionsOpenFor, setOptionsOpenFor] = useState<string | null>(null);
  const [optionsPosition, setOptionsPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const buttonRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const handleOptionsClick = (id: string) => {
    const btn = buttonRefs.current[id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setOptionsPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      setOptionsOpenFor(optionsOpenFor === id ? null : id);
    }
  };

  return (
    <div className="overflow-y-auto pl-5">
      <List
        style={{ fontFamily: "Montserrat", marginTop: "16px", paddingRight: "5px" }}
        dataSource={chats}
        renderItem={(item) => {
          const isSelected = selectedChat === item.conversation_id;
          const isOpen = optionsOpenFor === item.conversation_id;

          return (
            <div key={item.conversation_id} className="relative">
              <List.Item
                className={`cursor-pointer hover:bg-[#EBF4FF] 
                    hover:rounded-[10px] !pr-2.5 !pl-2.5 
                    mt-2.5 mb-2.5 !border-none ${isSelected ? "bg-[#EBF4FF] rounded-[10px]" : ""}`}
                onClick={() => onSelectChat(item.conversation_id)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#1D2EB6",
                        color: "#FFFFFF",
                        width: 35,
                        height: 35,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                        padding: 10,
                      }}
                    >
                      {item.name[0]}
                    </Avatar>
                  }
                  title={
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1D2EB6] text-xs">{item.name}</span>
                      <span className="text-[10px] text-[#797979]">{item.time}</span>
                    </div>
                  }
                  description={
                    <div className="flex justify-between items-center pr-1.5">
                      <span className="text-[10px] text-[#000000] text-sm">{item.last_message}</span>
                      <span
                        className="cursor-pointer"
                        ref={(el) => { buttonRefs.current[item.conversation_id] = el; }}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          handleOptionsClick(item.conversation_id);
                        }}
                      >
                        {isOpen ? <DropUpBlue className="w-2.5 h-2.5" /> : <DropDownBlue className="w-2.5 h-2.5" />}
                      </span>
                    </div>
                  }
                />
              </List.Item>

              {isOpen && (
                <div
                  className="fixed inset-0 bg-transparent z-50"
                  onClick={() => setOptionsOpenFor(null)}
                >
                  <div
                    className="absolute"
                    style={{ top: optionsPosition.top, left: optionsPosition.left }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <OptionsMessage onClose={() => setOptionsOpenFor(null)} />
                  </div>
                </div>
              )}

              <div className="h-[0.5px] bg-[#C5C5C5] w-full"></div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyChatsMessage;
