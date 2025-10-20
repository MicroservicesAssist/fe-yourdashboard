// import { useState, useEffect, useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import multiMonthPlugin from "@fullcalendar/multimonth";
// import { Spin, message } from "antd";
// import { CalendarViewProps } from "@/interfaces/interfacesCalendar";
// import dayjs from "dayjs";
// import { useCalendarData } from "./hooks/useCalendarData";
// import { useCalendarEvents } from "./hooks/useCalendarEvents";
// import EventCreateModal from "./EventCreateModal";
// import EventDetailsModal from "./EventDetailsModalNew";
// import { SearchResultsModal } from "./SearchResultsModal";

// const EnhancedCalendarView: React.FC<CalendarViewProps> = ({
//   accountId,
//   showUnified = false,

//   initialView = "timeGridWeek",
// }) => {
//   const calendarRef = useRef<FullCalendar>(null);
//   const [currentDate, setCurrentDate] = useState("");
//   const [viewType, setViewType] = useState("Semana");
//   const [showViewDropdown, setShowViewDropdown] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<any>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [createModalVisible, setCreateModalVisible] = useState(false);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");

//   // Estados para búsqueda
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchModalVisible, setSearchModalVisible] = useState(false);
//   const [lastSearchTerm, setLastSearchTerm] = useState("");

//   const viewOptions = [
//     { label: "Día", value: "timeGridDay" },
//     { label: "Semana", value: "timeGridWeek" },
//     { label: "Mes", value: "dayGridMonth" },
//     { label: "Año", value: "dayGridYear" },
//     { label: "Agenda", value: "listWeek" },
//     { label: "4 días", value: "timeGridFourDay" },
//   ];

//   const {
//     events,
//     loading: loadingEvents,
//     error,
//     loadEvents,
//     hasAccount,
//     searchLoading,
//     searchEvents,
//     clearSearch,
//   } = useCalendarData(accountId, showUnified);

//   const { createEvent, updateEvent, deleteEvent } =
//     useCalendarEvents(accountId);

//   useEffect(() => {
//     if (hasAccount) {
//       const now = dayjs();
//       const startDate = now.subtract(6, "month").startOf("month").toISOString();
//       const endDate = now.add(6, "months").endOf("month").toISOString();
//       console.log("📅 Cargando eventos iniciales:", { startDate, endDate });
//       loadEvents(startDate, endDate);
//     }
//   }, [hasAccount, accountId, showUnified]);

//   useEffect(() => {
//     updateCurrentDate();
//   }, []);

//   const updateCurrentDate = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       const date = calendarApi.getDate();
//       const monthYear = date.toLocaleDateString("es-ES", {
//         month: "long",
//         year: "numeric",
//       });
//       setCurrentDate(monthYear.charAt(0).toUpperCase() + monthYear.slice(1));
//     }
//   };

//   const getViewLabel = (viewValue: string) => {
//     const view = viewOptions.find((v) => v.value === viewValue);
//     return view ? view.label : "Semana";
//   };

//   const handleViewChange = (viewValue: string) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.changeView(viewValue);
//       setViewType(getViewLabel(viewValue));
//       setShowViewDropdown(false);
//       updateCurrentDate();
//     }
//   };

//   const handlePrevious = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     calendarApi?.prev();
//     updateCurrentDate();
//   };

//   const handleNext = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     calendarApi?.next();
//     updateCurrentDate();
//   };

//   const handleToday = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.today();
//       updateCurrentDate();
//     }
//   };

//   const refreshEvents = async () => {
//     if (hasAccount) {
//       const now = dayjs();
//       const startDate = now.subtract(6, "month").startOf("month").toISOString();
//       const endDate = now.add(6, "months").endOf("month").toISOString();
//       await loadEvents(startDate, endDate);
//     }
//   };

//   // Función para buscar eventos
//   const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const term = searchTerm.trim();
//       if (!term) {
//         clearSearch();
//         setSearchModalVisible(false);
//         return;
//       }

