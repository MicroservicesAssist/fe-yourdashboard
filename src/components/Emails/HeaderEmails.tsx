import React from "react";
import { Button, Input, Dropdown, Space, Avatar } from "antd";
import { PlusOutlined, MessageOutlined } from "@ant-design/icons";

import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ICuentaGmail } from "@/interfaces/interfacesAuth";
import { ItemType } from "antd/es/menu/interface";

const HeaderEmails = ({
  openSearch,
  setOpenSearch,
  handleCheck,
  handleSearchTermChange,
  cuentasGmail,
  viewAll,
  selectedCuentaGmailId,
  handleConnectService,
  handleViewAll,
  conectEmail,
}: {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheck: (value: string) => void;
  handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cuentasGmail: ICuentaGmail[];
  viewAll: boolean;
  selectedCuentaGmailId: string | null;
  handleConnectService: (cuentaGmailId: string) => void;
  handleViewAll: () => void;
  conectEmail: () => Promise<void>;
}) => {
  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Función para generar un color basado en el email
  const getAvatarColor = (email: string) => {
    const colors = [
      "#3b49df",
      "#f56565",
      "#48bb78",
      "#ed8936",
      "#9f7aea",
      "#38b2ac",
      "#e53e3e",
      "#4299e1",
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Crear items dinámicos de las cuentas
  const cuentasItems = cuentasGmail
    .filter((cuenta) => cuenta.isActive === "Activo")
    .map((cuenta) => ({
      key: cuenta.id,
      label: (
        <div className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
          <Avatar
            size={40}
            style={{ backgroundColor: getAvatarColor(cuenta.emailGmail) }}
            className="flex-shrink-0 font-semibold"
          >
            {getInitials(cuenta.nameGmail)}
          </Avatar>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-gray-900 text-base">
              {cuenta.nameGmail}
            </span>
            <span className="text-gray-500 text-xs truncate">
              {cuenta.emailGmail}
            </span>
          </div>
        </div>
      ),
      onClick: () => handleConnectService(cuenta.id),
    }));

  const menuItems: ItemType[] =
    cuentasGmail.length === 0
      ? [
          {
            key: "link-email",
            label: (
              <div className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center justify-center flex-shrink-0">
                  <PlusOutlined
                    style={{ fontSize: "20px", width: "20px", height: "20px" }}
                    className="!text-blue-900"
                  />
                </div>
                <p className="font-medium text-gray-900 text-base">
                  Vincular correo
                </p>
              </div>
            ),
            onClick: () => conectEmail(),
          },
        ]
      : [
          ...cuentasItems,
          {
            type: "divider" as const,
            className: "my-2",
          },
          {
            key: "all-accounts",
            label: (
              <div className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center justify-center flex-shrink-0">
                  <MessageOutlined
                    style={{ fontSize: "20px", width: "20px", height: "20px" }}
                    className="!text-blue-900"
                  />
                </div>
                <p className="font-medium text-gray-900 text-base">
                  Todas las cuentas
                </p>
              </div>
            ),
            onClick: () => handleViewAll(),
          },
          {
            key: "link-email",
            label: (
              <div className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center justify-center flex-shrink-0">
                  <PlusOutlined
                    style={{ fontSize: "20px", width: "20px", height: "20px" }}
                    className="!text-blue-900"
                  />
                </div>
                <p className="font-medium text-gray-900 text-base">
                  Vincular correo
                </p>
              </div>
            ),
            onClick: () => conectEmail(),
          },
        ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl !font-bold !text-blue-800 m-auto">
            Mis correos
          </h1>
          <Dropdown
            menu={{
              items: menuItems,
              className: "custom-dropdown-menu",
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="bg-blue-200 rounded-full p-2 cursor-pointer hover:bg-blue-300 transition-colors">
                <Image
                  width={15}
                  height={15}
                  src="/arrow-donw.svg"
                  alt="email"
                />
              </Space>
            </a>
          </Dropdown>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center w-full">
            {openSearch ? (
              <Input.Search
                allowClear
                placeholder="Buscar..."
                onChange={handleSearchTermChange}
                onSearch={handleCheck}
                size="large"
              />
            ) : (
              <Button
                color="primary"
                variant="outlined"
                icon={<SearchOutlined />}
                size="large"
                onClick={() => setOpenSearch(true)}
              />
            )}
          </div>

          <Button size="large" type="primary">
            Nuevo correo
          </Button>
        </div>
      </div>
      <p className="-mt-3 text-gray-500 font-medium">
        {" "}
        {cuentasGmail.length === 0
          ? ""
          : viewAll
          ? "Todos los correos"
          : `Correos de la cuenta: `}
        {cuentasGmail.find((c) => selectedCuentaGmailId?.includes(c.id))
          ?.emailGmail || ""}{" "}
      </p>
    </div>
  );
};

export default HeaderEmails;
