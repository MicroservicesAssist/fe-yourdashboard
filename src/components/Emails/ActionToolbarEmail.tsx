import React, { useRef } from "react";
import { Button, Dropdown, Form, Tooltip, notification } from "antd";
import type { MenuProps } from "antd";
import type { Editor } from "@tiptap/react";
import {
  PaperClipOutlined,
  LinkOutlined,
  SmileOutlined,
  PictureOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const SVGDrive = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <mask
        id="mask0_720_2757"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="21"
      >
        <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_720_2757)">
        <path
          d="M16.6667 14.9997L14.6875 16.9997C14.5209 17.1663 14.323 17.2497 14.0938 17.2497C13.8646 17.2497 13.6667 17.1663 13.5 16.9997C13.3334 16.833 13.25 16.6351 13.25 16.4059C13.25 16.1768 13.3334 15.9788 13.5 15.8122L15.4792 13.833H14.1667C13.9306 13.833 13.7327 13.7531 13.573 13.5934C13.4132 13.4337 13.3334 13.2358 13.3334 12.9997C13.3334 12.7636 13.4132 12.5656 13.573 12.4059C13.7327 12.2462 13.9306 12.1663 14.1667 12.1663H17.5C17.7362 12.1663 17.9341 12.2462 18.0938 12.4059C18.2535 12.5656 18.3334 12.7636 18.3334 12.9997V16.333C18.3334 16.5691 18.2535 16.767 18.0938 16.9268C17.9341 17.0865 17.7362 17.1663 17.5 17.1663C17.2639 17.1663 17.066 17.0865 16.9063 16.9268C16.7466 16.767 16.6667 16.5691 16.6667 16.333V14.9997ZM4.58337 18.4163C4.34726 18.4163 4.10768 18.3434 3.86462 18.1976C3.62157 18.0518 3.44449 17.8816 3.33337 17.6872L1.25004 14.0413C1.13893 13.8469 1.08337 13.6073 1.08337 13.3226C1.08337 13.0379 1.13893 12.7983 1.25004 12.6038L6.66671 3.31217C6.77782 3.11773 6.9549 2.94759 7.19796 2.80176C7.44101 2.65592 7.6806 2.58301 7.91671 2.58301H12.0834C12.3195 2.58301 12.5591 2.65592 12.8021 2.80176C13.0452 2.94759 13.2223 3.11773 13.3334 3.31217L16.3334 8.45801C16.5 8.74967 16.4966 9.03787 16.323 9.32259C16.1493 9.60731 15.8959 9.73579 15.5625 9.70801C15.4237 9.69412 15.2952 9.65592 15.1771 9.59342C15.0591 9.53092 14.9653 9.43717 14.8959 9.31217L11.9584 4.24967H8.04171L2.75004 13.333L4.70837 16.7497H10.875C11.0139 16.7497 11.1389 16.7775 11.25 16.833C11.3612 16.8886 11.4584 16.9719 11.5417 17.083C11.7362 17.3608 11.7605 17.6525 11.6146 17.958C11.4688 18.2636 11.2223 18.4163 10.875 18.4163H4.58337ZM6.52087 14.6663C6.3681 14.6663 6.22574 14.6316 6.09379 14.5622C5.96185 14.4927 5.86115 14.3886 5.79171 14.2497L5.66671 14.0205C5.59726 13.8955 5.56254 13.7566 5.56254 13.6038C5.56254 13.4511 5.59726 13.3122 5.66671 13.1872L9.00004 7.37467C9.06949 7.24967 9.17018 7.14898 9.30212 7.07259C9.43407 6.9962 9.57643 6.95801 9.72921 6.95801H10.2709C10.4237 6.95801 10.566 6.9962 10.698 7.07259C10.8299 7.14898 10.9306 7.24967 11 7.37467L12.5417 10.083C12.6389 10.2358 12.6771 10.4059 12.6563 10.5934C12.6355 10.7809 12.5625 10.9441 12.4375 11.083C12.2431 11.2913 12.007 11.3747 11.7292 11.333C11.4514 11.2913 11.2431 11.1525 11.1042 10.9163L10 8.99967L7.70837 12.9997H10.1459C10.4098 12.9997 10.6216 13.0969 10.7813 13.2913C10.941 13.4858 11 13.715 10.9584 13.9788C10.9306 14.1733 10.8334 14.3365 10.6667 14.4684C10.5 14.6004 10.3195 14.6663 10.125 14.6663H6.52087Z"
          fill="#1D2EB6"
        />
      </g>
    </svg>
  );
};

interface ActionToolbarEmailProps {
  editor: Editor | null;
  onDiscard?: () => void;
}

