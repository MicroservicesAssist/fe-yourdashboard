// src/app/dashboard/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "../globals.css";
import Navbar from "@/components/Layout/Navbar";
import SidebarMenu from "@/components/Dashboard/SidebarMenu";
import { usePathname, useRouter } from "next/navigation";

const { Content, Sider } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Determinar el item activo basado en la ruta actual
  const getActiveMenuItem = () => {
    if (pathname.startsWith("/dashboard/search")) return "buscador"; // 👈 Agregado
    if (pathname.startsWith("/dashboard/calendar")) return "calendario";
    if (pathname.startsWith("/dashboard/email")) return "correo";
    if (pathname.startsWith("/dashboard/whatsapp")) return "whatsapp";
    if (pathname === "/dashboard") return "dashboard";
    return "dashboard";
  };

  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem());

  // Actualizar el item activo cuando cambia la ruta
  useEffect(() => {
    setActiveMenuItem(getActiveMenuItem());
  }, [pathname]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Manejar el click en los items del menú
  const handleMenuItemClick = (key: string) => {
    setActiveMenuItem(key);

    switch (key) {
      case "buscador":
        router.push("/dashboard/search"); // 👈 Cambiado
        break;
      case "dashboard":
        router.push("/dashboard");
        break;
      case "calendario":
        router.push("/dashboard/calendar");
        break;
      case "correo":
        router.push("/dashboard/email");
        break;
      case "whatsapp":
        router.push("/dashboard/whatsapp");
        break;
      case "usuarios":
        router.push("/dashboard");
        break;
      default:
        router.push("/dashboard");
    }
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* Navbar */}
      <Navbar />

      <Layout style={{ marginTop: "86px" }}>
        {/* Sidebar */}
        <Sider
          width={260}
          style={{
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e8e8e8",
            position: "fixed",
            height: "calc(100vh - 86px)",
            left: 0,
            top: 86,
            zIndex: 100,
            boxShadow: "0px 4px 15px 0px #BED8FF",
            overflowY: "auto",
          }}
        >
          <SidebarMenu
            activeItem={activeMenuItem}
            onItemClick={handleMenuItemClick}
          />
        </Sider>

        {/* Contenido principal */}
        <Layout style={{ marginLeft: 260 }}>
          <Content
            style={{
              backgroundColor: "#fafafa",
              minHeight: "calc(100vh - 86px)",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>

      <style jsx global>{`
        /* Estilos para el scroll de la sidebar */
        .ant-layout-sider::-webkit-scrollbar {
          width: 6px;
        }

        .ant-layout-sider::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .ant-layout-sider::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .ant-layout-sider::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </Layout>
  );
};

export default DashboardLayout;
