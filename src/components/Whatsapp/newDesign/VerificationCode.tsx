"use client";
import React from "react";
import { Button } from "antd";
import CerrarBlue from "../../assets/cerrarBlue.svg";

interface LinkWhatsappNumberProps {
  onClose: () => void; // función que cerrará el modal
}
export default function VerificationCode({ onClose }: LinkWhatsappNumberProps) {
  return (
    <div
      className="
        flex flex-col 
        bg-white rounded-[10px] shadow-[0_4px_15px_0_#BED8FF]
        w-[613px] h-[396px] 
        font-[Montserrat] 
        mt-16 my-[60px] px-8 py-6
    "
    >
      <div className="flex justify-end">
        <CerrarBlue 
        className="w-[18px] h-[18px] text-[#202F8F] cursor-pointer"
        onClick={() => { onClose(); }}
        />
      </div>
      {/* Título y descripción */}
      <h2 className="text-[32px] font-bold text-[#202F8F] mb-2">
        Vincular WhatsApp
      </h2>
      <span className="text-[16px] text-[#000000] mb-6">
        Vincula tu cuenta de WhatsApp para recibir actualizaciones importantes y
        notificaciones.
      </span>

      {/* Campo de teléfono */}
      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-[#202F8F] mb-3">
            Código de verificación
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="0000000"
            className="
            w-full h-[38px] 
            pl-10 pr-3 
            border border-[#CBD5E1] 
            rounded-[8px] text-[12px] 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>
      </div>

      {/* Botón */}
      <Button
        type="primary"
        style={{
          backgroundColor: "#344BFF",
          height: "53px",
          border: "none",
          color: "#FFFFFF",
          fontSize: "16px",
          boxShadow: "none",
        }}
      >
        Enviar código de verificación
      </Button>

      <div className="text-[#000000]  text-[14px] mt-4 flex justify-center gap-2">
        ¿No recibiste el código?{" "}
        <span className="text-[#344BFF] text-[14px] font-bold cursor-pointer">Reenviar código</span>
      </div>
    </div>
  );
}
