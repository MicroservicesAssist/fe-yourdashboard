"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Vector from "../../assets/vector.svg";
import Imagen from "../../assets/imagen.svg";

interface OptionsChatWindowProps {
  onClose?: () => void;
}

const OptionsChatWindow: React.FC<OptionsChatWindowProps> = ({}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      {!clicked && (
        <div
          style={{
            fontFamily: "Montserrat",
          }}
          className="flex flex-col pl-4 px-2.5 pt-1 bg-[#FFFFFF]  rounded-[10px] w-[158px] h-[74px] shadow-[0_4px_15px_0_#BED8FF]"
        >
          {/* Botón 1 */}
          <div
            className="flex items-center border-b border-[#DFE4EA] cursor-pointer  "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Vector className="w-[12px] h-[12px]" />
            <Button
              type="text"
              style={{
                backgroundColor: "#FFFFFF",
                border: "none",
                color: "#000000",
                fontSize: "12px",
                boxShadow: "none",
              }}
              onClick={handleClick}
            >
              Documentos
            </Button>
          </div>

          {/* Botón 2*/}
          <div
            className="flex items-center cursor-pointer"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Imagen className="w-[12px] h-[12px]" />
            <Button
              type="text"
              style={{
                backgroundColor: "#FFFFFF",
                border: "none",
                color: "#000000",
                fontSize: "12px",
                boxShadow: "none",
              }}
            >
              Fotos y videos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsChatWindow;
