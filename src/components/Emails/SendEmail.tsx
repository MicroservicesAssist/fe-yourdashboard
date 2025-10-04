import React from "react";
import { Button, Form, FormProps, Input } from "antd";
import {
  ArrowsAltOutlined,
  CloseOutlined,
  MinusOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const SendEmail = ({
  type,
  setModal,
}: {
  type: "new" | "reply" | "forward";
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const [fullScreen, setFullScreen] = React.useState(false);
  const [minScreen, setMinScreen] = React.useState(false);

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
    setMinScreen(false);
  };
  const handleMinScreen = () => {
    setMinScreen(!minScreen);
    setFullScreen(false);
  };
  return (
    <div
      className={`${
        fullScreen &&
        "px-20 py-10 w-full h-full bg-black/50 fixed top-0 left-0 !z-[9999] flex items-center justify-center"
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
          <h3 className="text-base font-semibold text-[#1D2EB6]">
            {type === "new"
              ? "Mensaje nuevo"
              : type === "reply"
              ? "Responder a "
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
                    { required: true, message: "Please input your username!" },
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
                    { required: true, message: "Please input your username!" },
                  ]}
                  className="!px-5"
                >
                  <Input size="large" />
                </Form.Item>
              </>
            )}

            {/* Message Input */}
            <div className="border border-gray-200 rounded-xl flex-1 px-4 py-3">
              <textarea
                className="w-full h-full border-none outline-none resize-none text-sm text-gray-700"
                placeholder="Mensaje..."
              />
            </div>

            {/* Toolbar */}
            {/* <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button type="text" size="small" className="text-gray-600">
                  B
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  I
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  U
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Button type="text" size="small" className="text-gray-600">
                  📎
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  🖼️
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  🔗
                </Button>
              </div>
            </div> */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button type="text" size="small" className="text-gray-600">
                  B
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  I
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  U
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Button type="text" size="small" className="text-gray-600">
                  📎
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  🖼️
                </Button>
                <Button type="text" size="small" className="text-gray-600">
                  🔗
                </Button>
              </div>
              <Form.Item label={null}>
                <Button type="primary" size="large" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SendEmail;
