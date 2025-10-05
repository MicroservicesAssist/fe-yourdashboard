import React from "react";
import { Button, Dropdown, Form, Tooltip } from "antd";
import type { MenuProps } from "antd";
import {
  DownOutlined,
  FontSizeOutlined,
  PaperClipOutlined,
  LinkOutlined,
  SmileOutlined,
  GoogleOutlined,
  PictureOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  PrinterOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

interface ActionToolbarEmailProps {
  onSend?: () => void;
  onFormatOptions?: () => void;
  onAttachFile?: () => void;
  onInsertLink?: () => void;
  onInsertEmoji?: () => void;
  onInsertDrive?: () => void;
  onInsertPhoto?: () => void;
  onInsertSignature?: () => void;
  onDiscard?: () => void;
}

export const ActionToolbarEmail: React.FC<ActionToolbarEmailProps> = ({
  onSend,
  onFormatOptions,
  onAttachFile,
  onInsertLink,
  onInsertEmoji,
  onInsertDrive,
  onInsertPhoto,
  onInsertSignature,
  onDiscard,
}) => {
  // Menú de opciones de formato (tooltip)
  const formatMenuItems: MenuProps["items"] = [
    {
      key: "full-screen",
      label: "Pantalla completa como modo predeterminado",
      onClick: () => console.log("Pantalla completa"),
    },
    {
      key: "plain-text",
      label: "Modo texto sin formato",
      onClick: () => console.log("Modo texto"),
    },
    {
      type: "divider",
    },
    {
      key: "print",
      label: "Imprimir",
      icon: <PrinterOutlined />,
      onClick: () => console.log("Imprimir"),
    },
    {
      key: "check-spell",
      label: "Revisar ortografía",
      icon: <CheckSquareOutlined />,
      onClick: () => console.log("Revisar ortografía"),
    },
  ];

  // Menú de más opciones (3 puntos)
  const moreOptionsItems: MenuProps["items"] = [
    {
      key: "schedule",
      label: "Proponer horarios disponibles",
      icon: <ClockCircleOutlined />,
      onClick: () => console.log("Proponer horarios"),
    },
    {
      type: "divider",
    },
    {
      key: "create-event",
      label: "Crear evento",
      icon: <CalendarOutlined />,
      onClick: () => console.log("Crear evento"),
    },
  ];

  return (
    <div className="flex items-center justify-between mb-5">
      {/* Left side - Send button and main actions */}
      <div className="flex items-center gap-2">
        {/* Send button */}
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

        {/* Action icons */}
        <div className="flex items-center gap-1 ml-2">
          <Tooltip title="Opciones de formato">
            <Dropdown
              menu={{ items: formatMenuItems }}
              trigger={["click"]}
              placement="topLeft"
            >
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FontSizeOutlined style={{ fontSize: "18px" }} />
              </button>
            </Dropdown>
          </Tooltip>

          <Tooltip title="Adjuntar archivos">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onAttachFile}
            >
              <PaperClipOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Insertar vínculo">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onInsertLink}
            >
              <LinkOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Insertar emoji">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onInsertEmoji}
            >
              <SmileOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Insertar archivos con Drive">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onInsertDrive}
            >
              <GoogleOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Insertar foto">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onInsertPhoto}
            >
              <PictureOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Insertar firma">
            <button
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
              onClick={onInsertSignature}
            >
              <EditOutlined style={{ fontSize: "18px" }} />
            </button>
          </Tooltip>

          <Tooltip title="Más opciones">
            <Dropdown
              menu={{ items: moreOptionsItems }}
              trigger={["click"]}
              placement="topLeft"
            >
              <button
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreOutlined style={{ fontSize: "18px" }} />
              </button>
            </Dropdown>
          </Tooltip>
        </div>
      </div>

      {/* Right side - Delete button */}
      <Tooltip title="Descartar borrador">
        <button
          className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
          onClick={onDiscard}
        >
          <DeleteOutlined style={{ fontSize: "18px" }} />
        </button>
      </Tooltip>
    </div>
  );
};