//       try {
//         const startDate = dayjs()
//           .subtract(1, "year")
//           .startOf("day")
//           .toISOString();
//         await searchEvents(term, startDate, 1, 50);
//         setLastSearchTerm(term);
//         setSearchModalVisible(true);
//       } catch (error) {
//         console.error("Error en búsqueda:", error);
//         message.error("Error al buscar eventos");
//       }
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (!value) {
//       clearSearch();
//       setSearchModalVisible(false);
//     }
//   };

//   // Función para navegar al evento seleccionado desde la búsqueda
//   const handleEventSelectFromSearch = (event: any) => {
//     setSearchModalVisible(false);
//     setSearchTerm("");

//     // Navegar a la fecha del evento
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi && event.startTime) {
//       const eventDate = new Date(event.startTime);
//       calendarApi.gotoDate(eventDate);

//       // Cambiar a vista de semana si está en mes o año
//       const currentView = calendarApi.view.type;
//       if (currentView === "dayGridMonth" || currentView === "dayGridYear") {
//         calendarApi.changeView("timeGridWeek");
//         setViewType("Semana");
//       }

//       // Mostrar detalles del evento después de un breve delay
//       setTimeout(() => {
//         setSelectedEvent(event);
//         setDetailsModalVisible(true);
//       }, 300);
//     }
//   };

//   const handleDateSelect = (selectInfo: any) => {
//     const startDate = selectInfo.start;
//     setSelectedDate(startDate);
//     setModalMode("create");
//     setSelectedEvent(null);
//     setCreateModalVisible(true);
//   };

//   const handleEventClick = (clickInfo: any) => {
//     const event = {
//       id: clickInfo.event.id,
//       summary: clickInfo.event.title,
//       description: clickInfo.event.extendedProps.description,
//       location: clickInfo.event.extendedProps.location,
//       startTime: clickInfo.event.start?.toISOString() || "",
//       endTime: clickInfo.event.end?.toISOString() || "",
//       attendees: clickInfo.event.extendedProps.attendees,
//       sourceAccount: clickInfo.event.extendedProps.sourceAccount,
//       isAllDay: clickInfo.event.allDay,
//     };
//     setSelectedEvent(event);
//     setDetailsModalVisible(true);
//   };

//   const handleEventDrop = async (dropInfo: any) => {
//     const event = dropInfo.event;
//     try {
//       await updateEvent(event.id, {
//         startDateTime: event.start.toISOString(),
//         endDateTime: event.end.toISOString(),
//       });
//       message.success("Evento movido exitosamente");
//       setTimeout(() => refreshEvents(), 300);
//     } catch (error) {
//       message.error("Error al mover el evento");
//       dropInfo.revert();
//     }
//   };

//   const handleEventResize = async (resizeInfo: any) => {
//     const event = resizeInfo.event;
//     try {
//       await updateEvent(event.id, {
//         startDateTime: event.start.toISOString(),
//         endDateTime: event.end.toISOString(),
//       });
//       message.success("Duración del evento actualizada");
//       setTimeout(() => refreshEvents(), 300);
//     } catch (error) {
//       message.error("Error al cambiar la duración del evento");
//       resizeInfo.revert();
//     }
//   };

//   const handleCreateEvent = async (eventData: any) => {
//     const newEvent = await createEvent(eventData, false);
//     if (newEvent) {
//       setCreateModalVisible(false);
//       message.success("Evento creado exitosamente");
//       setTimeout(() => refreshEvents(), 500);
//     }
//   };

//   const handleUpdateEvent = async (eventData: any) => {
//     if (!selectedEvent) return;
//     const updatedEvent = await updateEvent(selectedEvent.id, eventData);
//     if (updatedEvent) {
//       setCreateModalVisible(false);
//       setDetailsModalVisible(false);
//       setSelectedEvent(null);
//       message.success("Evento actualizado exitosamente");
//       setTimeout(() => refreshEvents(), 500);
//     }
//   };

//   const handleDeleteEvent = async () => {
//     if (!selectedEvent) return;
//     const success = await deleteEvent(selectedEvent.id);
//     if (success) {
//       setDetailsModalVisible(false);
//       setSelectedEvent(null);
//       message.success("Evento eliminado exitosamente");
//       setTimeout(() => refreshEvents(), 500);
//     }
//   };

//   const handleEditClick = () => {
//     setDetailsModalVisible(false);
//     setModalMode("edit");
//     setCreateModalVisible(true);
//   };

//   const handleCreateButtonClick = () => {
//     setSelectedDate(new Date());
//     setModalMode("create");
//     setSelectedEvent(null);
//     setCreateModalVisible(true);
//   };

//   const calendarEvents = events.map((event) => ({
//     id: event.id,
//     title: event.summary || "Sin título",
//     start: event.startTime,
//     end: event.endTime,
//     allDay: event.isAllDay,
//     extendedProps: { ...event },
//   }));

//   console.log("📊 Estado del calendario:", {
//     hasAccount,
//     loadingEvents,
//     eventsCount: events.length,
//     calendarEventsCount: calendarEvents.length,
//   });

//   if (!hasAccount) {
//     return (
//       <div className="no-account-container">
//         <div className="no-account-content">
//           <div className="no-account-icon">📅</div>
//           <h3>No hay cuenta conectada</h3>
//           <p>Conecta una cuenta de Google Calendar para ver tus eventos</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="calendar-container-new">
//         {/* Header */}
//         <div className="calendar-header-new">
//           <div className="header-left-new">
//             <button className="calendar-title-btn-new">
//               Calendario
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//               >
//                 <path
//                   d="M4 6l4 4 4-4"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   fill="none"
//                 />
//               </svg>
//             </button>

//             <div className="month-navigation-new">
//               <button onClick={handlePrevious} className="nav-btn-new">
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                   <path
//                     d="M12 15l-5-5 5-5"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </button>
//               <button onClick={handleNext} className="nav-btn-new">
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                   <path
//                     d="M8 15l5-5-5-5"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />
//                 </svg>
//               </button>
//               <button onClick={handleToday} className="today-btn-new">
//                 Hoy
//               </button>
//               <span className="current-date-new">{currentDate}</span>
//             </div>
//           </div>

//           <div className="header-center-new">
//             <div className="search-box-new">
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 18 18"
//                 fill="none"
//                 className="search-icon-new"
//               >
//                 <path
//                   d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM14 14l3 3"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Buscar evento, usuario..."
//                 className="search-input-new"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 onKeyDown={handleSearch}
//               />
//               {searchLoading && (
//                 <div className="search-loading">
//                   <Spin size="small" />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="header-right-new">
//             <div className="view-selector-wrapper">
//               <button
//                 className="view-selector-btn-new"
//                 onClick={() => setShowViewDropdown(!showViewDropdown)}
//               >
//                 {viewType}
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="currentColor"
//                 >
//                   <path
//                     d="M4 6l4 4 4-4"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     fill="none"
//                   />
//                 </svg>
//               </button>

//               {showViewDropdown && (
//                 <>
//                   <div
//                     className="dropdown-overlay"
//                     onClick={() => setShowViewDropdown(false)}
//                   />
//                   <div className="view-dropdown">
//                     {viewOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         className={`view-dropdown-item ${
//                           viewType === option.label ? "active" : ""
//                         }`}
//                         onClick={() => handleViewChange(option.value)}
//                       >
//                         {option.label}
//                         {viewType === option.label && (
//                           <svg
//                             width="16"
//                             height="16"
//                             viewBox="0 0 16 16"
//                             fill="none"
//                           >
//                             <path
//                               d="M3 8l3 3 7-7"
//                               stroke="#344BFF"
//                               strokeWidth="2"
//                             />
//                           </svg>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>

//             <button
//               className="create-event-btn-new"
//               onClick={handleCreateButtonClick}
//             >
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                 <path
//                   d="M9 3v12M3 9h12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 />
//               </svg>
//               Crear evento
//             </button>
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="calendar-wrapper-new">
//           {loadingEvents ? (
//             <div className="calendar-loading">
//               <Spin size="large" />
//               <p>Cargando eventos...</p>
//             </div>
//           ) : error ? (
//             <div className="calendar-error">
//               <p>Error: {error}</p>
//             </div>
//           ) : (
//             <FullCalendar
//               ref={calendarRef}
//               plugins={[
//                 timeGridPlugin,
//                 dayGridPlugin,
//                 interactionPlugin,
//                 listPlugin,
//                 multiMonthPlugin,
//               ]}
//               initialView={initialView}
//               headerToolbar={false}
//               height="calc(100vh - 140px)"
//               events={calendarEvents}
//               eventClick={handleEventClick}
//               select={handleDateSelect}
//               selectable={true}
//               editable={true}
//               eventDrop={handleEventDrop}
//               eventResize={handleEventResize}
//               allDaySlot={false}
//               slotMinTime="00:00:00"
//               slotMaxTime="24:00:00"
//               slotLabelInterval="01:00"
//               slotDuration="00:30:00"
//               expandRows={true}
//               views={{
//                 timeGridFourDay: {
//                   type: "timeGrid",
//                   duration: { days: 4 },
//                   buttonText: "4 días",
//                 },
//                 dayGridYear: {
//                   type: "multiMonth",
//                   duration: { months: 12 },
//                   buttonText: "Año",
//                 },
//               }}
//               dayHeaderFormat={{
//                 weekday: "short",
//                 day: "numeric",
//               }}
//               slotLabelFormat={{
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//               }}
//               locale="es"
//             />
//           )}
//         </div>
//       </div>

//       {/* Modales */}
//       <EventCreateModal
//         visible={createModalVisible}
//         onClose={() => setCreateModalVisible(false)}
//         onSave={modalMode === "create" ? handleCreateEvent : handleUpdateEvent}
//         selectedDate={selectedDate}
//         event={selectedEvent}
//         mode={modalMode}
//       />

//       <EventDetailsModal
//         visible={detailsModalVisible}
//         onClose={() => setDetailsModalVisible(false)}
//         event={selectedEvent}
//         onEdit={handleEditClick}
//         onDelete={handleDeleteEvent}
//       />

//       <SearchResultsModal
//         visible={searchModalVisible}
//         onCancel={() => {
//           setSearchModalVisible(false);
//           setSearchTerm("");
//         }}
//         searchTerm={lastSearchTerm}
//         results={events}
//         loading={searchLoading}
//         onEventSelect={handleEventSelectFromSearch}
//         showUnified={showUnified}
//       />

//       <style jsx global>{`
//         .calendar-container-new {
//           width: 100%;
//           height: 100vh;
//           background: #ffffff;
//           display: flex;
//           flex-direction: column;
//         }

//         .calendar-header-new {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 16px 24px;
//           border-bottom: 1px solid #e8ecef;
//           background: white;
//           gap: 16px;
//         }

//         .header-left-new {
//           display: flex;
//           align-items: center;
//           gap: 24px;
//         }

//         .calendar-title-btn-new {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 20px;
//           font-weight: 700;
//           color: #344bff;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 8px 12px;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .calendar-title-btn-new:hover {
//           background: #f0f2ff;
//         }

//         .month-navigation-new {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .nav-btn-new {
//           width: 32px;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid #e8ecef;
//           background: white;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           color: #4a5568;
//         }

//         .nav-btn-new:hover {
//           border-color: #344bff;
//           color: #344bff;
//           background: #f0f2ff;
//         }

//         .today-btn-new {
//           padding: 6px 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid #e8ecef;
//           background: white;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//           color: #4a5568;
//           font-size: 14px;
//           font-weight: 500;
//           white-space: nowrap;
//         }

//         .today-btn-new:hover {
//           border-color: #344bff;
//           color: #344bff;
//           background: #f0f2ff;
//         }

//         .today-btn-new:active {
//           transform: scale(0.98);
//         }

//         .current-date-new {
//           font-size: 16px;
//           font-weight: 600;
//           color: #1a202c;
//           min-width: 140px;
//           text-align: center;
//         }

//         .header-center-new {
//           flex: 1;
//           max-width: 400px;
//         }

//         .search-box-new {
//           position: relative;
//           width: 100%;
//         }

//         .search-icon-new {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #a0aec0;
//           pointer-events: none;
//         }

//         .search-input-new {
//           width: 100%;
//           padding: 10px 12px 10px 40px;
//           border: 1px solid #e8ecef;
//           border-radius: 8px;
//           font-size: 14px;
//           outline: none;
//           transition: all 0.2s;
//         }

//         .search-input-new::placeholder {
//           color: #a0aec0;
//         }

//         .search-input-new:focus {
//           border-color: #344bff;
//           box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
//         }

//         .search-loading {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//         }

//         .header-right-new {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .view-selector-wrapper {
//           position: relative;
//         }

//         .dropdown-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 998;
//         }

//         .view-dropdown {
//           position: absolute;
//           top: calc(100% + 8px);
//           right: 0;
//           background: white;
//           border: 1px solid #e8ecef;
//           border-radius: 8px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//           min-width: 140px;
//           padding: 8px;
//           z-index: 999;
//           animation: slideDown 0.2s ease;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .view-dropdown-item {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 10px 12px;
//           background: none;
//           border: none;
//           border-radius: 6px;
//           font-size: 14px;
//           color: #4a5568;
//           cursor: pointer;
//           transition: all 0.2s;
//           text-align: left;
//         }

//         .view-dropdown-item:hover {
//           background: #f0f2ff;
//           color: #344bff;
//         }

//         .view-dropdown-item.active {
//           background: #f0f2ff;
//           color: #344bff;
//           font-weight: 600;
//         }

//         .view-selector-btn-new {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 16px;
//           background: white;
//           border: 1px solid #e8ecef;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 500;
//           color: #4a5568;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .view-selector-btn-new:hover {
//           border-color: #344bff;
//           color: #344bff;
//           background: #f0f2ff;
//         }

//         .create-event-btn-new {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 20px;
//           background: #344bff;
//           border: none;
//           border-radius: 8px;
//           font-size: 14px;
//           font-weight: 600;
//           color: white;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .create-event-btn-new:hover {
//           background: #2a3dd4;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
//         }

//         .calendar-wrapper-new {
//           flex: 1;
//           padding: 16px 24px 24px;
//           overflow: auto;
//         }

//         .calendar-loading,
//         .calendar-error {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 400px;
//           gap: 16px;
//         }

//         .no-account-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: #fafbfc;
//         }

//         .no-account-content {
//           text-align: center;
//           padding: 48px;
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }

