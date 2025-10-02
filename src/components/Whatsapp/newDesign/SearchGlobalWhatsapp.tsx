// 'use client';
import { useState } from "react";
import { searchMessages } from "@/services/whatsapp/whatsapp";
import { Conversation } from "@/interfaces/interfacesWhatsapp";
import Buscador from "../../assets/buscador.svg";

interface SearchBarProps {
  onResults: (results: Conversation[]) => void;
  onError: () => void;
}

export default function SearchGlobalWhatsapp({ onResults }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = async (value: string) => {
    setSearch(value);
    console.log("Buscando mensajes con:", value);

    if (value.trim() === "") {
      onResults([]);
      return;
    }

    try {
      const results = await searchMessages(value);
      console.log("Resultados de la búsqueda:", results);
      onResults(results);
    } catch (error) {
      console.error("Error al buscar mensajes:", error);
      onResults([]);
    }
  };

  return (
    <>
        <input
            type="text"
            placeholder="Buscar"
            className="w-full h-[38px] px-3 py-2.5 border 
            border-[#CBD5E1] rounded-[8px] text-[12px] focus:outline-none
            focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            />
              <Buscador className="w-[22px] h-[22px] text-[#1D2EB6] 
              absolute right-3 top-1/2 transform -translate-y-1/2" 
            />
    </>
        );
}
