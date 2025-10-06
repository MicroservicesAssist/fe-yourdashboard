import ViewEmails from "@/components/Emails/ViewEmails";
import React, { use } from "react";
type PageProps = {
  params: Promise<{ id: string }>;
};

const EmailDetails = ({ params }: PageProps) => {
  const { id } = use(params);
  return <ViewEmails emailId={id} />;
};

export default EmailDetails;
