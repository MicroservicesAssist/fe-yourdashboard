import { useState, useEffect } from "react";
import { X, Users, Link2, MapPin, FileText, Calendar } from "lucide-react";

interface EventCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (eventData: any) => void;
  selectedDate?: Date;
  event?: any;
  mode?: "create" | "edit";
}

export default function EventCreateModal({
  visible,
  onClose,
  onSave,
  selectedDate,
  event,
  mode = "create",
}: EventCreateModalProps) {
  const [activeTab, setActiveTab] = useState("Evento");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("15:00");
  const [allDay, setAllDay] = useState(false);
  const [repeat, setRepeat] = useState("No se repite");
  const [attendees, setAttendees] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [showRepeatDropdown, setShowRepeatDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const repeatOptions = [
    "No se repite",
    "Todos los días",
    "Cada semana, el miércoles",
    "Todos los meses el cuarto miércoles",
    "Todos los meses el último miércoles",
    "Anualmente, el 03 de agosto",
    "Todos los días hábiles (de lunes a viernes)",
  ];

  useEffect(() => {
    if (visible) {
      if (mode === "edit" && event) {
        setTitle(event.summary || "");
        setStartDate(event.startTime?.split("T")[0] || "");
        setStartTime(
          event.startTime?.split("T")[1]?.substring(0, 5) || "14:00"
        );
        setEndTime(event.endTime?.split("T")[1]?.substring(0, 5) || "15:00");
        setAllDay(event.isAllDay || false);
        setLocation(event.location || "");
        setDescription(event.description || "");
        setAttendees(event.attendees?.join(", ") || "");
        const urlMatch = event.description?.match(/https?:\/\/[^\s]+/);
        if (urlMatch) setMeetingLink(urlMatch[0]);
      } else if (selectedDate) {
        const dateStr = selectedDate.toISOString().split("T")[0];
        setStartDate(dateStr);
        setTitle("");
        setStartTime("14:00");
        setEndTime("15:00");
        setAllDay(false);
        setLocation("");
        setDescription("");
        setAttendees("");
        setMeetingLink("");
      }
    }
  }, [visible, selectedDate, event, mode]);

  const handleSave = () => {
    const eventData = {
      summary: title,
      startDateTime: `${startDate}T${startTime}:00`,
      endDateTime: `${startDate}T${endTime}:00`,
      location,
      description: meetingLink
        ? `${description}\n\n🔗 Enlace: ${meetingLink}`
        : description,
      attendees: attendees
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    };
    onSave(eventData);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDateSelect = (date: Date) => {
    setStartDate(date.toISOString().split("T")[0]);
    setShowCalendar(false);
  };

  if (!visible) return null;

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{mode === "create" ? "Crear evento" : "Editar evento"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <input
            type="text"
            placeholder="Título de evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />

          <div className="tabs">
            {["Evento", "Tarea", "Fuera de la oficina"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="date-time-row">
            <div className="date-picker-wrapper">
              <input
                type="text"
                value={
                  startDate
                    ? new Date(startDate).toLocaleDateString("es-ES", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                      })
                    : ""
                }
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
                placeholder="Seleccionar fecha"
                className="date-input"
              />
              <Calendar size={16} className="calendar-icon" />

              {showCalendar && (
                <div className="calendar-dropdown">
                  <div className="calendar-header">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1
                          )
                        )
                      }
                    >
                      ‹
                    </button>
                    <span>{monthName}</span>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          )
                        )
                      }
                    >
                      ›
                    </button>
                  </div>
                  <div className="calendar-grid">
                    {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
                      <div key={day} className="calendar-weekday">
                        {day}
                      </div>
                    ))}
                    {days.map((day, index) => (
                      <button
                        key={index}
                        className={`calendar-day ${
                          day && startDate === day.toISOString().split("T")[0]
                            ? "selected"
                            : ""
                        } ${!day ? "empty" : ""}`}
                        onClick={() => day && handleDateSelect(day)}
                        disabled={!day}
                      >
                        {day ? day.getDate() : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="time-input"
            />
            <span className="time-separator">—</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="time-input"
            />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            <label htmlFor="allDay">Todo el día</label>
          </div>

          <div className="repeat-selector">
            <button
              className="repeat-btn"
              onClick={() => setShowRepeatDropdown(!showRepeatDropdown)}
            >
              {repeat}
            </button>
            {showRepeatDropdown && (
              <div className="repeat-dropdown">
                {repeatOptions.map((option) => (
                  <button
                    key={option}
                    className={`repeat-option ${
                      repeat === option ? "active" : ""
                    }`}
                    onClick={() => {
                      setRepeat(option);
                      setShowRepeatDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="input-with-icon">
            <Users size={18} />
            <input
              type="text"
              placeholder="Agregar usuarios"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
          </div>

          <div className="input-with-icon">
            <Link2 size={18} />
            <input
              type="url"
              placeholder="Link de la reunión"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div>

          <div className="input-with-icon">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="Agregar ubicación"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="input-with-icon description">
            <FileText size={18} />
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-container {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e8ecef;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #718096;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f0f2f5;
          color: #1a202c;
        }

        .modal-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .title-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .title-input:focus {
          border-color: #344bff;
          box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
        }

        .tabs {
          display: flex;
          gap: 8px;
          border-bottom: 2px solid #e8ecef;
          padding-bottom: 2px;
        }

        .tab {
          background: none;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #718096;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
        }

        .tab:hover {
          color: #344bff;
        }

        .tab.active {
          color: #344bff;
          border-bottom-color: #344bff;
          font-weight: 500;
        }

        .date-time-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .date-picker-wrapper {
          position: relative;
          flex: 1;
        }

        .date-input {
          width: 100%;
          padding: 10px 36px 10px 12px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }

        .date-input:focus {
          border-color: #344bff;
          box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
        }

        .calendar-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          pointer-events: none;
        }

        .calendar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: white;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          min-width: 280px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .calendar-header button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          font-size: 18px;
          color: #344bff;
          border-radius: 4px;
        }

        .calendar-header button:hover {
          background: #f0f2ff;
        }

        .calendar-header span {
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
          text-transform: capitalize;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-weekday {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #344bff;
          padding: 8px 0;
        }

        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          border-radius: 50%;
          font-size: 13px;
          cursor: pointer;
          color: #1a202c;
          transition: all 0.2s;
        }

        .calendar-day:hover:not(.empty):not(.selected) {
          background: #f0f2ff;
          color: #344bff;
        }

        .calendar-day.selected {
          background: #344bff;
          color: white;
          font-weight: 600;
        }

        .calendar-day.empty {
          cursor: default;
        }

        .time-input {
          padding: 10px 12px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          width: 100px;
          outline: none;
          transition: all 0.2s;
        }

        .time-input:focus {
          border-color: #344bff;
          box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
        }

        .time-separator {
          color: #718096;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-row input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #344bff;
        }

        .checkbox-row label {
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }

        .repeat-selector {
          position: relative;
        }

        .repeat-btn {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .repeat-btn:hover {
          border-color: #344bff;
        }

        .repeat-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          max-height: 240px;
          overflow-y: auto;
        }

        .repeat-option {
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          color: #4a5568;
          transition: all 0.2s;
        }

        .repeat-option:hover {
          background: #f0f2ff;
          color: #344bff;
        }

        .repeat-option.active {
          background: #f0f2ff;
          color: #344bff;
          font-weight: 500;
        }

        .input-with-icon {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e8ecef;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .input-with-icon:focus-within {
          border-color: #344bff;
          box-shadow: 0 0 0 3px rgba(52, 75, 255, 0.1);
        }

        .input-with-icon svg {
          color: #718096;
          flex-shrink: 0;
        }

        .input-with-icon input,
        .input-with-icon textarea {
          border: none;
          outline: none;
          flex: 1;
          font-size: 14px;
          font-family: inherit;
          resize: none;
        }

        .input-with-icon.description {
          align-items: flex-start;
          padding-top: 14px;
        }

        .save-btn {
          width: 100%;
          padding: 12px;
          background: #344bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .save-btn:hover {
          background: #2a3dd4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
