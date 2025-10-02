import React, { useState } from "react";
import AggMessage from "../../assets/aggMessageBlue.svg";
import MyChatsMessage from "./MyChatsMessage";
import LinkModal from "./linkModal";
import SearchGlobalWhatsapp from "./SearchGlobalWhatsapp";
import NewChat from "./NewChat"; 

interface ChatItem {
  conversation_id: string;
  name: string;
  last_message: string;
  time: string;
}

interface MisChatsListProps {
  chats: ChatItem[];
  onSelectChat: (id: string) => void;
  selectedChat: string | null;
}

interface LinkModalProps {
  selectedContact?: string;
  onSelectContact?: (id: string) => void;
}

interface SearchGlobalWhatsappProps {
  onResults: (results: []) => void;
}

type MisChatsListAllProps = MisChatsListProps &
  LinkModalProps &
  SearchGlobalWhatsappProps;

const MisChatsList: React.FC<MisChatsListAllProps> = ({
  chats,
  onSelectChat,
  selectedChat,
  selectedContact,
  onSelectContact,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  return (
    <div>
      <div
        className="w-[320px] bg-white flex flex-col pl-5 pr-3.5 pt-[22px] border-[#1D2EB6]"
        style={{ fontFamily: "Montserrat" }}
      >
        {/* Encabezado */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center justify-center relative">
              <div className="flex flex-col">
                <h2 className="font-bold text-[32px] leading-[35.2px] tracking-normal text-[#1D2EB6]">
                  Mis chats
                </h2>
              </div>
              <div
                className="w-[17px] h-[17px] rounded-full p-1 mt-1.5 bg-[#DBEAFF] flex items-center justify-center cursor-pointer relative"
                onClick={() => setIsModalOpen(true)}
              >
                <img src="/dropdown.png" alt="" />
              </div>

              {/* Modal LinkModal */}
              {isModalOpen && (
                <div>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsModalOpen(false)}
                    style={{ background: "transparent" }}
                  />
                  <div
                    className="fixed z-50"
                    style={{
                      left: "calc(50% + -410px)",
                      top: "145px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkModal
                      onSelectContact={onSelectContact}
                      selectedContact={selectedContact}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botón AggMessage → abre NewChat */}
            <div
              className="mt-1.5 flex items-center justify-center"
              onClick={() => setIsNewChatOpen(true)}
            >
              <AggMessage className="w-[24px] h-[24px] cursor-pointer" />
            </div>
          </div>
          <div>
            <h2 className=" text-[12px] text-[#676767] ">Todos los chats</h2>
          </div>
        </div>

        {/* Buscador */}
        <div className="flex relative mt-3">
          <SearchGlobalWhatsapp onResults={() => {}} onError={() => {}} />
        </div>
      </div>

      {/* Lista de chats */}
      <div className="overflow-y-auto custom-scrollbar">
        <MyChatsMessage
          chats={chats}
          onSelectChat={onSelectChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Modal NewChat */}
      {isNewChatOpen && (
        <div>
          <div
            className="fixed inset-0 bg-opacity-30 z-40"
            onClick={() => setIsNewChatOpen(false)}
          />
          <div
            className="fixed z-50"
            style={{
              left: "calc(50% + -498px)",
              top: "91.5px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <NewChat
              onClose={() => setIsNewChatOpen(false)}
              onResults={(results) =>
                console.log("Resultados del NewChat:", results)
              }
              onError={() => console.error("Error en búsqueda de NewChat")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MisChatsList;
