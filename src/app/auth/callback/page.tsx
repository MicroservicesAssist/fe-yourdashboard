import AuthCallbackPage from "@/components/Auth/AuthCallbackPage";
import { Suspense } from "react";
import { Spin } from "antd";

const CallbackPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <AuthCallbackPage />
    </Suspense>
  );
};

export default CallbackPage;
