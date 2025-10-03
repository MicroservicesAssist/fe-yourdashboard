import React from "react";
import { Button, List, Skeleton, Pagination } from "antd";
import { IDataEmail } from "@/interfaces/interfacesEmails";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
    align: "right",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sydney No. 1 Lake Park",
  },
];

const ListEmails = ({
  list,
  initLoading,
  page,
  limit,
  setPage,
  setLimit,
  router,
}: {
  list: IDataEmail;
  initLoading: boolean;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  router: AppRouterInstance;
}) => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      bordered
      title={() => "Header"}
    />
    // <div style={{ gap: "56px", display: "flex", flexDirection: "column" }}>
    //   <List
    //     className="demo-loadmore-list"
    //     loading={initLoading}
    //     itemLayout="horizontal"
    //     dataSource={list.emails}
    //     renderItem={(item) => (
    //       <List.Item>
    //         <Skeleton avatar title={false} loading={false} active>
    //           <List.Item.Meta
    //             // avatar={<Avatar src={item.avatar} />}
    //             title={item.name}
    //             description={item.subject}
    //           />
    //           <Button
    //             type="primary"
    //             onClick={() => router.push(`/dashboard/email/${item.id}`)}
    //           >
    //             Leer mail
    //           </Button>
    //         </Skeleton>
    //       </List.Item>
    //     )}
    //   />
    //   <Pagination
    //     total={list.total}
    //     showTotal={(total) => `Total ${total} emails`}
    //     defaultCurrent={page}
    //     pageSize={limit}
    //     onChange={(page, limit) => {
    //       setPage(page);
    //       setLimit(limit);
    //     }}
    //   />
    // </div>
  );
};

export default ListEmails;
