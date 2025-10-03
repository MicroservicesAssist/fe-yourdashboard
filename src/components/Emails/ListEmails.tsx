import React, { useState } from "react";
import { IDataEmail, IEmail } from "@/interfaces/interfacesEmails";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button, Table } from "antd";
import type { TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { formatoFechaHoraHoy } from "@/utils/date";
import {
  DeleteOutlined,
  MailOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./styles.css";

const Tabs = ({ onClickSync }: { onClickSync: () => void }) => {
  const columns: TableProps<IEmail>["columns"] = [
    {
      key: "from",
      dataIndex: "from",
      title: (
        <div className="flex items-center gap-2">
          <Button
            type="link"
            icon={
              <ReloadOutlined
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
                className="!text-blue-900"
              />
            }
            onClick={onClickSync}
          />
          <Button
            type="link"
            className="!text-blue-700 !font-medium"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Mostrar como leido");
            }}
          >
            Marcar como leido
          </Button>
        </div>
      ),
      render: (text) => <p className="!font-medium">{text}</p>,
    },
    {
      key: "name",
      dataIndex: "name",
      render: (text) => <p className="!font-bold">{text}</p>,
    },
    {
      key: "subject",
      dataIndex: "subject",
      render: (text) => (
        <p className="!font-medium">
          {" "}
          {text.length > 20 ? text.slice(0, 20) + "..." : text}
        </p>
      ),
    },
    {
      key: "id",
      dataIndex: "id",
      render: (text) => (
        <div className="flex">
          <Button
            type="link"
            size="large"
            icon={
              <MailOutlined
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
                className="!text-blue-900"
              />
            }
            onClick={(e) => {
              e.stopPropagation();
              console.log("Mostrar como leido", text);
            }}
          />
          <Button
            type="link"
            size="large"
            icon={
              <DeleteOutlined
                style={{ fontSize: "20px", width: "20px", height: "20px" }}
                className="!text-blue-900"
              />
            }
            onClick={(e) => {
              e.stopPropagation();
              console.log("Eliminar", text);
            }}
          />
        </div>
      ),
    },
    {
      key: "date",
      dataIndex: "date",
      render: (text) => (
        <p className="opacity-50">{formatoFechaHoraHoy(text)}</p>
      ),
    },
  ];

  return columns;
};

const ListEmails = ({
  list,
  initLoading,
  page,
  limit,
  setPage,
  setLimit,
  router,
  handleSync,
}: {
  list: IDataEmail;
  initLoading: boolean;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  router: AppRouterInstance;
  handleSync: (cuentaGmailId: string) => Promise<void>;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IEmail> = {
    selectedRowKeys,
    onChange: onSelectChange,
    fixed: "left",
  };
  const columns = Tabs({ onClickSync: () => handleSync("1") });

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm ">
      <Table<IEmail>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={list.emails}
        rowKey="id"
        loading={initLoading}
        pagination={{
          className: " !p-2",
          total: list.total,
          showTotal: (total) => `Total ${total} emails`,
          defaultCurrent: page,
          pageSize: limit,
          onChange: (page, limit) => {
            setPage(page);
            setLimit(limit);
          },
        }}
        onRow={(record) => ({
          onClick: () => router.push(`/dashboard/email/${record.id}`),
        })}
        className="custom-email-table"
        onHeaderRow={() => ({ style: { color: "red" } })}
      />
    </div>
  );
};

export default ListEmails;
