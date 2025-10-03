"use client";
import React from "react";
import { useUserData, useCuentasGmail, useAuth } from "../Auth/hooks/useAuth";
import DetailsEmail from "./DetailsEmail";
import MyEmails from "./MyEmails";

const ViewEmails = ({ emailId }: { emailId?: string }) => {
  const { token } = useAuth();
  const { cuentasGmail } = useCuentasGmail();
  const { userData } = useUserData();

  return (
    <div className="-mt-10 mx-10">
      {emailId ? (
        <DetailsEmail emailId={emailId} token={token} />
      ) : (
        <MyEmails
          userId={userData.id}
          token={token}
          cuentasGmail={cuentasGmail}
        />
      )}
    </div>
  );
};

export default ViewEmails;
