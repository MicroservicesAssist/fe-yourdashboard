import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FlagOutlined,
  FolderOutlined,
  MailOutlined,
  MoreOutlined,
  PrinterOutlined,
  ReloadOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { getEmailDetails } from "@/services/emails/emails";
import { useRouter } from "next/navigation";
import SendEmail from "./SendEmail";

const DetailsEmail = ({
  emailId,
  token,
}: {
  emailId: string;
  token: string;
}) => {
  const router = useRouter();
  const [showReplyModal, setShowReplyModal] = useState(false);

  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    fromEmail: "",
    fromName: "",
    receivedDate: "",
    bodyHtml: "",
  });
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getEmailDetails(token, emailId);
        setEmailDetails({
          subject: response.data.subject,
          fromEmail: response.data.fromEmail,
          fromName: response.data.fromName,
          receivedDate: response.data.receivedDate,
          bodyHtml: response.data.bodyHtml,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [emailId, token]);
  console.log("emailDetails", emailDetails);
  // Items del menú dropdown
  const menuItems: MenuProps["items"] = [
    {
      key: "reply",
      label: "Responder",
      icon: <MailOutlined />,
    },
    {
      key: "reenviar",
      label: "Reenviar",
      icon: <ReloadOutlined />,
    },
    {
      key: "marcar-importante",
      label: "Marcar como importante",
      icon: <FlagOutlined />,
    },
    {
      key: "postpone",
      label: "Posponer",
      icon: <ClockCircleOutlined />,
    },
    {
      key: "tag",
      label: "Agregar etiqueta",
      icon: <TagOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "move",
      label: "Mover a otra carpeta",
      icon: <FolderOutlined />,
    },
    {
      key: "print",
      label: "Imprimir",
      icon: <PrinterOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Eliminar",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("Menu item clicked:", e.key);
    if (e.key === "reply") {
      setShowReplyModal(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<ArrowLeftOutlined className="text-lg" />}
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            />
            <h1 className="text-xl font-semibold text-gray-900">
              {emailDetails.subject}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {emailDetails.receivedDate}
            </span>
            <Dropdown
              menu={{ items: menuItems, onClick: handleMenuClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<MoreOutlined className="text-lg" />}
                className="hover:bg-gray-100"
              />
            </Dropdown>
          </div>
        </div>

        {/* Email Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">De:</span>
            <span className="text-sm text-gray-900">
              {emailDetails.fromName}
            </span>
            <span className="text-sm text-gray-500">
              ({emailDetails.fromEmail})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Para:</span>
            <span className="text-sm text-gray-900">
              {emailDetails.subject}
            </span>
            <span className="text-sm text-gray-500">
              ({emailDetails.fromEmail})
            </span>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: emailDetails.bodyHtml }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              type="primary"
              size="large"
              onClick={() => setShowReplyModal(true)}
            >
              Responder
            </Button>
            <Button size="large" onClick={() => console.log("Reenviar")}>
              Reenviar
            </Button>
          </div>
        </div>
      </div>

      {/* Reply Modal/Drawer */}
      {showReplyModal && (
        <SendEmail type="reply" setModal={setShowReplyModal} />
      )}
    </div>
  );
};

export default DetailsEmail;
