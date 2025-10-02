"use client";
import React, { useState } from "react";
import { Button } from "antd";
import TelefonoBlue from "../../assets/telefonoBlue.svg";
import CerrarBlue from "../../assets/cerrarBlue.svg";
import VerificationCode from "./VerificationCode";

interface LinkWhatsappNumberProps {
  onClose: () => void;
}

export default function LinkWhatsappNumber({
  onClose,
}: LinkWhatsappNumberProps) {
  const [showLinkWhatsapp, setShowLinkWhatsapp] = useState(false);

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
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <h2 className="text-[32px] font-bold text-[#202F8F] mb-2">
        Vincular WhatsApp
      </h2>
      <span className="text-[16px] text-[#000000] mb-6">
        Vincula tu cuenta de WhatsApp para recibir actualizaciones importantes y
        notificaciones.
      </span>

      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-[#202F8F] mb-3">
          Número de teléfono
        </h3>
        <div className="relative">
          <TelefonoBlue
            className="
            w-[22px] h-[22px] text-[#1D2EB6] 
            absolute left-3 top-1/2 -translate-y-1/2
            "
          />
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
        onClick={() => setShowLinkWhatsapp(true)}
      >
        Enviar código de verificación
      </Button>

      {/* Modal flotante */}
      {showLinkWhatsapp && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
          "
        >
          <VerificationCode onClose={() => setShowLinkWhatsapp(false)} />
        </div>
      )}
    </div>
  );
}
