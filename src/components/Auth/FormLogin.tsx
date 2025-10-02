"use client";
import React from "react";
import {
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { login } from "../../services/auth/auth";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { IFormLogin } from "@/interfaces/interfacesAuth";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

const FormLogin = () => {
  const router = useRouter();
  const { saveToken } = useAuth();
  const { setUserProfile } = useAuthStore();
  const [form] = Form.useForm();

  const onFinish = async (values: IFormLogin) => {
    try {
      const response = await login(values.email, values.password);
      if (response && response.token) {
        console.log("response", response);

        saveToken(response.token);
        setUserProfile(response);

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="gap-8 flex flex-col items-start"
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
      <Form.Item
        className="w-full"
        name="password"
        label={
          <span className="!text-blue-800 !font-bold text-base">
            Contraseña
          </span>
        }
        rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}
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

      <Button
        type="link"
        color="primary"
        size="large"
        className="!text-blue-600 hover:scale-95 !font-bold !text-start -mt-10"
        onClick={() => router.push("/auth/forgot-password")}
      >
        Olvidaste tu contraseña
      </Button>

      <Image src="/separador-forms.svg" alt="Logo" width={1000} height={100} />

      <Button
        type="default"
        size="large"
        className="w-2/3 mx-auto !font-semibold hover:!bg-gray-400 !bg-gray-200 !text-gray-700 hover:!text-gray-900 hover:!border-gray-400 disabled:!bg-gray-400 disabled:!text-gray-700"
      >
        <Image src="/google-logo.svg" alt="Logo" width={18} height={18} />
        Continuar con Google
      </Button>

      <Form.Item shouldUpdate className="w-full">
        {() => (
          <Button
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
            Iniciar Sesión
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
