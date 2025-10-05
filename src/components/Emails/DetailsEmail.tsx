import React, { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EnterOutlined,
  LeftOutlined,
  MailOutlined,
  MoreOutlined,
  PrinterOutlined,
  RightOutlined,
  TranslationOutlined,
} from "@ant-design/icons";

import { getEmailDetails } from "@/services/emails/emails";
import { useRouter } from "next/navigation";
import SendEmail from "./SendEmail";
import { formatoDeFechaYHora } from "@/utils/date";
import { SpinerGlobal } from "@/utils/cargando";

const SVGReenviar = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3021_1280"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3021_1280)">
        <path
          d="M3.6186 8.74961L6.5436 11.6746C6.6936 11.8246 6.76548 11.9996 6.75923 12.1996C6.75298 12.3996 6.67485 12.5746 6.52485 12.7246C6.37485 12.8621 6.19985 12.934 5.99985 12.9402C5.79985 12.9465 5.62485 12.8746 5.47485 12.7246L2.02485 9.27461C1.94985 9.19961 1.89673 9.11836 1.86548 9.03086C1.83423 8.94336 1.8186 8.84961 1.8186 8.74961C1.8186 8.64961 1.83423 8.55586 1.86548 8.46836C1.89673 8.38086 1.94985 8.29961 2.02485 8.22461L5.47485 4.77461C5.61235 4.63711 5.78423 4.56836 5.99048 4.56836C6.19673 4.56836 6.37485 4.63711 6.52485 4.77461C6.67485 4.92461 6.74985 5.10273 6.74985 5.30898C6.74985 5.51523 6.67485 5.69336 6.52485 5.84336L3.6186 8.74961ZM8.1186 9.49961L10.2936 11.6746C10.4436 11.8246 10.5155 11.9996 10.5092 12.1996C10.503 12.3996 10.4249 12.5746 10.2749 12.7246C10.1249 12.8621 9.94985 12.934 9.74985 12.9402C9.54985 12.9465 9.37485 12.8746 9.22485 12.7246L5.77485 9.27461C5.69985 9.19961 5.64673 9.11836 5.61548 9.03086C5.58423 8.94336 5.5686 8.84961 5.5686 8.74961C5.5686 8.64961 5.58423 8.55586 5.61548 8.46836C5.64673 8.38086 5.69985 8.29961 5.77485 8.22461L9.22485 4.77461C9.36235 4.63711 9.53423 4.56836 9.74048 4.56836C9.94673 4.56836 10.1249 4.63711 10.2749 4.77461C10.4249 4.92461 10.4999 5.10273 10.4999 5.30898C10.4999 5.51523 10.4249 5.69336 10.2749 5.84336L8.1186 7.99961H12.7499C13.7874 7.99961 14.6717 8.36523 15.403 9.09648C16.1342 9.82773 16.4999 10.7121 16.4999 11.7496V13.9996C16.4999 14.2121 16.428 14.3902 16.2842 14.534C16.1405 14.6777 15.9624 14.7496 15.7499 14.7496C15.5374 14.7496 15.3592 14.6777 15.2155 14.534C15.0717 14.3902 14.9999 14.2121 14.9999 13.9996V11.7496C14.9999 11.1246 14.7811 10.5934 14.3436 10.1559C13.9061 9.71836 13.3749 9.49961 12.7499 9.49961H8.1186Z"
          fill="#344BFF"
        />
      </g>
    </svg>
  );
};

