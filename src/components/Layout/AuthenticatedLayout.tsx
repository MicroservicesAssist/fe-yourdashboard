"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const { Content } = Layout;

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {pathname !== "/auth" && <Navbar />}

      <Content
        style={{
          marginTop: "86px",
          minHeight: "calc(100vh - 86px)",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AuthenticatedLayout;
