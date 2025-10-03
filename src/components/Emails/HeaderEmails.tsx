import React from "react";
import { Button, Input, MenuProps, Dropdown, Space } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { ICuentaGmail } from "@/interfaces/interfacesAuth";

const HeaderEmails = ({
  openSearch,
  setOpenSearch,
  handleCheck,
  handleSearchTermChange,
  cuentasGmail,
  viewAll,
  selectedCuentaGmailId,
}: {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheck: (value: string) => void;
  handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cuentasGmail: ICuentaGmail[];
  viewAll: boolean;
  selectedCuentaGmailId: string | null;
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          1st menu item
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          2nd menu item
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl !font-bold !text-blue-800 m-auto">
            Mis correos
          </h1>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="bg-blue-200 rounded-full p-1">
                <Image
                  width={15}
                  height={15}
                  src="/arrow-donw.svg"
                  alt="email"
                />
              </Space>
            </a>
          </Dropdown>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center w-full">
            {openSearch ? (
              <Input.Search
                allowClear
                placeholder="Buscar..."
                onChange={handleSearchTermChange}
                onSearch={handleCheck}
                size="large"
              />
            ) : (
              <Button
                color="primary"
                variant="outlined"
                icon={<SearchOutlined />}
                size="large"
                onClick={() => setOpenSearch(true)}
              />
            )}
          </div>

          <Button size="large" type="primary">
            Nuevo correo
          </Button>
        </div>
      </div>
      <p className="-mt-3 text-gray-500 font-medium">
        {" "}
        {viewAll ? "Todos los correos" : `Correos de la cuenta: `}
        {cuentasGmail.find((c) => selectedCuentaGmailId?.includes(c.id))
          ?.emailGmail || ""}{" "}
      </p>
    </div>
  );
};

export default HeaderEmails;
