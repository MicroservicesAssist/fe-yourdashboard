import React, { useState } from "react";
import Cerrar from "../../assets/cerrar.svg";
import CalendarioBlue from "../../assets/calendarioBlue.svg";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
}

interface NewChatProps {
  onClose: () => void;
  onResults: (results: Conversation[]) => void;
  onError: () => void;
}

const SearchMessage: React.FC<NewChatProps> = ({
  onClose,
  onResults,
  onError,
}) => {
  const [search, setSearch] = useState("");

  const searchMessages = async (): Promise<Conversation[]> => {
    // ⚡ Aquí deberías conectar con tu API real
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "1", name: "Carlos Pérez", lastMessage: "Hola, ¿qué tal?" },
          { id: "2", name: "Ana Gómez", lastMessage: "¿Agendamos la reunión?" },
        ]);
      }, 600);
    });
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    console.log("Buscando mensajes con:", value);

    if (value.trim() === "") {
      onResults([]);
      return;
    }

    try {
      const results = await searchMessages();
      console.log("Resultados de la búsqueda:", results);
      onResults(results);
    } catch (error) {
      console.error("Error al buscar mensajes:", error);
      onError();
    }
  };

  return (
    <div
      className="w-[320px] min-h-screen bg-white flex flex-col  border-[#1D2EB6] shadow-lg"
      style={{
        fontFamily: "Montserrat",
        boxShadow: "0px 4px 15px 0px #BED8FF",
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-3 pl-5 pr-3.5 py-[19px] border-b border-[#DFE4EA]">
        <Cerrar
          className="w-[13.5px] h-[13.5px] text-[#1C1B1F] cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-[16px] font-medium text-[#000000]">
          Buscar mensajes
        </h2>
      </div>

      {/* Buscador */}
      <div className="flex items-center mt-1 pl-5 pr-3.5 gap-2">
        <CalendarioBlue className="w-[22px] h-[22px] text-[#1D2EB6] cursor-pointer" />
        <input
          type="text"
          placeholder="Buscar mensajes..."
          className="flex-1 h-[38px] px-3 py-2.5 border 
      border-[#CBD5E1] rounded-[8px] text-[12px] focus:outline-none
      focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchMessage;
