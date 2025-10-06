import React, { useState } from "react";
import { Avatar} from "antd";
import Buscador from "../../assets/buscador.svg";
import Options from "../../assets/optionsBlue.svg";
import SearchMessage from "./SearchMessage"; 
import OptionsPerfil from "./OptionsPerfil";
import InputChatWindow from "./InputChatWindow";

interface Message {
  message_id: string;
  from: "me" | "other";
  text: string;
  timestamp: string;
}

interface Props {
  selectedChatName: string;
  messages: Message[];
  onSendMessage: (msg: string) => void;
  onCloseChat: () => void;
}

const ChatWindow: React.FC<Props> = ({
  selectedChatName,
  messages,
  onSendMessage,
  onCloseChat,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); 

  

  return (
    <div
      className="flex flex-col flex-1 bg-[#fffffff] ml-1"
      style={{ fontFamily: "Montserrat" }}
    >
      {/* Header de la conversación */}
      <div
        className="flex items-center justify-between px-4 py-2
        border-b border-l border-[#1D2EB6]
        h-[68px] p-[22px] bg-white"
      >
        <div className="flex items-center space-x-2  gap-3">
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
            {selectedChatName[0]}
          </Avatar>
          <h3 className="font-semibold text-[#1D2EB6] text-[18px]">
            {selectedChatName}
          </h3>
        </div>
        <div className="flex relative mt-3 gap-3">
          {/* 🔍 Al hacer clic abre SearchMessage */}
          <Buscador
            className="w-[24px] h-[24px] text-[#1D2EB6] cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          />
          <Options
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setIsOptionsOpen(true)}
          />
        </div>
      </div>

      {/* Si está abierto, mostramos SearchMessage como overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0  bg-opacity-25 z-50 flex"
          style={{
            left: "calc(50% + 435px)",
            top: "91.5px",
          }}
        >
          <SearchMessage
            onClose={() => setIsSearchOpen(false)}
            onResults={(results) => console.log("Resultados:", results)}
            onError={() => console.error("Error en búsqueda")}
          />
        </div>
      )}

      {isOptionsOpen && (
        <div
          className="fixed inset-0 bg-opacity-25 z-50 flex"
          onClick={() => setIsOptionsOpen(false)}
        >
          <div
            className="ml-auto"
            style={{
              left: "calc(50% + 470px)",
              top: "150px",
              position: "absolute",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OptionsPerfil onClose={() => setIsOptionsOpen(false)} onCloseChat={onCloseChat} />
          </div>
        </div>
      )}

      {/* Mensajes */}
      <div className="p-4 border-l border-[#1D2EB6] max-h-[450px] overflow-y-auto custom-scrollbar mr-2 py-2 ">
        <div
          className="flex-1 p-4 space-y-3 
        bg-[url('/BACKGROUND_1.png')] bg-center 
        bg-repeat "
          style={{ fontFamily: "Montserrat" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`flex items-start ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from !== "me" && (
                <Avatar
                  style={{
                    backgroundColor: "#1D2EB6",
                    color: "#FFFFFF",
                    width: 35,
                    height: 35,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                    padding: 10,
                    marginRight: 8,
                  }}
                >
                  {selectedChatName[0]}
                </Avatar>
              )}

              <div className="flex flex-col items-end">
                <div
                  className={`relative w-[277px] min-h-[48px] px-2.5 py-2.5 gap-2.5
                    focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-100
                    ${
                      msg.from === "me"
                        ? "bg-[#DBEAFF] text-[#000000] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px]"
                        : "bg-[#BED8FF] text-[#000000] rounded-bl-[10px] rounded-br-[10px] rounded-tr-[10px]"
                    }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="flex justify-end">
                    <span className="text-[10px] text-[#797979]">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caja para escribir */}
      <div
      >
        <InputChatWindow onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
