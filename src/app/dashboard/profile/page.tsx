//!!!!!!!!!!!!!!!!!!!!!!!! Esta manera es provicional
"use client";

import React from "react";
import { Layout } from "antd";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Layout/Navbar"), {
  ssr: false,
});
const ProfileClient = dynamic(() => import("@/components/Profile/Profile"), {
  ssr: false,
});

const { Content } = Layout;

export default function PerfilPage() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar />
      <Content
        style={{
          marginTop: "86px",
          padding: "20px 0",
          minHeight: "calc(100vh - 86px)",
        }}
      >
        <ProfileClient />
      </Content>
    </Layout>
  );
}
