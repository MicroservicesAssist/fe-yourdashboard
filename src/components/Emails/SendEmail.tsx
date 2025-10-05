"use client";
import React from "react";
import { Button, Form, FormProps, Input } from "antd";
import {
  ArrowsAltOutlined,
  CloseOutlined,
  EnterOutlined,
  MinusOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { FontFamily, TextStyle } from "@tiptap/extension-text-style";
import TiptapToolbar from "./TiptapToolbar";
import { ActionToolbarEmail } from "./ActionToolbarEmail";
import { Image } from "@tiptap/extension-image";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const SendEmail = ({
  type,
  setModal,
  subject,
}: {
  type: "new" | "reply" | "forward";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  subject?: string | undefined;
}) => {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [minScreen, setMinScreen] = React.useState(false);
  const [activeFormats, setActiveFormats] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    bulletList: false,
    orderedList: false,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image,
      FontFamily,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
    content: "<p>Mensaje...</p>",
    onUpdate: ({ editor }) => {
      setActiveFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        alignLeft: editor.isActive({ textAlign: "left" }),
        alignCenter: editor.isActive({ textAlign: "center" }),
        alignRight: editor.isActive({ textAlign: "right" }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
      });
    },
    onSelectionUpdate: ({ editor }) => {
      setActiveFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        alignLeft: editor.isActive({ textAlign: "left" }),
        alignCenter: editor.isActive({ textAlign: "center" }),
        alignRight: editor.isActive({ textAlign: "right" }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
    setMinScreen(false);
  };
  const handleMinScreen = () => {
    setMinScreen(!minScreen);
    setFullScreen(false);
  };

  if (!editor) {
    return <div className="animate-pulse bg-gray-100 h-96 rounded-lg" />;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      <div
        className={`${
          fullScreen &&
          "px-20 py-10 w-full h-full bg-black/50 fixed top-0 left-0 !z-[1000] flex items-center justify-center"
        }`}
      >
        <div
          className={`m-auto bg-white shadow-2xl rounded-lg z-50 flex flex-col ${
            minScreen
              ? "w-1/2 fixed right-0 bottom-0"
              : !fullScreen
              ? "w-1/2 h-[550px] fixed right-0 bottom-0"
              : "w-full h-full"
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-3 rounded-t-lg bg-[#EBF4FF]">
            <h3 className="text-base font-semibold text-[#1D2EB6] my-auto">
              {subject && (
                <EnterOutlined
                  className="rotate-x-180"
                  style={{
                    color: "#1D2EB6",
                    fontSize: 20,
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
              )}
              {type === "new"
                ? "Mensaje nuevo"
                : type === "reply"
                ? `Responder a ${subject}`
                : "Reenviar"}
            </h3>
            <div className="flex items-center gap-2">
              <Button
                type="text"
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
                icon={<MinusOutlined />}
                className="!text-[#1D2EB6]"
                onClick={handleMinScreen}
              />

              <Button
                type="text"
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
                icon={fullScreen ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                onClick={handleFullScreen}
                className="!text-[#1D2EB6]"
              />
              <Button
                type="text"
                style={{
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
                icon={<CloseOutlined />}
                className="!text-[#1D2EB6]"
                onClick={() => setModal(false)}
              />
            </div>
          </div>

          {/* Reply Form */}
          {!minScreen && (
            <Form
              name="basic"
              // initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              // autoComplete="off"
              className="!space-y-10 !mt-10 !px-10 !flex-1 !flex !flex-col !overflow-hidden"
            >
              {type === "new" && (
                <>
                  <Form.Item
                    label={
                      <span className="!text-blue-800 !font-bold text-base">
                        Para
                      </span>
                    }
                    // name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    className="!px-5"
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="!text-blue-800 !font-bold text-base">
                        Asunto
                      </span>
                    }
                    // name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    className="!px-5"
                  >
                    <Input size="large" />
                  </Form.Item>
                </>
              )}

              {/* Message Input */}
              <div className="border border-gray-200 rounded-xl flex-1 px-4 py-3 overflow-scroll">
                <EditorContent
                  className="w-full h-full flex-1 [&_.ProseMirror]:min-h-full [&_.ProseMirror]:h-full"
                  editor={editor}
                  role="presentation"
                />
              </div>

              {/* Toolbar */}
              <div className="flex gap-x-10">
                <TiptapToolbar editor={editor} activeFormats={activeFormats} />
              </div>

              <ActionToolbarEmail
                editor={editor}
                onDiscard={() => setModal(false)}
              />
            </Form>
          )}
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default SendEmail;
