import CalendarioPage from "@/components/Calendar/ViewCalendarPage";
import React, { Suspense } from "react";

const CalendarPage = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CalendarioPage />
    </Suspense>
  );
};

export default CalendarPage;
