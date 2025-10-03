import React, { useState } from "react";
import { handleConnectService } from "../../services/emails/emails";
import { useEmails } from "./hooks/useEmails";
import { ICuentaGmail } from "@/interfaces/interfacesAuth";
import { useRouter } from "next/navigation";
import HeaderEmails from "./HeaderEmails";
import ListEmails from "./ListEmails";
import SearchEmails from "./SearchEmails";
import ConnectAccountEmail from "./ConnectAccountEmail";

const MyEmails = ({
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
    openSearch,
    setOpenSearch,
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

  const conectEmail = async () => {
    await handleConnectService(token);
  };

  return (
    <div className="flex flex-col gap-4">
      <HeaderEmails
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        handleCheck={handleCheck}
        handleSearchTermChange={handleSearchTermChange}
        cuentasGmail={cuentasGmail}
        viewAll={viewAll}
        selectedCuentaGmailId={selectedCuentaGmailId}
      />
      <div>
        {list.total === 0 && searchTerm !== "" ? (
          <SearchEmails searchTerm={searchTerm} />
        ) : list.total === 0 ? (
          <ConnectAccountEmail conectEmail={conectEmail} />
        ) : (
          <ListEmails
            list={list}
            initLoading={initLoading}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            router={router}
          />
        )}
      </div>
    </div>
  );
};

export default MyEmails;
