import React from "react";
import { Button } from "antd";
import Image from "next/image";

const ConnectAccountEmail = ({
  conectEmail,
}: {
  conectEmail: () => Promise<void>;
}) => {
  return (
    <div className="w-full space-y-5 mx-auto flex flex-col items-center">
      <Image
        src="/email-error.svg"
        width={5000}
        height={5000}
        alt="imagen"
        className="w-[369px] h-[227px]"
      />
      <p className="text-base">Aun no tienes correos.</p>
      <Button size="large" type="primary" onClick={conectEmail}>
        Vincular correo
      </Button>
    </div>
  );
};

export default ConnectAccountEmail;
