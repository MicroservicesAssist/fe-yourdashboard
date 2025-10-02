"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Agregarwhite from "../../assets/agregarBlue.svg";
import LinkWhatsappNumber from "./linkWhatsappNumber";

export default function LinkWhatsappModal() {
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
          backgroundColor: "#FFFFFF",
          border: "none",
          color: "#344BFF",
          borderRadius: "5px",
          width: "226px",
          height: "54px",
          fontWeight: "500",
          boxShadow: "0px 4px 15px 0px #BED8FF",
        }}
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <Agregarwhite className="w-[20px] h-[20px]" />
        <Button
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
      )}

      {/* Modal flotante */}
      {showLinkWhatsapp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LinkWhatsappNumber onClose={() => setShowLinkWhatsapp(false)} />
        </div>
      )}
    </div>
  );
}
