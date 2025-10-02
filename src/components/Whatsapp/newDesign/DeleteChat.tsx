"use client";
import React from "react";
import { Button } from "antd";
import CerrarBlue from "../../assets/cerrarBlue.svg";

interface DeleteChatProps {
  onClose: () => void;
}

const DeleteChat: React.FC<DeleteChatProps> = ({ onClose }) => {
  return (
    <div
      className="
        flex flex-col 
        bg-white rounded-[10px] shadow-[0_4px_15px_0_#BED8FF]
        w-[450px] h-[244px] 
        font-[Montserrat] 
        mt-16 my-[60px] px-8 py-6
    "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold text-[#202F8F]">
          ¿Desea eliminar el chat?
        </h2>
        <CerrarBlue
          className="w-[18px] h-[18px] text-[#202F8F] cursor-pointer"
          onClick={() => {}}
        />
      </div>
      {/* Título y descripción */}
      <span className="text-[16px] text-[#000000] mb-6">
        Una vez eliminado, no podrás recuperar este chat. Asegúrate de que
        deseas proceder.
      </span>

      {/* Botón */}
      <div className="flex justify-end gap-3">
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              width: "110px",
              height: "53px",
              borderColor: "#344BFF",
              color: "#344BFF",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "none",
            }}
            onClick={onClose}
          >
            Cancelar
          </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#344BFF",
            width: "110px",
            height: "53px",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "bold", 
            boxShadow: "none",
          }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default DeleteChat;
