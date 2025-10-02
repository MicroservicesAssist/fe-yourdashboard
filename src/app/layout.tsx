import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { ConfigProvider } from "antd";
import AuthenticatedLayout from "@/components/Layout/AuthenticatedLayout";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Asistente",
  description:
    "Dashboard inteligente para gestión de emails, calendario y WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable}`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#344BFF",
              borderRadius: 6,
              fontFamily: "Montserrat, sans-serif",
            },
          }}
        >
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