//         .no-account-icon {
//           font-size: 64px;
//           margin-bottom: 24px;
//         }

//         /* FullCalendar Styles */
//         .fc {
//           font-family: inherit;
//           border: 1px solid #e8ecef;
//           border-radius: 12px;
//           overflow: hidden;
//         }

//         .fc .fc-view-harness {
//           background: white;
//         }

//         .fc .fc-col-header {
//           background: #fafbfc;
//           border-bottom: 2px solid #e8ecef;
//         }

//         .fc .fc-col-header-cell {
//           padding: 16px 8px;
//           border-right: 1px solid #e8ecef;
//         }

//         .fc .fc-col-header-cell-cushion {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-decoration: none;
//           color: #4a5568;
//           font-size: 12px;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .fc .fc-timegrid-slot {
//           height: 60px;
//           border-color: #f0f2f5;
//         }

//         .fc .fc-timegrid-slot-label {
//           border-color: #e8ecef;
//           vertical-align: middle;
//         }

//         .fc .fc-timegrid-slot-label-cushion {
//           font-size: 11px;
//           color: #718096;
//           font-weight: 500;
//           padding-right: 12px;
//         }

//         .fc .fc-timegrid-col {
//           border-right: 1px solid #e8ecef;
//         }

//         .fc .fc-day-today {
//           background-color: #f0f2ff !important;
//         }

