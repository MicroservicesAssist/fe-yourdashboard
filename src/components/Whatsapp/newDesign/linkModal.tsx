"use client";
import React, { useState } from "react";
import { Avatar, Button, List } from "antd";
import MessageBlue from "../../assets/messageBlue.svg";
import Agregarwhite from "../../assets/agregarBlue.svg";
import LinkWhatsappNumber from "./linkWhatsappNumber";

const contacts = [
  { id: "1", nombre_cuenta: "Juan", phone: "+573136496877" },
  { id: "2", nombre_cuenta: "Monica", phone: "+573136496801" },
];

interface LinkModalProps {
  selectedContact?: string;
  onSelectContact?: (id: string) => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  selectedContact,
  onSelectContact,
}) => {
  const [showLinkWhatsapp, setShowLinkWhatsapp] = useState(false);
  const [clicked, setClicked] = useState(false); 
  
    const handleClick = () => {
      setShowLinkWhatsapp(true);
      setClicked(true); 
    };

  return (
    <div>
      {!clicked && (
    <div
      style={{
        fontFamily: "Montserrat",
      }}
      className="flex flex-col px-[15px] pt-[17px] bg-white rounded-[5px] w-[226px] shadow-[0_4px_15px_0_#BED8FF]"
      >
      {/* Lista de contactos */}
      <List
        style={{ fontFamily: "Montserrat" }}
        dataSource={contacts}
        renderItem={(item) => {
          const isSelected = selectedContact === item.id;
          return (
            <List.Item
              key={item.id}
              className={`cursor-pointer !border-none !px-0 !py-[5px] ${
                isSelected ? "bg-[#EBF4FF] rounded-[10px]" : ""
              }`}
              onClick={() => onSelectContact && onSelectContact(item.id)}
            >
              <List.Item.Meta
                className="flex items-center"
                avatar={
                  <Avatar
                  style={{
                      backgroundColor: "#1D2EB6",
                      color: "#FFFFFF",
                      width: 38,
                      height: 38,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {item.nombre_cuenta[0]}
                  </Avatar>
                }
                title={
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[#000000] text-xs">
                      {item.nombre_cuenta}
                    </span>
                    <span className="text-[10px] text-[#333333]">
                      {item.phone}
                    </span>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />


      {/* Botón 1 */}
      <div
        className="flex items-center cursor-pointer w-full gap-2 border-t border-[#D3D3D3]"
        style={{ backgroundColor: "#FFFFFF" }}
        >
        <MessageBlue className="w-[20px] h-[20px]" />
        <Button
          type="text"
          style={{
            backgroundColor: "#FFFFFF",
            border: "none",
            color: "#000000",
            fontSize: "14px",
            boxShadow: "none",
          }}
          >
          Todas las cuentas
        </Button>
      </div>

      {/* Botón 2*/}
      <div
        className="flex items-center cursor-pointer w-full gap-2 mb-3"
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={handleClick}
      >
        <Agregarwhite className="w-[20px] h-[20px]" />
        <Button
          type="text"
          style={{
            backgroundColor: "#FFFFFF",
            border: "none",
            color: "#000000",
            fontSize: "14px",
            boxShadow: "none",
          }}
          >
          Vincular WhatsApp
        </Button>
      </div>
      </div>
      )}
    
      {/* Modal flotante */}
      {showLinkWhatsapp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LinkWhatsappNumber onClose={() => setShowLinkWhatsapp(false)} />
        </div>
      )}
      </div>
  );
};

export default LinkModal;
