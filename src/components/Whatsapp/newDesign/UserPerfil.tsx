import React from "react";
import Cerrar from "../../assets/cerrar.svg";
import { Avatar } from "antd";
import Usuario from "../../assets/usuario.svg";
import Correo from "../../assets/correo.svg";
import TelefonoBlue from "../../assets/telefonoBlue.svg";
import Rol from "../../assets/rol.svg";

const UserPerfil: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const user = {
    nombre: "Mónica Rojas",
    telefono: "+57 313 649 6877",
    email: "monica.rojas@email.com",
    rol: "Administrador",
  };

  return (
    <div
      className="w-[320px] min-h-screen bg-white flex flex-col items-center border-[#1D2EB6] shadow-lg"
      style={{
        fontFamily: "Montserrat",
        boxShadow: "0px 4px 15px 0px #BED8FF",
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-3 px-5 py-[19px] border-b border-[#DFE4EA] w-full">
        <Cerrar
          className="w-[13.5px] h-[13.5px] text-[#1C1B1F] cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-[16px] font-medium text-[#000000]">
          Perfil de usuario
        </h2>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-5">
        <Avatar
          style={{
            backgroundColor: "#1D2EB6",
            color: "#FFFFFF",
            width: 116,
            height: 116,
            fontSize: 14,
            fontFamily: "Montserrat",
            padding: 10,
          }}
        />
      </div>

      {/* Información del perfil */}
      <div className="flex flex-col gap-4 mt-6 w-full px-6">
        {/* Nombre */}
        <div>
          <p className="text-[16px] font-bold text-[#202F8F]">
            Nombre completo
          </p>
          <div className="flex items-center justify-center w-full border border-[#CBD5E1] rounded-[8px] h-[38px] px-3">
            <Usuario className="w-[22px] h-[22px] text-[#1D2EB6]" />
            <input
              type="text"
              className="flex-1 h-full ml-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.nombre}
              readOnly
            />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <p className="text-sm font-medium text-gray-600">Teléfono</p>
          <div className="flex items-center justify-center w-full border border-[#CBD5E1] rounded-[8px] h-[38px] px-3">
            <TelefonoBlue className="w-[22px] h-[22px] text-[#1D2EB6]" />
            <input
              type="text"
              className="flex-1 h-full ml-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.telefono}
              readOnly
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm font-medium text-gray-600">Email</p>
          <div className="flex items-center justify-center w-full border border-[#CBD5E1] rounded-[8px] h-[38px] px-3">
            <Correo className="w-[22px] h-[22px] text-[#1D2EB6]" />
            <input
              type="text"
              className="flex-1 h-full ml-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.email}
              readOnly
            />
          </div>
        </div>

        {/* Rol */}
        <div>
          <p className="text-sm font-medium text-gray-600">Rol</p>
          <div className="flex items-center justify-center w-full border border-[#CBD5E1] rounded-[8px] h-[38px] px-3">
            <Rol className="w-[22px] h-[22px] text-[#1D2EB6]" />
            <input
              type="text"
              className="flex-1 h-full ml-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.rol}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPerfil;
