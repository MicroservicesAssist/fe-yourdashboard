"use client";
import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FormView, IFormRegister } from "@/interfaces/interfacesAuth";
import { register } from "@/services/auth/auth";
import Image from "next/image";

const FormRegister = ({ setChangeForm }: FormView) => {
  const [form] = Form.useForm();
  const onFinish = async (values: IFormRegister) => {
    const response = await register(
      values.nombre,
      values.email,
      values.password
    );
    if (response) {
      alert("Usuario registrado con éxito. Por favor, inicie sesión.");
      setChangeForm(false);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="gap-8 flex flex-col items-start"
    >
      <Form.Item
        className="w-full"
        name="nombre"
        rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
        label={
          <span className="!text-blue-800 !font-bold text-base">
            Nombre y Apellido
          </span>
        }
      >
        <Input
          prefix={
            <UserOutlined
              style={{ fontSize: "20px", width: "20px", height: "20px" }}
              className="!text-blue-800"
            />
          }
          placeholder="Nombre"
          size="large"
          style={{ padding: "10px 12px" }}
        />
      </Form.Item>

      <Form.Item
        className="w-full"
        name="whatsapp"
        rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
        label={
          <span className="!text-blue-800 !font-bold text-base">
            Numero de Whatsapp
          </span>
        }
      >
        <Input
          prefix={
            <WhatsAppOutlined
              style={{ fontSize: "20px", width: "20px", height: "20px" }}
              className="!text-blue-800"
            />
          }
          placeholder="000000000"
          size="large"
          style={{ padding: "10px 12px" }}
        />
      </Form.Item>
      <Form.Item
        className="w-full"
        label={
          <span className="!text-blue-800 !font-bold text-base">Email</span>
        }
        name="email"
        rules={[{ required: true, message: "Por favor ingrese su email" }]}
      >
        <Input
          style={{ padding: "10px 12px" }}
          prefix={
            <MailOutlined
              style={{ fontSize: "20px", width: "20px", height: "20px" }}
              className="!text-blue-800"
            />
          }
          size="large"
          placeholder="Email"
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
          prefix={
            <LockOutlined
              style={{ fontSize: "20px", width: "20px", height: "20px" }}
              className="!text-blue-900"
            />
          }
          size="large"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
                twoToneColor="#1D2EB6"
              /> // azul
            ) : (
              <EyeInvisibleOutlined
                style={{
                  color: "#1D2EB6",
                  fontSize: "20px",
                  width: "20px",
                  height: "20px",
                }}
              /> // azul
            )
          }
        />
      </Form.Item>

      <Image src="/separador-forms.svg" alt="Logo" width={1000} height={100} />

      <Button
        type="default"
        size="large"
        className="w-full lg:w-2/3 mx-auto !font-semibold hover:!bg-gray-400 !bg-gray-200 !text-gray-700 hover:!text-gray-900 hover:!border-gray-400 disabled:!bg-gray-400 disabled:!text-gray-700"
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
            Registrarse
          </Button>
        )}
      </Form.Item>

      {/* <Form.Item>
        <Button block type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default FormRegister;