export const ActionToolbarEmail: React.FC<ActionToolbarEmailProps> = ({
  editor,
  onDiscard,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    title,
    description,
    type,
  }: {
    title: string;
    description: string;
    type?: "success" | "info" | "warning" | "error";
  }) => {
    api.open({
      message: title,
      description: description,
      showProgress: true,
      type: type || "success",
      style: { backgroundColor: "#EBF4FF" },
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const stylesIcons = {
    fontSize: "20px",
    width: "20px",
    height: "20px",
    color: "#1D2EB6",
  };

  // Insertar enlace
  const handleInsertLink = () => {
    if (!editor) return;

    const url = window.prompt("URL del enlace:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      openNotification({
        title: "Enlace insertado",
        description: url,
        type: "success",
      });
    }
  };

  // Adjuntar archivo
  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      openNotification({
        title: "Archivo adjuntado",
        description: file.name,
        type: "success",
      });
      // Aquí puedes implementar la lógica de subida de archivo
    }
  };

  // Insertar imagen
  const handleInsertPhoto = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        editor.chain().focus().setImage({ src: url }).run();
        openNotification({
          title: "Imagen insertada",
          description: file.name,
          type: "success",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Insertar emoji
  const handleInsertEmoji = () => {
    const emoji = window.prompt("Ingresa un emoji:");
    if (emoji && editor) {
      editor.chain().focus().insertContent(emoji).run();
    }
  };

  // Insertar Drive (simulado)
  const handleInsertDrive = () => {
    openNotification({
      title: "Funcionalidad de Google Drive próximamente",
      description: "Proximamente",
      type: "info",
    });
  };

  // Insertar firma
  const handleInsertSignature = () => {
    if (!editor) return;

    const signature = `
      <br/><br/>
      <div style="font-family: Arial, sans-serif; color: #666;">
        <p style="margin: 0;"><strong>Tu Nombre</strong></p>
        <p style="margin: 0;">Tu Cargo</p>
        <p style="margin: 0;">email@example.com</p>
      </div>
    `;

    editor.chain().focus().insertContent(signature).run();
    openNotification({
      title: "Firma insertada",
      description: "Tu firma fue insertada correctamente",
      type: "success",
    });
  };

  const meetingOptionsItems: MenuProps["items"] = [
    {
      key: "schedule",
      label: "Proponer horarios disponibles",
      icon: <CalendarOutlined style={stylesIcons} />,
      onClick: () =>
        openNotification({
          title: "Horarios propuestos",
          description: "Horarios propuestos",
        }),
    },
    {
      type: "divider",
    },
    {
      key: "create-event",
      label: "Crear evento",
      icon: <CalendarOutlined style={stylesIcons} />,
      onClick: () =>
        openNotification({
          title: "Evento creado",
          description: "Evento creado",
        }),
    },
  ];

  const formatMenuItems: MenuProps["items"] = [
    {
      key: "full-screen",
      label: "Pantalla completa como modo predeterminado",
      onClick: () =>
        openNotification({
          title: "Pantalla completa",
          description: "Pantalla completa",
        }),
    },
    {
      type: "divider",
    },
    {
      key: "plain-text",
      label: "Modo texto sin formato",
      onClick: () => {
        if (editor) {
          const text = editor.getText();
          editor.commands.setContent(`<p>${text}</p>`);
          openNotification({
            title: "Modo texto sin formato",
            description: "Modo texto sin formato",
          });
        }
      },
    },
    {
      type: "divider",
    },
    {
      key: "print",
      label: "Imprimir",
      onClick: () => {
        if (editor) {
          const content = editor.getHTML();
          const printWindow = window.open("", "", "width=800,height=600");
          printWindow?.document.write(content);
          printWindow?.print();
        }
      },
    },
    {
      type: "divider",
    },
    {
      key: "check-spell",
      label: "Revisar ortografía",
      onClick: () =>
        openNotification({
          title: "Revisar ortografía",
          description: "Revisar ortografía",
        }),
    },
    {
      type: "divider",
    },
    {
      key: "schedule-meeting",
      label: "Programar un horario de reunión",
      children: meetingOptionsItems,
    },
  ];

  return (
    <>
      {contextHolder}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Form.Item label={null} style={{ margin: 0 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="bg-[#1D2EB6] hover:bg-[#1520a0]"
            >
              Enviar
            </Button>
          </Form.Item>

          <div className="flex items-center gap-1 ml-2">
            <Tooltip title="Adjuntar archivos">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleAttachFile}
              >
                <PaperClipOutlined
                  className="rotate-[135deg]"
                  style={stylesIcons}
                />
              </button>
            </Tooltip>

            <Tooltip title="Insertar vínculo">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleInsertLink}
              >
                <LinkOutlined style={stylesIcons} />
              </button>
            </Tooltip>

            <Tooltip title="Insertar emoji">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleInsertEmoji}
              >
                <SmileOutlined style={stylesIcons} />
              </button>
            </Tooltip>

            <Tooltip title="Insertar archivos con Drive">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleInsertDrive}
              >
                <SVGDrive />
              </button>
            </Tooltip>

            <Tooltip title="Insertar foto">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleInsertPhoto}
              >
                <PictureOutlined style={stylesIcons} />
              </button>
            </Tooltip>

            <Tooltip title="Insertar firma">
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                onClick={handleInsertSignature}
              >
                <EditOutlined style={stylesIcons} />
              </button>
            </Tooltip>

            <Tooltip title="Más opciones">
              <Dropdown
                menu={{ items: formatMenuItems }}
                trigger={["click"]}
                placement="topLeft"
              >
                <button
                  className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreOutlined style={stylesIcons} />
                </button>
              </Dropdown>
            </Tooltip>
          </div>
        </div>

        <Tooltip title="Descartar borrador">
          <button
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
            onClick={onDiscard}
          >
            <DeleteOutlined style={stylesIcons} />
          </button>
        </Tooltip>
      </div>
    </>
  );
};
