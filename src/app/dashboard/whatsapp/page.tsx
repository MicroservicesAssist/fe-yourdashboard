"use client";

import React from "react";
import { Layout } from "antd";
const { Content } = Layout;
import MisChatsList from "@/components/Whatsapp/newDesign/MyChatsList";
import ChatWindow from "@/components/Whatsapp/newDesign/ChatWindow";
import LinkWhatsapp from "@/components/Whatsapp/newDesign/linkWhatsappWindow";


export default function Home() {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

  const conversations = [
    { conversation_id: "1", name: "Nombre 1", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "2", name: "Nombre 2", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "3", name: "Nombre 3", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "4", name: "Nombre 4", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "5", name: "Nombre 5", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "6", name: "Nombre 6", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "7", name: "Nombre 7", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "8", name: "Nombre 8", last_message: "Último mensaje", time: "14:16" },
    { conversation_id: "9", name: "Nombre 9", last_message: "Último mensaje", time: "14:16" },
    // ...
  ];

  const messages: {
    message_id: string;
    from: "me" | "other";
    text: string;
    timestamp: string;
  }[] = [
    {
      message_id: "m1",
      from: "other",
      text: "Lorem ipsum dolor sit amet consectetur. Urna in cras nunc massa in maecenas a nulla.",
      timestamp: "10:00",
    },
    {
      message_id: "m2",
      from: "me",
      text: "Lorem ipsum dolor sit amet consectetur. Urna in cras nunc massa in maecenas a nulla.",
      timestamp: "10:01",
    },
    {
      message_id: "m3",
      from: "other",
      text: "Lorem ipsum dolor sit amet consectetur. Urna in cras nunc massa in maecenas a nulla.",
      timestamp: "10:02",
    },
    {
      message_id: "m4",
      from: "me",
      text: "Lorem ipsum dolor sit amet consectetur. Urna in cras nunc massa in maecenas a nulla.",
      timestamp: "10:03",
    },
    {
      message_id: "m5",
      from: "other",
      text: "Lorem ipsum dolor sit amet consectetur. Urna in cras nunc massa in maecenas a nulla.",
      timestamp: "10:04",
    },
    {
      message_id: "m6",
      from: "me",
      text: "He trabajado en un proyecto interesante.",
      timestamp: "10:05",
    },
    { message_id: "m7", 
      from: "other", 
      text: "¡Genial! ¿De qué se trata?",
      timestamp: "10:06"
    },
    {
      message_id: "m8",
      from: "me",
      text: "Es una aplicación para gestionar tareas.",
      timestamp: "10:07"
    },
    { message_id: "m9", 
      from: "other", 
      text: "Suena útil. ¡Buena suerte!",
      timestamp: "10:08"
    },
    // ...
  ];
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>

      <Layout style={{ marginLeft: 260 }}>
        <Content
          style={{
            position: "fixed", // 🔹 Fijo igual que el Sider
            top: 86, // 🔹 mismo offset superior
            left: 260, // 🔹 comienza a la derecha del Sider
            width: "calc(100% - 260px)", // 🔹 ocupa todo lo demás
            height: "calc(100vh - 86px)", // 🔹 altura restante
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e8e8e8",
            minHeight: "calc(100vh - 86px)",
          }}
        >
          <div className="flex h-screen">
            <MisChatsList
              chats={conversations}
              onSelectChat={setSelectedChat}
              selectedChat={selectedChat}
              onResults={() => {}}
            />
            {selectedChat ? (
              <ChatWindow
                selectedChatName={
                  conversations.find((c) => c.conversation_id === selectedChat)?.name || ""
                }
                messages={messages}
                onSendMessage={(msg) => console.log("enviar", msg)}
                onCloseChat={() => setSelectedChat(null)}
              />
            ) : (
              <LinkWhatsapp />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
