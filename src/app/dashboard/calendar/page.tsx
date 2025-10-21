import CalendarioPage from "@/components/Calendar/ViewCalendarPage";
import React, { Suspense } from "react";
import { Spin } from "antd";

const CalendarPage = () => {
  return (
    <Suspense
      fallback={
        <div className="loading-screen">
          <div className="loading-content">
            <Spin size="large" />
            <h3>Cargando calendario...</h3>
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
      }
    >
      <CalendarioPage />
    </Suspense>
  );
};

export default CalendarPage;
