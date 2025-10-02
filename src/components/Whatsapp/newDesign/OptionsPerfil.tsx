"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Usuario from "../../assets/usuario.svg";
import Borrar from "../../assets/borrar.svg";
import UserPerfil from "./UserPerfil";

interface OptionsPerfilProps {
  onClose?: () => void;
  onCloseChat: () => void;
}

const OptionsPerfil: React.FC<OptionsPerfilProps> = ({onCloseChat}) => {
  const [showUserPerfil, setShowUserPerfil] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setShowUserPerfil(true);
    setClicked(true);
  };

  return (
    <div>
      {!clicked && (
        <div
          style={{
            fontFamily: "Montserrat",
          }}
          className="flex flex-col pl-4 px-2.5 pt-1 bg-[#FFFFFF]  rounded-[10px] w-[269px] h-[77px] shadow-[0_4px_15px_0_#BED8FF]"
        >
          {/* Botón 1 */}
          <div
            className="flex items-center border-b border-[#DFE4EA] cursor-pointer  "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Usuario className="w-[12px] h-[12px]" />
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
              Info. del perfil
            </Button>
          </div>

          {/* Botón 2*/}
          <div
            className="flex items-center border-b border-[#DFE4EA] cursor-pointer"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={onCloseChat}
          >
            <Borrar className="w-[12px] h-[12px]" />
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
              Cerrar chat
            </Button>
          </div>
        </div>
      )}

      {/* Modal flotante */}
      {showUserPerfil && (
        <div
          className="fixed inset-0  bg-opacity-25 z-50 flex"
          style={{
            left: "calc(50% + 435px)",
            top: "91.5px",
          }}
        >
          <UserPerfil onClose={() => setShowUserPerfil(false)} />
        </div>
      )}
    </div>
  );
};

export default OptionsPerfil;
