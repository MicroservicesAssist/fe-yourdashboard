import React, { useState } from "react";
import {
  Button,
  List,
  Skeleton,
  Pagination,
  Card,
  Input,
  MenuProps,
  Dropdown,
  Space,
} from "antd";

import { handleConnectService } from "../../services/emails/emails";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { useEmails } from "./hooks/useEmails";
import TabsTest from "./Tabs";
import { ICuentaGmail } from "@/interfaces/interfacesAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ListEmails = ({
  userId,
  token,
  cuentasGmail,
}: {
  userId: number;
  token: string;
  cuentasGmail: ICuentaGmail[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    initLoading,
    list,
    setPage,
    setLimit,
    page,
    limit,
    handleAccountChange,
    handleSync,
    handleSearchTermChange,
    selectedCuentaGmailId,
    handleCheck,
    searchTerm,
    viewAll,
    handleViewAll,
  } = useEmails(cuentasGmail, userId);
  //console.log("list", list);
  //console.log("cuentasGmail", cuentasGmail);

  const conectEmail = async () => {
    await handleConnectService(token);
  };

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
    <div className="flex flex-col gap-4 border-2 border-red-400">
      <div className="flex">
        <h1 className="text-3xl !m-auto !font-bold !text-blue-800">
          Mis correos
        </h1>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="bg-blue-200 rounded-full p-2">
              <Image width={15} height={15} src="/arrow-donw.svg" alt="email" />
            </Space>
          </a>
        </Dropdown>
      </div>
      <p className="text-gray-500 font-medium">
        {" "}
        {viewAll ? "📧 Todos los emails" : `Emails: `}
        {cuentasGmail.find((c) => selectedCuentaGmailId?.includes(c.id))
          ?.emailGmail || ""}{" "}
        ({list.total})
      </p>
      {cuentasGmail.length !== 0 ? (
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>
                📧 Cuentas de Gmail conectadas
                <span> ({cuentasGmail.length})</span>
              </h4>
              {cuentasGmail.length > 1 && (
                <Button type="primary" onClick={handleViewAll}>
                  Ver todos los emails
                </Button>
              )}
              <div style={{ display: "flex", gap: "16px" }}>
                <Button type="primary" onClick={conectEmail}>
                  Conectar mas de una cuenta
                </Button>
                {open ? (
                  <Button onClick={() => setOpen(false)}>
                    Ocultar lista de emails
                    <UpOutlined />
                  </Button>
                ) : (
                  <Button onClick={() => setOpen(true)}>
                    Ver lista de emails
                    <DownOutlined />
                  </Button>
                )}
              </div>
            </div>
          }
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          {open && (
            <TabsTest
              data={cuentasGmail}
              handleConnectService={handleAccountChange}
              handleSync={handleSync}
            />
          )}
        </Card>
      ) : (
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>📧 Cuentas de Gmail conectadas</h4>
              <Button type="primary" onClick={conectEmail}>
                Conectar cuenta Gmail
              </Button>
            </div>
          }
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          <p>No hay cuentas de Gmail conectadas</p>
        </Card>
      )}
      <Card
        title={
          <div
            style={{
              marginBottom: "16px",
            }}
          >
            {/* <h4>
              {viewAll ? "📧 Todos los emails" : `📧 Emails: `}
              {cuentasGmail.find((c) => selectedCuentaGmailId?.includes(c.id))
                ?.emailGmail || ""}{" "}
              ({list.total})
            </h4> */}
            <div style={{ display: "flex", gap: "50px" }}>
              <Input.Search
                allowClear
                placeholder="Buscar..."
                onChange={handleSearchTermChange}
                onSearch={handleCheck}
                enterButton
              />
            </div>
          </div>
        }
        style={{ flex: 1 }}
      >
        {list.total === 0 && searchTerm !== "" ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>No se encontraron emails con el termino: {searchTerm}</p>
          </div>
        ) : list.total === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p>Conecta una cuenta Gmail para ver tus emails</p>
            <Button type="primary" onClick={conectEmail}>
              Conectar cuenta Gmail
            </Button>
          </div>
        ) : (
          <div
            style={{ gap: "56px", display: "flex", flexDirection: "column" }}
          >
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list.emails}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      // avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                      description={item.subject}
                    />
                    <Button
                      type="primary"
                      onClick={() => router.push(`/dashboard/email/${item.id}`)}
                    >
                      Leer mail
                    </Button>
                  </Skeleton>
                </List.Item>
              )}
            />
            <Pagination
              total={list.total}
              showTotal={(total) => `Total ${total} emails`}
              defaultCurrent={page}
              pageSize={limit}
              onChange={(page, limit) => {
                setPage(page);
                setLimit(limit);
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ListEmails;
