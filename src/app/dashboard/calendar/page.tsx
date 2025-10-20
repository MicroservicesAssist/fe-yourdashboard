"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getMyProfile } from "@/services/auth/auth";
import { message, Spin } from "antd";

import GoogleConnectButton from "@/components/Calendar/GoogleConnectButton";
import EnhancedCalendarView from "@/components/Calendar/EnhancedCalendarView";

export default function CalendarioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    accessToken,
    userProfile,
    setUserProfile,
    clearAuth,
    hasGmailAccounts,
    getActiveGmailAccount,
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [showUnified] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsHydrated(true);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!accessToken) {
      router.push("/auth");
      return;
    }

    const loadProfile = async () => {
      if (!userProfile) {
        try {
          setIsLoading(true);
          const profileData = await getMyProfile();
          setUserProfile(profileData);
        } catch (error) {
          console.error("Error al cargar el perfil:", error);
          clearAuth();
          router.push("/auth");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [isHydrated, accessToken, userProfile, setUserProfile, clearAuth, router]);

  useEffect(() => {
    const successParam = searchParams.get("success");
    const refreshParam = searchParams.get("refresh");

    if (successParam === "true" && refreshParam === "profile") {
      message.success({
        content: "¡Google Calendar conectado exitosamente!",
        duration: 5,
      });

      const reloadProfile = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const updatedProfile = await getMyProfile();
          setUserProfile(updatedProfile);
        } catch (error) {
          console.error("Error recargando perfil:", error);
        }
      };

      reloadProfile();
      router.replace("/dashboard/calendar");
    }
  }, [searchParams, setUserProfile, router]);

  useEffect(() => {
    if (userProfile && hasGmailAccounts() && !selectedAccountId) {
      const activeAccount = getActiveGmailAccount();
      if (activeAccount) {
        setSelectedAccountId(activeAccount.id.toString());
      }
    }
  }, [userProfile, hasGmailAccounts, getActiveGmailAccount, selectedAccountId]);

  if (!isHydrated || isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <Spin size="large" />
          <h3>{!isHydrated ? "Inicializando..." : "Cargando calendario..."}</h3>
          <p>Por favor espera un momento</p>
        </div>

        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafbfc;
          }

          .loading-content {
            text-align: center;
            background: white;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .loading-content h3 {
            margin: 24px 0 8px 0;
            color: #262626;
            font-weight: 600;
          }

          .loading-content p {
            margin: 0;
            color: #8c8c8c;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      {hasGmailAccounts() ? (
        <EnhancedCalendarView
          accountId={showUnified ? undefined : selectedAccountId}
          showUnified={showUnified}
          height={600}
        />
      ) : (
        <div className="connect-state">
          <GoogleConnectButton />
        </div>
      )}

      <style jsx>{`
        .calendar-page {
          min-height: 100vh;
          background: #fafbfc;
        }

        .connect-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
        }
      `}</style>
    </div>
  );
}
