"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Leido from "../../assets/leido.svg";
import Eliminar from "../../assets/eliminar.svg";
import DeleteChat from "../newDesign/DeleteChat";

interface OptionsMessageProps {
  onClose?: () => void;
}

const OptionsMessage: React.FC<OptionsMessageProps> = ({ onClose }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    if (onClose) onClose();
  };

  return (
    <div>
      {isDeleteOpen ? (
        <DeleteChat onClose={handleCloseDelete} />
      ) : (
        <div
          style={{
            fontFamily: "Montserrat",
          }}
          className="flex flex-col pl-4 px-2.5 pt-1 bg-[#FFFFFF] rounded-[10px] w-[158px] h-[74px] shadow-[0_4px_15px_0_#BED8FF]"
        >
          {/* Botón 1 */}
          <div
            className="flex items-center border-b border-[#DFE4EA] cursor-pointer"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={handleOpenDelete}
          >
            <Eliminar className="w-[14px] h-[14px]" />
            <Button
              type="text"
              style={{
                backgroundColor: "#FFFFFF",
                border: "none",
                color: "#000000",
                fontSize: "10px",
                boxShadow: "none",
              }}
            >
              Eliminar
            </Button>
          </div>

          {/* Botón 2*/}
          <div
            className="flex items-center cursor-pointer"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div>
            <Leido  />
            </div>
            <div>
            <Button
              type="text"
              style={{
                backgroundColor: "#FFFFFF",
                border: "none",
                color: "#000000",
                fontSize: "10px",
                boxShadow: "none",
                padding: "0px",
                paddingLeft: "10px"
              }}
            >
              Marcar como leído
            </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMessage;
