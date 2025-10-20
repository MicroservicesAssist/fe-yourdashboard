"use client";

import React, { useState } from "react";
import {
  Card,
  Tabs,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  Modal,
  Upload,
  Select,
  message,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CameraOutlined,
  UploadOutlined,
  WhatsAppOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { TabsProps, UploadProps } from "antd";

const ProfileClient = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [isCloseSessionModalVisible, setIsCloseSessionModalVisible] =
    useState(false);

  // Mock data
  const [userData] = useState({
    nombre: "Nombres Apellidos",
    telefono: "00000000",
    email: "usuario@gmail.com",
    rol: "Jefe",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveEdit = () => {
    setIsEditMode(false);
    setIsSaveModalVisible(true);
  };

  const uploadProps: UploadProps = {
    name: "file",
    accept: "image/png,image/jpeg",
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || file.type === "image/jpeg";
      if (!isPNG) {
        message.error("Solo puedes subir archivos PNG o JPG!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("La imagen debe ser menor a 2MB!");
      }
      return false;
    },
  };

  const MisDatosViewMode = () => (
    <div style={{ padding: "40px 0 40px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "60px",
        }}
      >
        <Avatar
          size={120}
          style={{
            backgroundColor: "#2F54EB",
            fontSize: "48px",
            fontWeight: "600",
          }}
        >
          NA
        </Avatar>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEditClick}
          style={{
            position: "absolute",
            right: "calc(50% - 200px)",
            borderRadius: "6px",
            height: "40px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Editar
        </Button>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#2F54EB",
              }}
            >
              Nombre Completo
            </label>
          </div>
          <Input
            prefix={<UserOutlined style={{ color: "#2F54EB" }} />}
            placeholder="Nombres Apellidos"
            value={userData.nombre}
            disabled
            style={{
              height: "45px",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5",
            }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#2F54EB",
              }}
            >
              Numero de celular
            </label>
          </div>
          <Input
            prefix={<PhoneOutlined style={{ color: "#2F54EB" }} />}
            placeholder="Nombres Apellidos"
            value={userData.telefono}
            disabled
            style={{
              height: "45px",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5",
            }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#2F54EB",
              }}
            >
              Correo electrónico
            </label>
          </div>
          <Input
            prefix={<MailOutlined style={{ color: "#2F54EB" }} />}
            placeholder="usuario@gmail.com"
            value={userData.email}
            disabled
            style={{
              height: "45px",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5",
            }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#2F54EB",
              }}
            >
              Rol
            </label>
          </div>
          <Input
            prefix={<IdcardOutlined style={{ color: "#2F54EB" }} />}
            placeholder="Jefe"
            value={userData.rol}
            disabled
            style={{
              height: "45px",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5",
            }}
          />
        </Col>
      </Row>
    </div>
  );

  const MisDatosEditMode = () => (
    <div style={{ padding: "40px 0 40px 0" }}>
      <p style={{ color: "#595959", marginBottom: "24px" }}>
        Cambia tu información personal de manera rápida y segura.
      </p>

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar
            size={100}
            style={{
              backgroundColor: "#2F54EB",
              fontSize: "40px",
              fontWeight: "600",
            }}
          >
            NA
          </Avatar>
          <Button
            type="primary"
            shape="circle"
            icon={<CameraOutlined />}
            onClick={() => setIsPhotoModalVisible(true)}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "36px",
              height: "36px",
            }}
          />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "600", color: "#2F54EB" }}
            >
              Nombre Completo
            </label>
          </div>
          <Input
            prefix={<UserOutlined style={{ color: "#2F54EB" }} />}
            placeholder="Nombre Apellido"
            defaultValue={userData.nombre}
            style={{ height: "40px", borderRadius: "6px" }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "600", color: "#2F54EB" }}
            >
              Numero de celular
            </label>
          </div>
          <Input
            prefix={<PhoneOutlined style={{ color: "#2F54EB" }} />}
            placeholder="00000000"
            defaultValue={userData.telefono}
            style={{ height: "40px", borderRadius: "6px" }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "600", color: "#2F54EB" }}
            >
              Correo electrónico
            </label>
          </div>
          <Input
            prefix={<MailOutlined style={{ color: "#2F54EB" }} />}
            placeholder="usuario@gmail.com"
            defaultValue={userData.email}
            disabled
            style={{
              height: "40px",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5",
            }}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "600", color: "#2F54EB" }}
            >
              Rol
            </label>
          </div>
          <Select
            defaultValue={userData.rol}
            style={{ width: "100%", height: "40px" }}
            options={[
              { value: "Jefe", label: "Jefe" },
              { value: "Supervisor", label: "Supervisor" },
              { value: "Empleado", label: "Empleado" },
            ]}
          />
        </Col>
      </Row>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleCancelEdit}
          style={{ borderRadius: "6px", height: "40px" }}
        >
          Cancelar
        </Button>
        <Button
          type="primary"
          onClick={handleSaveEdit}
          style={{ borderRadius: "6px", height: "40px" }}
        >
          Guardar
        </Button>
      </div>
    </div>
  );

  const CuentasVinculadasContent = () => (
    <div style={{ padding: "40px 0" }}>
      <Row gutter={[24, 24]}>
        {/* Email Card */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #E8E8E8",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor: "#E6F7FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailOutlined style={{ fontSize: "24px", color: "#2F54EB" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2F54EB",
                  }}
                >
                  Correo electrónico
                </h3>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    color: "#595959",
                  }}
                >
                  usuario@gmail.com
                </p>
                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginBottom: "4px",
                    }}
                  >
                    Nombre de la plataforma
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Este dispositivo
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Asistente de Panchito
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Estado de la cuenta
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Sesion activa
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Historial de correo
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    Sincronizado
                  </div>
                </div>
                <Button
                  danger
                  onClick={() => setIsCloseSessionModalVisible(true)}
                  style={{
                    marginTop: "16px",
                    borderRadius: "6px",
                    width: "100%",
                  }}
                >
                  Cerrar Sesion
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* WhatsApp Card */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #E8E8E8",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor: "#F6FFED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WhatsAppOutlined
                  style={{ fontSize: "24px", color: "#52C41A" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2F54EB",
                  }}
                >
                  Whatsapp
                </h3>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    color: "#595959",
                  }}
                >
                  00000000
                </p>
                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginBottom: "4px",
                    }}
                  >
                    Nombre de la plataforma
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Este dispositivo
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Estado de la cuenta
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Sesion activa
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Historial de chats
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    Sincronizado
                  </div>
                </div>
                <Button
                  danger
                  onClick={() => setIsCloseSessionModalVisible(true)}
                  style={{
                    marginTop: "16px",
                    borderRadius: "6px",
                    width: "100%",
                  }}
                >
                  Cerrar Sesion
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* Second Email Card */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #E8E8E8",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor: "#E6F7FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailOutlined style={{ fontSize: "24px", color: "#2F54EB" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#2F54EB",
                  }}
                >
                  Correo electrónico
                </h3>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    color: "#595959",
                  }}
                >
                  usuario23@gmail.com
                </p>
                <div style={{ marginTop: "12px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginBottom: "4px",
                    }}
                  >
                    Nombre de la plataforma
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Este dispositivo
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Estado de la cuenta
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    • Sesion activa
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8C8C8C",
                      marginTop: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    Historial de correo
                  </div>
                  <div style={{ fontSize: "13px", color: "#262626" }}>
                    Sincronizado
                  </div>
                </div>
                <Button
                  danger
                  onClick={() => setIsCloseSessionModalVisible(true)}
                  style={{
                    marginTop: "16px",
                    borderRadius: "6px",
                    width: "100%",
                  }}
                >
                  Cerrar Sesion
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Vincular cuenta button */}
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: "6px",
            height: "45px",
            fontSize: "14px",
            fontWeight: "500",
            minWidth: "180px",
          }}
        >
          Vincular cuenta
        </Button>
      </div>
    </div>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UserOutlined />
          Mis datos
        </span>
      ),
      children: isEditMode ? <MisDatosEditMode /> : <MisDatosViewMode />,
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IdcardOutlined />
          Cuentas vinculadas
        </span>
      ),
      children: <CuentasVinculadasContent />,
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#2F54EB",
            marginBottom: "8px",
          }}
        >
          Perfil
        </h1>
        <p style={{ fontSize: "14px", color: "#595959", margin: 0 }}>
          Administra tu información personal y las cuentas vinculadas a tu
          usuario.
        </p>
      </div>

      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Tabs
          activeKey={activeTab}
          items={items}
          onChange={(key) => {
            setActiveTab(key);
            setIsEditMode(false);
          }}
          size="large"
        />
      </div>

      {/* Change Photo Modal */}
      <Modal
        title={
          <span
            style={{ fontSize: "18px", fontWeight: "600", color: "#2F54EB" }}
          >
            Cambiar foto de perfil
          </span>
        }
        open={isPhotoModalVisible}
        onCancel={() => setIsPhotoModalVisible(false)}
        footer={null}
        width={500}
      >
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Avatar
            size={100}
            src="https://randomuser.me/api/portraits/men/32.jpg"
            style={{ marginBottom: "24px" }}
          />

          <Upload {...uploadProps} maxCount={1}>
            <div
              style={{
                border: "2px dashed #D9D9D9",
                borderRadius: "8px",
                padding: "40px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <UploadOutlined
                style={{
                  fontSize: "32px",
                  color: "#2F54EB",
                  marginBottom: "8px",
                }}
              />
              <div style={{ fontSize: "14px", color: "#595959" }}>
                Haz clic para subir o arrastralo aquí
              </div>
              <div
                style={{ fontSize: "12px", color: "#8C8C8C", marginTop: "4px" }}
              >
                PNG o JPG
              </div>
              <div style={{ fontSize: "12px", color: "#8C8C8C" }}>
                Max. 200x200px
              </div>
            </div>
          </Upload>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Button
            onClick={() => setIsPhotoModalVisible(false)}
            style={{ borderRadius: "6px", height: "40px" }}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            onClick={() => setIsPhotoModalVisible(false)}
            style={{ borderRadius: "6px", height: "40px" }}
          >
            Guardar
          </Button>
        </div>
      </Modal>

      {/* Save Changes Modal */}
      <Modal
        open={isSaveModalVisible}
        onCancel={() => setIsSaveModalVisible(false)}
        footer={null}
        width={450}
        closable={true}
      >
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <CheckCircleOutlined
            style={{ fontSize: "48px", color: "#52C41A", marginBottom: "16px" }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#262626",
              marginBottom: "8px",
            }}
          >
            ¡Perfil actualizado!
          </h3>
          <p
            style={{ fontSize: "14px", color: "#595959", marginBottom: "24px" }}
          >
            Los cambios en tu perfil se han guardado correctamente.
          </p>
        </div>
      </Modal>

      {/* Close Session Modal */}
      <Modal
        title={
          <span
            style={{ fontSize: "18px", fontWeight: "600", color: "#2F54EB" }}
          >
            Cerrar Sesion
          </span>
        }
        open={isCloseSessionModalVisible}
        onCancel={() => setIsCloseSessionModalVisible(false)}
        footer={null}
        width={450}
      >
        <p style={{ fontSize: "14px", color: "#595959", marginBottom: "24px" }}>
          Quieres cerrar la sesion de esta plataforma?
        </p>

        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <Button
            onClick={() => setIsCloseSessionModalVisible(false)}
            style={{ borderRadius: "6px", height: "40px" }}
          >
            Cancelar
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => setIsCloseSessionModalVisible(false)}
            style={{ borderRadius: "6px", height: "40px" }}
          >
            Cerrar Sesion
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileClient;