//         .fc-event {
//           border: none !important;
//           background: #344bff !important;
//           border-radius: 6px !important;
//           padding: 6px 10px !important;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .fc-event:hover {
//           background: #2a3dd4 !important;
//           transform: translateX(2px);
//           box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
//         }

//         .fc-event-title {
//           font-size: 13px;
//           font-weight: 600;
//           color: white;
//         }

//         .fc .fc-scrollgrid {
//           border-color: #e8ecef;
//         }

//         /* List View (Agenda) Styles */
//         .fc-list {
//           border: 1px solid #e8ecef;
//         }

//         .fc-list-event:hover td {
//           background-color: #f0f2ff;
//         }

//         .fc-list-event-dot {
//           background-color: #344bff;
//           border-color: #344bff;
//         }

//         .fc-list-day-cushion {
//           background: #fafbfc;
//           font-weight: 600;
//           color: #1a202c;
//         }

//         .fc-list-event-title {
//           color: #344bff;
//           font-weight: 500;
//         }

//         .fc-list-event-time {
//           color: #718096;
//         }

//         /* Multi Month View (Año) Styles */
//         .fc-multimonth {
//           background: white;
//         }

//         .fc-multimonth-title {
//           font-size: 14px;
//           font-weight: 600;
//           color: #1a202c;
//           padding: 12px;
//           background: #fafbfc;
//         }

