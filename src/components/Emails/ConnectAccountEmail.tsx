import React from "react";
import { Button } from "antd";

const ConnectAccountEmail = ({
  conectEmail,
}: {
  conectEmail: () => Promise<void>;
}) => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <p>Conecta una cuenta Gmail para ver tus emails</p>
      <Button type="primary" onClick={conectEmail}>
        Conectar cuenta Gmail
      </Button>
    </div>
  );
};

export default ConnectAccountEmail;
