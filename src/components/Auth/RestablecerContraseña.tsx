"use client";
import React, { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { resetPassword } from "../../services/auth/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { IResetPassword } from "@/interfaces/interfacesAuth";
import Title from "antd/es/typography/Title";
import { SpinerGlobal, useCargando } from "@/utils/cargando";

const RestablecerContraseña = () => {
  const searchParams = useSearchParams();
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
  const token = searchParams.get("token");

  if (loading) return <SpinerGlobal />;

  const onFinish = async (values: IResetPassword) => {
    setLoadingButton(true);
    try {
      const response = await resetPassword(
        {
          token: token || "",
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        setAlertMessage
      );
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
        Crea una nueva contraseña
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
          name="newPassword"
          label={
            <span className="!text-blue-800 !font-bold text-base">
              Nueva contraseña
            </span>
          }
          rules={[
            { required: true, message: "Por favor ingrese su contraseña" },
          ]}
        >
          <Input.Password
            style={{ padding: "10px 12px" }}
            prefix={<LockOutlined className="!text-blue-900" />}
            size="large"
            placeholder="Contraseña"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone twoToneColor="#1D2EB6" /> // azul
              ) : (
                <EyeInvisibleOutlined style={{ color: "#1D2EB6" }} /> // azul
              )
            }
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="confirmPassword"
          label={
            <span className="!text-blue-800 !font-bold text-base">
              Confirma tu nueva contraseña
            </span>
          }
          rules={[
            { required: true, message: "Por favor ingrese su contraseña" },
          ]}
        >
          <Input.Password
            style={{ padding: "10px 12px" }}
            prefix={<LockOutlined className="!text-blue-900" />}
            size="large"
            placeholder="Contraseña"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone twoToneColor="#1D2EB6" /> // azul
              ) : (
                <EyeInvisibleOutlined style={{ color: "#1D2EB6" }} /> // azul
              )
            }
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
              Cambiar contraseña
            </Button>
          )}
        </Form.Item>
      </Form>
      {alertMessage.message && (
        <Alert
          message={
            alertMessage.type === "success"
              ? "Contraseña restablecida con éxito"
              : "Error al restablecer contraseña"
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
                    router.push("/auth");
                    setAlertMessage({ message: "", type: undefined });
                  }}
                >
                  Ir a Iniciar sesión
                </Button>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};

export default RestablecerContraseña;