const DetailsEmail = ({
  emailId,
  token,
}: {
  emailId: string;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const response = await getEmailDetails(token, emailId);
        setEmailDetails({
          subject: response.data.subject,
          fromEmail: response.data.fromEmail,
          fromName: response.data.fromName,
          receivedDate: response.data.receivedDate,
          bodyHtml: response.data.bodyHtml,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
      icon: (
        <EnterOutlined
          className="rotate-x-180"
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "reenviar",
      label: "Reenviar",
      icon: <SVGReenviar />,
    },
    {
      type: "divider",
    },
    {
      key: "print",
      label: "Imprimir",
      icon: (
        <PrinterOutlined
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Borrar este mensaje",
      icon: (
        <DeleteOutlined
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "traduccion",
      label: "Traducir mensaje",
      icon: (
        <TranslationOutlined
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "postpone",
      label: "Descargar mensaje",
      icon: (
        <DownloadOutlined
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "read",
      label: "Marcar como no leido",
      icon: (
        <MailOutlined
          style={{
            color: "#1D2EB6",
            fontSize: 20,
            width: 20,
            height: 20,
          }}
        />
      ),
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("Menu item clicked:", e.key);
    if (e.key === "reply") {
      setShowReplyModal(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 rounded-t-lg bg-[#EBF4FF]">
        <div className="space-x-10">
          <Button
            type="text"
            icon={
              <ArrowLeftOutlined
                style={{
                  color: "#1D2EB6",
                  fontSize: 20,
                  width: 20,
                  height: 20,
                }}
              />
            }
            onClick={() => router.back()}
          />
          <Button
            type="text"
            icon={
              <DeleteOutlined
                style={{
                  color: "#1D2EB6",
                  fontSize: 20,
                  width: 20,
                  height: 20,
                }}
              />
            }
            //     onClick={() => router.back()}
          />
        </div>

        <div className="flex items-center space-x-2">
          <p>1 de 20</p>
          <Button
            type="text"
            icon={
              <LeftOutlined
                style={{
                  color: "#1D2EB6",
                  fontSize: 15,
                  width: 15,
                  height: 15,
                }}
              />
            }
            //     onClick={() => router.back()}
          />
          <Button
            type="text"
            icon={
              <RightOutlined
                style={{
                  color: "#1D2EB6",
                  fontSize: 15,
                  width: 15,
                  height: 15,
                }}
              />
            }
            //     onClick={() => router.back()}
          />
        </div>
      </div>

      {loading ? (
        <SpinerGlobal />
      ) : (
        <div className="p-5 space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#1D2EB6]">
              {emailDetails.subject}
            </h1>
            <div className="flex items-center gap-2 justify-between">
              <span className="text-sm text-gray-500">
                {formatoDeFechaYHora(new Date(emailDetails.receivedDate))}
              </span>

              <Button
                type="text"
                icon={
                  <EnterOutlined
                    className="rotate-x-180"
                    style={{
                      color: "#1D2EB6",
                      fontSize: 20,
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                onClick={() => setShowReplyModal(true)}
                className="hover:bg-gray-100"
              />
              <Dropdown
                menu={{ items: menuItems, onClick: handleMenuClick }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={
                    <MoreOutlined
                      style={{
                        color: "#1D2EB6",
                        fontSize: 20,
                        width: 20,
                        height: 20,
                      }}
                    />
                  }
                  className="hover:bg-gray-100"
                />
              </Dropdown>
            </div>
          </div>

          <div className="space-y-2 border border-[#344BFF] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1D2EB6]">De:</span>
              <span className="text-sm font-bold">{emailDetails.fromName}</span>
              <span className="text-sm text-gray-500">
                ({emailDetails.fromEmail})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1D2EB6]">Para:</span>
              <span className="text-sm font-bold">{emailDetails.subject}</span>
              <span className="text-sm text-gray-500">
                ({emailDetails.fromEmail})
              </span>
            </div>
          </div>

          {/* Email Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-full mx-auto">
              <div className="bg-white rounded-lg border border-[#344BFF] p-8 shadow-sm">
                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: emailDetails.bodyHtml }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  className="!font-bold !py-7 !rounded-full w-44"
                  onClick={() => setShowReplyModal(true)}
                >
                  <EnterOutlined className="rotate-x-180 mr-2" />
                  Responder
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  className="!font-bold !py-7 !rounded-full w-44"
                  onClick={() => console.log("Reenviar")}
                >
                  <SVGReenviar />
                  Reenviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reply Modal/Drawer */}
      {showReplyModal && (
        <SendEmail
          type="reply"
          setModal={setShowReplyModal}
          subject={emailDetails.subject}
        />
      )}
    </div>
  );
};

export default DetailsEmail;
