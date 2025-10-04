import React from "react";
import { handleConnectService } from "../../services/emails/emails";
import { useEmails } from "./hooks/useEmails";
import { ICuentaGmail } from "@/interfaces/interfacesAuth";
import { useRouter } from "next/navigation";
import HeaderEmails from "./HeaderEmails";
import ListEmails from "./ListEmails";
import ConnectAccountEmail from "./ConnectAccountEmail";
import Image from "next/image";

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
        handleConnectService={handleAccountChange}
        handleViewAll={handleViewAll}
        conectEmail={conectEmail}
      />
      <div>
        {list.total === 0 && searchTerm !== "" ? (
          <div className="w-full space-y-5 mx-auto flex flex-col items-center">
            <Image
              src="/email-error.svg"
              width={5000}
              height={5000}
              alt="imagen"
              className="w-[369px] h-[227px]"
            />
            <p className="text-base">
              No se encontraron emails con el termino: {searchTerm}
            </p>
          </div>
        ) : list.total === 0 ? (
          <ConnectAccountEmail conectEmail={conectEmail} />
        ) : (
          <ListEmails
            handleSync={handleSync}
            list={list}
            initLoading={initLoading}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            router={router}
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
            handleCheck={handleCheck}
            selectedCuentaGmailId={selectedCuentaGmailId}
          />
        )}
      </div>
    </div>
  );
};

export default MyEmails;
