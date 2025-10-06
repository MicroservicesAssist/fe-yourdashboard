import React, { useState } from "react";
import { Input, Avatar, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

const SearchEmails = ({
  searchTerm,
  handleSearchTermChange,
  handleCheck,
}: {
  searchTerm: string;
  handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheck: (value: string) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("Cualquier fecha");

  // Datos de ejemplo de usuarios
  const usuarios: Usuario[] = [
    {
      id: "1",
      nombre: "Nombre de usuario",
      email: "dirección de correo de usuario",
    },
    {
      id: "2",
      nombre: "Nombre de usuario",
      email: "dirección de correo de usuario",
    },
    {
      id: "3",
      nombre: "Nombre de usuario",
      email: "dirección de correo de usuario",
    },
  ];

  // Función para obtener las iniciales
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Items del dropdown de usuarios
  const createUserMenuItems = (
    usuarios: Usuario[],
    onSelect: (userId: string) => void
  ): MenuProps["items"] => [
    {
      key: "search-header",
      label: (
        <div className="px-3 pb-2">
          <Input.Search
            placeholder="Buscar por nombre o correo"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full"
            value={searchTerm}
            onChange={handleSearchTermChange}
            onSearch={handleCheck}
          />
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
      className: "my-0",
    },
    ...usuarios.map((usuario) => ({
      key: usuario.id,
      label: (
        <div className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 transition-colors">
          <Avatar
            size={32}
            style={{ backgroundColor: "#3b49df" }}
            className="flex-shrink-0 font-semibold"
          >
            {getInitials(usuario.nombre)}
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-gray-900 text-sm">
              {usuario.nombre}
            </span>
            <span className="text-gray-400 text-xs truncate">
              ({usuario.email})
            </span>
          </div>
        </div>
      ),
      onClick: () => onSelect(usuario.id),
    })),
  ];

  // Items del dropdown de fechas
  const dateMenuItems: MenuProps["items"] = [
    {
      key: "cualquier-fecha",
      label: (
        <div className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 text-sm">Cualquier fecha</span>
        </div>
      ),
      onClick: () => setSelectedDate("Cualquier fecha"),
    },
    {
      key: "mas-semana",
      label: (
        <div className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 text-sm">Más de una semana</span>
        </div>
      ),
      onClick: () => setSelectedDate("Más de una semana"),
    },
    {
      key: "mas-mes",
      label: (
        <div className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 text-sm">Más de un mes</span>
        </div>
      ),
      onClick: () => setSelectedDate("Más de un mes"),
    },
    {
      key: "mas-6-meses",
      label: (
        <div className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 text-sm">Más de 6 meses</span>
        </div>
      ),
      onClick: () => setSelectedDate("Más de 6 meses"),
    },
    {
      key: "mas-año",
      label: (
        <div className="px-3 py-2 hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 text-sm">Más de un año</span>
        </div>
      ),
      onClick: () => setSelectedDate("Más de un año"),
    },
  ];

  return (
    <div className="">
      {/* Filtros */}
      <div className="flex gap-3 mb-6">
        {/* Dropdown De */}
        <Dropdown
          menu={{
            items: createUserMenuItems(usuarios, (id) => {
              //     setSelectedFrom(id);
              console.log("Usuario De seleccionado:", id);
            }),
            className: "custom-search-dropdown",
          }}
          trigger={["click"]}
          overlayStyle={{ minWidth: "280px" }}
        >
          <button
            className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500 transition-colors bg-white min-w-[120px]"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-gray-700 text-sm">De</span>
            <DownOutlined className="text-gray-400 text-xs ml-2" />
          </button>
        </Dropdown>

        {/* Dropdown Para */}
        <Dropdown
          menu={{
            items: createUserMenuItems(usuarios, (id) => {
              //  setSelectedTo(id);
              console.log("Usuario Para seleccionado:", id);
            }),
            className: "custom-search-dropdown",
          }}
          trigger={["click"]}
          overlayStyle={{ minWidth: "280px" }}
          dropdownRender={(menu) => (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto">
              {menu}
            </div>
          )}
        >
          <button
            className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500 transition-colors bg-white min-w-[120px]"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-gray-700 text-sm">Para</span>
            <DownOutlined className="text-gray-400 text-xs ml-2" />
          </button>
        </Dropdown>

        {/* Dropdown Fecha */}
        <Dropdown
          menu={{
            items: dateMenuItems,
            className: "custom-search-dropdown",
          }}
          trigger={["click"]}
          overlayStyle={{ minWidth: "220px" }}
          dropdownRender={(menu) => (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              {menu}
            </div>
          )}
        >
          <button
            className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500 transition-colors bg-white min-w-[160px]"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-gray-700 text-sm">{selectedDate}</span>
            <DownOutlined className="text-gray-400 text-xs ml-2" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchEmails;
