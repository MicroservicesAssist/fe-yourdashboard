"use client";
import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { forgotPassword } from "../../services/auth/auth";
import { useRouter } from "next/navigation";
import { IFormLogin } from "@/interfaces/interfacesAuth";
import Title from "antd/es/typography/Title";
import { SpinerGlobal, useCargando } from "@/utils/cargando";

const OlvidasteContraseña = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    type: "error" | "success" | "info" | "warning" | undefined;
  }>({
    message: "",
    type: undefined,
  });
  const router = useRouter();
  const [form] = Form.useForm();
  const { loading } = useCargando();
  if (loading) return <SpinerGlobal />;

  const onFinish = async (values: IFormLogin) => {
    setLoadingButton(true);
    try {
      const response = await forgotPassword(values.email, setAlertMessage);
      if (response) {
        setAlertMessage({
          message: response.message,
          type: "success",
        });
      }
      setLoadingButton(false);
    } catch (error) {
      console.error("Error en login:", error);
      setLoadingButton(false);
    } finally {
      setLoadingButton(false);
    }
  };
  return (
    <div className="my-20 w-1/2 flex flex-col justify-center items-center m-auto shadow-xl gap-y-10 rounded-xl p-10">
      <Title level={3} className=" !text-blue-900 !font-bold !text-center">
        Olvidaste tu contraseña
      </Title>

      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="w-full gap-8 flex flex-col items-start !px-10"
      >
        <Form.Item
          className="w-full"
          name="email"
          rules={[{ required: true, message: "Por favor ingrese su email" }]}
          label={
            <span className="!text-blue-800 !font-bold text-base">
              Correo electrónico
            </span>
          }
        >
          <Input
            style={{ padding: "10px 12px" }}
            prefix={<MailOutlined className="!text-blue-900" />}
            size="large"
            placeholder="usuario@gmail.com"
            color="primary"
          />
        </Form.Item>

        <Form.Item shouldUpdate className="w-full">
          {() => (
            <Button
              loading={loadingButton}
              block
              type="primary"
              htmlType="submit"
              size="large"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().some(({ errors }) => errors.length > 0)
              }
              className="!font-semibold hover:!bg-blue-800 disabled:!bg-gray-400 disabled:!text-gray-700"
            >
              Enviar correo
            </Button>
          )}
        </Form.Item>
      </Form>
      {alertMessage.message && (
        <Alert
          message={
            alertMessage.type === "success"
              ? "Correo enviado"
              : "Error al enviar correo"
          }
          description={alertMessage.message}
          type={alertMessage.type}
          showIcon
          action={
            <div className="!space-x-2">
              {alertMessage.type === "success" && (
                <Button
                  size="small"
                  onClick={() => {
                    router.push("/");
                    setAlertMessage({ message: "", type: undefined });
                  }}
                >
                  Volver a inicio
                </Button>
              )}
              <Button
                size="small"
                onClick={() => {
                  setAlertMessage({ message: "", type: undefined });
                }}
              >
                Cerrar
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default OlvidasteContraseña;