//         .fc-multimonth-daygrid {
//           border: 1px solid #e8ecef;
//         }

//         .fc-multimonth-month {
//           margin-bottom: 16px;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         @media (max-width: 768px) {
//           .calendar-header-new {
//             flex-wrap: wrap;
//           }

//           .header-left-new {
//             width: 100%;
//           }

//           .header-center-new {
//             width: 100%;
//             max-width: 100%;
//           }

//           .header-right-new {
//             width: 100%;
//             justify-content: flex-end;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default EnhancedCalendarView;

import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Spin, message } from "antd";
import {
  CalendarViewProps,
  CalendarEvent,
} from "@/interfaces/interfacesCalendar";
import dayjs from "dayjs";
import { useCalendarData } from "./hooks/useCalendarData";
import { useCalendarEvents } from "./hooks/useCalendarEvents";
import EventCreateModal from "./EventCreateModal";
import EventDetailsModal from "./EventDetailsModalNew";
import { SearchResultsModal } from "./SearchResultsModal";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";

interface EventData {
  summary: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  attendees?: Array<{ email: string }>;
  isAllDay?: boolean;
}

const EnhancedCalendarView: React.FC<CalendarViewProps> = ({
  accountId,
  showUnified = false,
  initialView = "timeGridWeek",
}) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [viewType, setViewType] = useState("Semana");
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const viewOptions = [
    { label: "Día", value: "timeGridDay" },
    { label: "Semana", value: "timeGridWeek" },
    { label: "Mes", value: "dayGridMonth" },
    { label: "Año", value: "dayGridYear" },
    { label: "Agenda", value: "listWeek" },
    { label: "4 días", value: "timeGridFourDay" },
  ];

  const {
    events,
    loading: loadingEvents,
    error,
    loadEvents,
    hasAccount,
    searchLoading,
    searchEvents,
    clearSearch,
  } = useCalendarData(accountId, showUnified);

  const { createEvent, updateEvent, deleteEvent } =
    useCalendarEvents(accountId);

  useEffect(() => {
    if (hasAccount) {
      const now = dayjs();
      const startDate = now.subtract(6, "month").startOf("month").toISOString();
      const endDate = now.add(6, "months").endOf("month").toISOString();
      console.log("📅 Cargando eventos iniciales:", { startDate, endDate });
      loadEvents(startDate, endDate);
    }
  }, [hasAccount, accountId, showUnified]);

  useEffect(() => {
    updateCurrentDate();
  }, []);

  const updateCurrentDate = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const date = calendarApi.getDate();
      const monthYear = date.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });
      setCurrentDate(monthYear.charAt(0).toUpperCase() + monthYear.slice(1));
    }
  };

  const getViewLabel = (viewValue: string) => {
    const view = viewOptions.find((v) => v.value === viewValue);
    return view ? view.label : "Semana";
  };

  const handleViewChange = (viewValue: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewValue);
      setViewType(getViewLabel(viewValue));
      setShowViewDropdown(false);
      updateCurrentDate();
    }
  };

  const handlePrevious = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCurrentDate();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCurrentDate();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
      updateCurrentDate();
    }
  };

  const refreshEvents = async () => {
    if (hasAccount) {
      const now = dayjs();
      const startDate = now.subtract(6, "month").startOf("month").toISOString();
      const endDate = now.add(6, "months").endOf("month").toISOString();
      await loadEvents(startDate, endDate);
    }
  };

  // Función para buscar eventos
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = searchTerm.trim();
      if (!term) {
        clearSearch();
        setSearchModalVisible(false);
        return;
      }

      try {
        const startDate = dayjs()
          .subtract(1, "year")
          .startOf("day")
          .toISOString();
        await searchEvents(term, startDate, 1, 50);
        setLastSearchTerm(term);
        setSearchModalVisible(true);
      } catch (err) {
        console.error("Error en búsqueda:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Error desconocido";
        message.error(`Error al buscar eventos: ${errorMessage}`);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      clearSearch();
      setSearchModalVisible(false);
    }
  };

  // Función para navegar al evento seleccionado desde la búsqueda
  const handleEventSelectFromSearch = (event: CalendarEvent) => {
    setSearchModalVisible(false);
    setSearchTerm("");

    // Navegar a la fecha del evento
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi && event.startTime) {
      const eventDate = new Date(event.startTime);
      calendarApi.gotoDate(eventDate);

      // Cambiar a vista de semana si está en mes o año
      const currentView = calendarApi.view.type;
      if (currentView === "dayGridMonth" || currentView === "dayGridYear") {
        calendarApi.changeView("timeGridWeek");
        setViewType("Semana");
      }

      // Mostrar detalles del evento después de un breve delay
      setTimeout(() => {
        setSelectedEvent(event);
        setDetailsModalVisible(true);
      }, 300);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const startDate = selectInfo.start;
    setSelectedDate(startDate);
    setModalMode("create");
    setSelectedEvent(undefined);
    setCreateModalVisible(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event: CalendarEvent = {
      id: clickInfo.event.id,
      summary: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      location: clickInfo.event.extendedProps.location,
      startTime: clickInfo.event.start?.toISOString() || "",
      endTime: clickInfo.event.end?.toISOString() || "",
      attendees: clickInfo.event.extendedProps.attendees,
      sourceAccount: clickInfo.event.extendedProps.sourceAccount,
      isAllDay: clickInfo.event.allDay || undefined,
    };
    setSelectedEvent(event);
    setDetailsModalVisible(true);
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    const event = dropInfo.event;
    try {
      await updateEvent(event.id, {
        startDateTime: event.start!.toISOString(),
        endDateTime: event.end!.toISOString(),
      });
      message.success("Evento movido exitosamente");
      setTimeout(() => refreshEvents(), 300);
    } catch (err) {
      console.error("Error al mover el evento:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      message.error(`Error al mover el evento: ${errorMessage}`);
      dropInfo.revert();
    }
  };

  const handleEventResize = async (resizeInfo: EventResizeDoneArg) => {
    const event = resizeInfo.event;
    try {
      await updateEvent(event.id, {
        startDateTime: event.start!.toISOString(),
        endDateTime: event.end!.toISOString(),
      });
      message.success("Duración del evento actualizada");
      setTimeout(() => refreshEvents(), 300);
    } catch (err) {
      console.error("Error al redimensionar el evento:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      message.error(`Error al cambiar la duración: ${errorMessage}`);
      resizeInfo.revert();
    }
  };

  const handleCreateEvent = async (eventData: EventData) => {
    const attendees = eventData.attendees?.map(({ email }) => email) || [];
    const eventDataForCreate = {
      ...eventData,
      attendees,
    };

    const newEvent = await createEvent(eventDataForCreate, false);
    if (newEvent) {
      setCreateModalVisible(false);
      message.success("Evento creado exitosamente");
      setTimeout(() => refreshEvents(), 500);
    }
  };

  const handleUpdateEvent = async (eventData: EventData) => {
    if (!selectedEvent) return;
    const attendees = eventData.attendees?.map(({ email }) => email) || [];
    const updatedEvent = await updateEvent(selectedEvent.id, {
      ...eventData,
      attendees,
    });
    if (updatedEvent) {
      setCreateModalVisible(false);
      setDetailsModalVisible(false);
      setSelectedEvent(undefined);
      message.success("Evento actualizado exitosamente");
      setTimeout(() => refreshEvents(), 500);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    const success = await deleteEvent(selectedEvent.id);
    if (success) {
      setDetailsModalVisible(false);
      setSelectedEvent(undefined);
      message.success("Evento eliminado exitosamente");
      setTimeout(() => refreshEvents(), 500);
    }
  };

  const handleEditClick = () => {
    setDetailsModalVisible(false);
    setModalMode("edit");
    setCreateModalVisible(true);
  };

  const handleCreateButtonClick = () => {
    setSelectedDate(new Date());
    setModalMode("create");
    setSelectedEvent(undefined);
    setCreateModalVisible(true);
  };

  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.summary || "Sin título",
    start: event.startTime,
    end: event.endTime,
    allDay: event.isAllDay || false,
    extendedProps: { ...event },
  }));

  console.log("📊 Estado del calendario:", {
    hasAccount,
    loadingEvents,
    eventsCount: events.length,
    calendarEventsCount: calendarEvents.length,
  });

  if (!hasAccount) {
    return (
      <div className="no-account-container">
        <div className="no-account-content">
          <div className="no-account-icon">📅</div>
          <h3>No hay cuenta conectada</h3>
          <p>Conecta una cuenta de Google Calendar para ver tus eventos</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="calendar-container-new">
        {/* Header */}
        <div className="calendar-header-new">
          <div className="header-left-new">
            <button className="calendar-title-btn-new">
              Calendario
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>

            <div className="month-navigation-new">
              <button onClick={handlePrevious} className="nav-btn-new">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12 15l-5-5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button onClick={handleNext} className="nav-btn-new">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8 15l5-5-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button onClick={handleToday} className="today-btn-new">
                Hoy
              </button>
              <span className="current-date-new">{currentDate}</span>
            </div>
          </div>

          <div className="header-center-new">
            <div className="search-box-new">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="search-icon-new"
              >
                <path
                  d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM14 14l3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar evento, usuario..."
                className="search-input-new"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
              />
              {searchLoading && (
                <div className="search-loading">
                  <Spin size="small" />
                </div>
              )}
            </div>
          </div>

          <div className="header-right-new">
            <div className="view-selector-wrapper">
              <button
                className="view-selector-btn-new"
                onClick={() => setShowViewDropdown(!showViewDropdown)}
              >
                {viewType}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>

              {showViewDropdown && (
                <>
                  <div
                    className="dropdown-overlay"
                    onClick={() => setShowViewDropdown(false)}
                  />
                  <div className="view-dropdown">
                    {viewOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`view-dropdown-item ${
                          viewType === option.label ? "active" : ""
                        }`}
                        onClick={() => handleViewChange(option.value)}
                      >
                        {option.label}
                        {viewType === option.label && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 8l3 3 7-7"
                              stroke="#344BFF"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="create-event-btn-new"
              onClick={handleCreateButtonClick}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 3v12M3 9h12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Crear evento
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="calendar-wrapper-new">
          {loadingEvents ? (
            <div className="calendar-loading">
              <Spin size="large" />
              <p>Cargando eventos...</p>
            </div>
          ) : error ? (
            <div className="calendar-error">
              <p>Error: {error}</p>
            </div>
          ) : (
            <FullCalendar
              ref={calendarRef}
              plugins={[
                timeGridPlugin,
                dayGridPlugin,
                interactionPlugin,
                listPlugin,
                multiMonthPlugin,
              ]}
              initialView={initialView}
              headerToolbar={false}
              height="calc(100vh - 140px)"
              events={calendarEvents}
              eventClick={handleEventClick}
              select={handleDateSelect}
              selectable={true}
              editable={true}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              allDaySlot={false}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              slotLabelInterval="01:00"
              slotDuration="00:30:00"
              expandRows={true}
              views={{
                timeGridFourDay: {
                  type: "timeGrid",
                  duration: { days: 4 },
                  buttonText: "4 días",
                },
                dayGridYear: {
                  type: "multiMonth",
                  duration: { months: 12 },
                  buttonText: "Año",
                },
              }}
              dayHeaderFormat={{
                weekday: "short",
                day: "numeric",
              }}
              slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              locale="es"
            />
          )}
        </div>
      </div>

      {/* Modales */}
      <EventCreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSave={modalMode === "create" ? handleCreateEvent : handleUpdateEvent}
        selectedDate={selectedDate}
        event={selectedEvent}
        mode={modalMode}
      />

      <EventDetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        event={selectedEvent}
        onEdit={handleEditClick}
        onDelete={handleDeleteEvent}
      />

      <SearchResultsModal
        visible={searchModalVisible}
        onCancel={() => {
          setSearchModalVisible(false);
          setSearchTerm("");
        }}
        searchTerm={lastSearchTerm}
        results={events}
        loading={searchLoading}
        onEventSelect={handleEventSelectFromSearch}
        showUnified={showUnified}
      />

      <style jsx global>{`
        .calendar-container-new {
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .calendar-header-new {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid #e8ecef;
          background: white;
          gap: 16px;
        }

        .header-left-new {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .calendar-title-btn-new {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 700;
          color: #344bff;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .calendar-title-btn-new:hover {
          background: #f0f2ff;
        }

        .month-navigation-new {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-btn-new {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e8ecef;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: #4a5568;
        }

        .nav-btn-new:hover {
          border-color: #344bff;
          color: #344bff;
          background: #f0f2ff;
        }

        .today-btn-new {
          padding: 6px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e8ecef;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }

        .today-btn-new:hover {
          border-color: #344bff;
          color: #344bff;
          background: #f0f2ff;
        }

        .today-btn-new:active {
          transform: scale(0.98);
        }

        .current-date-new {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          min-width: 140px;
          text-align: center;
        }

        .header-center-new {
          flex: 1;
          max-width: 400px;
        }

        .search-box-new {
          position: relative;
          width: 100%;
        }

        .search-icon-new {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          pointer-events: none;
        }

        .search-input-new {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input-new::placeholder {
          color: #a0aec0;
        }

        .search-input-new:focus {
          border-color: #344bff;
          box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
        }

        .search-loading {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .header-right-new {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .view-selector-wrapper {
          position: relative;
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 998;
        }

        .view-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          min-width: 140px;
          padding: 8px;
          z-index: 999;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .view-dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: none;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .view-dropdown-item:hover {
          background: #f0f2ff;
          color: #344bff;
        }

        .view-dropdown-item.active {
          background: #f0f2ff;
          color: #344bff;
          font-weight: 600;
        }

        .view-selector-btn-new {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-selector-btn-new:hover {
          border-color: #344bff;
          color: #344bff;
          background: #f0f2ff;
        }

        .create-event-btn-new {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #344bff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .create-event-btn-new:hover {
          background: #2a3dd4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
        }

        .calendar-wrapper-new {
          flex: 1;
          padding: 16px 24px 24px;
          overflow: auto;
        }

        .calendar-loading,
        .calendar-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          gap: 16px;
        }

        .no-account-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #fafbfc;
        }

        .no-account-content {
          text-align: center;
          padding: 48px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .no-account-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }

        /* FullCalendar Styles */
        .fc {
          font-family: inherit;
          border: 1px solid #e8ecef;
          border-radius: 12px;
          overflow: hidden;
        }

        .fc .fc-view-harness {
          background: white;
        }

        .fc .fc-col-header {
          background: #fafbfc;
          border-bottom: 2px solid #e8ecef;
        }

        .fc .fc-col-header-cell {
          padding: 16px 8px;
          border-right: 1px solid #e8ecef;
        }

        .fc .fc-col-header-cell-cushion {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #4a5568;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fc .fc-timegrid-slot {
          height: 60px;
          border-color: #f0f2f5;
        }

        .fc .fc-timegrid-slot-label {
          border-color: #e8ecef;
          vertical-align: middle;
        }

        .fc .fc-timegrid-slot-label-cushion {
          font-size: 11px;
          color: #718096;
          font-weight: 500;
          padding-right: 12px;
        }

        .fc .fc-timegrid-col {
          border-right: 1px solid #e8ecef;
        }

        .fc .fc-day-today {
          background-color: #f0f2ff !important;
        }

        .fc-event {
          border: none !important;
          background: #344bff !important;
          border-radius: 6px !important;
          padding: 6px 10px !important;
          cursor: pointer;
          transition: all 0.2s;
        }

        .fc-event:hover {
          background: #2a3dd4 !important;
          transform: translateX(2px);
          box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
        }

        .fc-event-title {
          font-size: 13px;
          font-weight: 600;
          color: white;
        }

        .fc .fc-scrollgrid {
          border-color: #e8ecef;
        }

        /* List View (Agenda) Styles */
        .fc-list {
          border: 1px solid #e8ecef;
        }

        .fc-list-event:hover td {
          background-color: #f0f2ff;
        }

        .fc-list-event-dot {
          background-color: #344bff;
          border-color: #344bff;
        }

        .fc-list-day-cushion {
          background: #fafbfc;
          font-weight: 600;
          color: #1a202c;
        }

        .fc-list-event-title {
          color: #344bff;
          font-weight: 500;
        }

        .fc-list-event-time {
          color: #718096;
        }

        /* Multi Month View (Año) Styles */
        .fc-multimonth {
          background: white;
        }

        .fc-multimonth-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
          padding: 12px;
          background: #fafbfc;
        }

        .fc-multimonth-daygrid {
          border: 1px solid #e8ecef;
        }

        .fc-multimonth-month {
          margin-bottom: 16px;
          border-radius: 8px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .calendar-header-new {
            flex-wrap: wrap;
          }

          .header-left-new {
            width: 100%;
          }

          .header-center-new {
            width: 100%;
            max-width: 100%;
          }

          .header-right-new {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedCalendarView;
