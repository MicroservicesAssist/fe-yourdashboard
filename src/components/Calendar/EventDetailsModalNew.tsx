import {
  Edit2,
  Trash2,
  MoreVertical,
  X,
  Users,
  Bell,
  Mail,
  FileText,
  Video,
} from "lucide-react";

interface EventDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  event: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EventDetailsModal({
  visible,
  onClose,
  event,
  onEdit,
  onDelete,
}: EventDetailsModalProps) {
  if (!visible || !event) return null;

  const extractMeetingLink = (description: string) => {
    const urlMatch = description?.match(/(https?:\/\/[^\s]+)/);
    return urlMatch ? urlMatch[0] : null;
  };

  const cleanDescription = (description: string) => {
    return description?.replace(/🔗 Enlace:.*$/m, "").trim() || "";
  };

  const meetingLink = extractMeetingLink(event.description || "");
  const description = cleanDescription(event.description || "");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const attendeesList = event.attendees || [];
  const acceptedCount = attendeesList.filter(
    (a: any) => a.status === "accepted"
  ).length;
  const pendingCount = attendeesList.filter(
    (a: any) => a.status === "pending"
  ).length;

  return (
    <div className="modal-overlay">
      <div className="details-modal">
        <div className="details-header">
          <div className="header-actions">
            <button className="icon-btn" onClick={onEdit}>
              <Edit2 size={18} />
            </button>
            <button className="icon-btn" onClick={onDelete}>
              <Trash2 size={18} />
            </button>
            <button className="icon-btn">
              <MoreVertical size={18} />
            </button>
            <button className="icon-btn close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="details-content">
          <div className="event-title-section">
            <div className="color-indicator" />
            <h2>{event.summary || "Sin título"}</h2>
          </div>

          <div className="event-datetime">
            {formatDate(event.startTime)} · {formatTime(event.startTime)} -{" "}
            {formatTime(event.endTime)}
          </div>

          {meetingLink && (
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="meet-button"
            >
              <Video size={18} />
              Unirse con Google Meet
            </a>
          )}

          {meetingLink && (
            <div className="meeting-link-text">{meetingLink}</div>
          )}

          {attendeesList.length > 0 && (
            <div className="detail-row">
              <Users size={20} />
              <div className="detail-content">
                <div className="attendees-summary">
                  {attendeesList.length} invitados
                </div>
                {acceptedCount > 0 && (
                  <div className="attendees-status">{acceptedCount} sí</div>
                )}
                {pendingCount > 0 && (
                  <div className="attendees-status">
                    {pendingCount} en espera
                  </div>
                )}
              </div>
              <button className="expand-btn">
                <Mail size={18} />
              </button>
            </div>
          )}

          <div className="detail-row">
            <Bell size={20} />
            <div className="detail-content">10 minutos antes</div>
          </div>

          <div className="detail-row">
            <Mail size={20} />
            <div className="detail-content">
              {event.sourceAccount || "usuario@gmail.com"}
            </div>
          </div>

          {description && (
            <div className="detail-row">
              <FileText size={20} />
              <div className="detail-content">{description}</div>
            </div>
          )}
        </div>

        <div className="details-footer">
          <div className="attendance-question">¿Asistirás?</div>
          <div className="attendance-buttons">
            <button className="attendance-btn yes">Sí</button>
            <button className="attendance-btn no">No</button>
            <button className="attendance-btn maybe">Quizás</button>
          </div>
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

        .details-modal {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .details-header {
          background: #e3f2fd;
          padding: 16px 20px;
          display: flex;
          justify-content: flex-end;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #4a5568;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f0f2f5;
          color: #1a202c;
        }

        .icon-btn.close {
          color: #344bff;
        }

        .icon-btn.close:hover {
          background: #f0f2ff;
        }

        .details-content {
          padding: 24px;
        }

        .event-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .color-indicator {
          width: 4px;
          height: 40px;
          background: #344bff;
          border-radius: 2px;
        }

        .event-title-section h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #344bff;
        }

        .event-datetime {
          font-size: 14px;
          color: #4a5568;
          margin-bottom: 20px;
          margin-left: 16px;
        }

        .meet-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #344bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          margin-bottom: 8px;
        }

        .meet-button:hover {
          background: #2a3dd4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(52, 75, 255, 0.3);
        }

        .meeting-link-text {
          font-size: 12px;
          color: #344bff;
          margin-bottom: 24px;
          word-break: break-all;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f0f2f5;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-row svg {
          color: #718096;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .detail-content {
          flex: 1;
          font-size: 14px;
          color: #4a5568;
        }

        .attendees-summary {
          font-weight: 500;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .attendees-status {
          font-size: 13px;
          color: #718096;
        }

        .expand-btn {
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

        .expand-btn:hover {
          background: #f0f2f5;
          color: #344bff;
        }

        .details-footer {
          padding: 20px 24px;
          background: #f8f9fa;
          border-top: 1px solid #e8ecef;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .attendance-question {
          font-size: 14px;
          color: #4a5568;
          font-weight: 500;
        }

        .attendance-buttons {
          display: flex;
          gap: 12px;
        }

        .attendance-btn {
          flex: 1;
          padding: 10px;
          border: 1px solid #e8ecef;
          background: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .attendance-btn.yes {
          color: #344bff;
          border-color: #344bff;
          background: #e3f2fd;
        }

        .attendance-btn.yes:hover {
          background: #344bff;
          color: white;
        }

        .attendance-btn.no:hover {
          border-color: #ef4444;
          color: #ef4444;
          background: #fee;
        }

        .attendance-btn.maybe:hover {
          border-color: #f59e0b;
          color: #f59e0b;
          background: #fffbeb;
        }
      `}</style>
    </div>
  );
}
