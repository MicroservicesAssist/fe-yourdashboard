"use client";

import React from "react";
import Image from "next/image";

interface SidebarMenuProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeItem,
  onItemClick,
}) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const menuItems = [
    { key: "buscador", label: "Buscador", icon: "buscador.png" },
    { key: "dashboard", label: "Dashboard", icon: "dashboard 2.png" },
    { key: "usuarios", label: "Usuarios", icon: "usuarios.png" },
    { key: "whatsapp", label: "Whatsapp", icon: "whatsapp.png" },
    {
      key: "correo",
      label: "Correo",
      icon: "correo.png",
      children: [
        { key: "correo-inbox", label: "Mis Correos" },
        { key: "correo-shared", label: "Correos compartidos" },
      ],
    },
    { key: "calendario", label: "Calendario", icon: "calendario.png" },
  ];

  return (
    <div style={{ padding: "20px 10px" }}>
      {menuItems.map((item) => {
        const isOpen = openKeys.includes(item.key);

        return (
          <div key={item.key}>
            <div
              onClick={() =>
                item.children ? toggleOpen(item.key) : onItemClick(item.key)
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginBottom: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  activeItem === item.key ? "#344BFF" : "transparent",
                color: activeItem === item.key ? "#ffffff" : "#000000",
                transition: "all 300ms ease-out",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                position: "relative",
                overflow: "hidden",
              }}
              className="sidebar-menu-item"
            >
              <div className="flex">
                <Image
                  src={`/${item.icon}`}
                  alt={item.label}
                  width={20}
                  height={20}
                  style={{
                    marginRight: "12px",
                    filter:
                      activeItem === item.key
                        ? "brightness(0) invert(1)"
                        : "none",
                    transition: "filter 300ms ease-out",
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    transition: "color 300ms ease-out",
                  }}
                >
                  {item.label}
                </span>
              </div>
              {item.children && (
                <Image
                  src="/arrow-donw.svg"
                  alt="arrow"
                  width={10}
                  height={5}
                  style={{
                    marginRight: "12px",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition:
                      "transform 300ms ease-out, filter 300ms ease-out",
                    filter:
                      activeItem === item.key
                        ? "brightness(0) invert(1)"
                        : "none",
                  }}
                />
              )}
            </div>
            {/* Subitems desplegables */}
            {item.children && isOpen && (
              <div className="ml-8 flex flex-col gap-2">
                {item.children.map((sub) => (
                  <div
                    key={sub.key}
                    onClick={() => onItemClick(sub.key)}
                    className={`cursor-pointer p-3 hover:bg-blue-600 hover:text-white rounded-lg transition ${
                      activeItem === sub.key ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .sidebar-menu-item {
          position: relative;
        }

        .sidebar-menu-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #344bff;
          opacity: 0;
          transition: opacity 300ms ease-out;
          border-radius: 8px;
        }

        .sidebar-menu-item:hover::before {
          opacity: 1;
        }

        .sidebar-menu-item:hover {
          color: #ffffff !important;
          animation-timing-function: ease-out;
          animation-duration: 300ms;
        }

        .sidebar-menu-item:hover img {
          filter: brightness(0) invert(1) !important;
        }

        .sidebar-menu-item:hover span {
          color: #ffffff !important;
          position: relative;
          z-index: 1;
        }

        .sidebar-menu-item img,
        .sidebar-menu-item span {
          position: relative;
          z-index: 1;
        }

        .sidebar-menu-item:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default SidebarMenu;
