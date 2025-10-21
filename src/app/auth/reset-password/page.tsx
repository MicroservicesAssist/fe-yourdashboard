import RestablecerContraseña from "@/components/Auth/RestablecerContraseña";
import React, { Suspense } from "react";
import { Spin } from "antd";

const ResetPassword = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <RestablecerContraseña />
    </Suspense>
  );
};

export default ResetPassword;
