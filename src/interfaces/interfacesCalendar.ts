// ================================
// 📅 EVENTOS DE CALENDARIO
// ================================

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
    organizer?: boolean;
    status?: string;
  }>;
  isPrivate?: boolean;
  sourceAccount?: string;
  sourceAccountId?: number;

  isAllDay?: boolean;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  visibility?: "default" | "public" | "private";
  transparency?: "opaque" | "transparent";
  recurrence?: string[];
  recurringEventId?: string;
  creator?: string;
  organizer?: string;
}

export interface CalendarEventsList {
  events: CalendarEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  accountsLoaded?: string[];
}

export interface CalendarSearchResult extends CalendarEventsList {
  searchTerm: string;
  accountsSearched?: string[];
}

// ================================
// 📝 DTOs PARA CREAR/ACTUALIZAR EVENTOS
// ================================

export interface CreateEventDto {
  summary: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  timeZone?: string;
  attendees?: string[]; // Array de emails
  isPrivate?: boolean;
  url?: string;
}

export interface UpdateEventDto {
  summary?: string;
  description?: string;
  location?: string;
  startDateTime?: string;
  endDateTime?: string;
  timeZone?: string;
  attendees?: string[];
  url?: string;
}

// ================================
// 📊 RESPUESTAS DE OPERACIONES
// ================================

export interface CreateEventResponse {
  success: boolean;
  event: CalendarEvent;
  message?: string;
}

export interface UpdateEventResponse {
  success: boolean;
  event: CalendarEvent;
  message?: string;
}

export interface SyncEventsResponse {
  success: boolean;
  stats: {
    eventsProcessed: number;
    eventsAdded: number;
    eventsUpdated: number;
    eventsDeleted: number;
  };
  lastSyncTime: string;
  message?: string;
}

export interface AccountInfo {
  id: number;
  email: string;
  name?: string;
  isActive: boolean;
  lastSync?: string;
  eventsCount?: number;
}

export interface UseCalendarEventsReturn {
  createEvent: (
    eventData: CreateEventDto,
    isPrivate?: boolean
  ) => Promise<CreateEventResponse>;
  updateEvent: (
    eventId: string,
    eventData: UpdateEventDto
  ) => Promise<UpdateEventResponse>;
  deleteEvent: (eventId: string) => Promise<boolean>;
  syncEvents: (maxEvents?: number) => Promise<SyncEventsResponse>;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  syncing: boolean;
  isLoading: boolean;
}

export interface UseCalendarDataReturn {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  searchResults: CalendarEvent[];
  searchLoading: boolean;
  searchTotal: number;
  isSearchMode: boolean;
  loadEvents: (
    startDate: string,
    endDate: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  searchEvents: (
    searchTerm: string,
    startDate: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  clearSearch: () => void;
  hasAccount: boolean;
  accountInfo: AccountInfo | null;
  normalEvents: CalendarEvent[];
  normalTotal: number;
  normalLoading: boolean;
}

export interface CalendarSearchProps {
  accountId?: string;
  showUnified?: boolean;
  onEventSelect?: (event: CalendarEvent) => void;
  onSearchChange?: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  showQuickResults?: boolean;
  maxQuickResults?: number;
}

export interface QuickSearchResponse {
  events: CalendarEvent[];
  hasMore: boolean;
  searchTerm: string;
  totalFound: number;
}

export interface SearchFilters {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  attendee?: string;
  status?: "confirmed" | "tentative" | "cancelled";
  visibility?: "default" | "public" | "private";
}

export interface SearchResult extends CalendarEvent {
  matchType?: "title" | "description" | "location" | "attendee";
  snippet?: string;
  score?: number;
}

// ================================
// 🎨 NUEVAS INTERFACES PARA MODALES
// ================================

export interface EventFormData {
  summary: string;
  location?: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  attendees?: string[];
  url?: string;
}

export interface EventModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: EventFormData, isPrivate: boolean) => Promise<void>;
  event?: CalendarEvent | null;
  mode: "create" | "edit";
  loading?: boolean;
}

export interface EventDetailsModalProps {
  visible: boolean;
  onCancel: () => void;
  event: CalendarEvent | null;
  onEdit: () => void;
  onDelete: () => void;
  loading?: boolean;
}

// ================================
// 📊 ESTADÍSTICAS
// ================================

export interface CalendarStats {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  todayEvents: number;
  thisWeekEvents: number;
  lastSyncTime?: string;
}

// ================================
// 🔗 GESTIÓN DE CUENTAS
// ================================

export interface GoogleCalendarAccount {
  id: number;
  email_gmail: string;
  nombre_cuenta: string;
  alias_personalizado?: string;
  fecha_conexion: string;
  ultima_sincronizacion?: string;
  esta_activa: boolean;
  emails_count: number;
}

export interface AccountManagerData {
  cuentas_gmail: GoogleCalendarAccount[];
  cuenta_activa?: GoogleCalendarAccount;
}

// ================================
// 🎯 HOOKS DATA TYPES
// ================================

export interface CalendarViewState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  currentView: "month" | "week" | "day";
  selectedDate: Date;
  currentRange: {
    start: Date;
    end: Date;
  };
}

export interface CalendarFilters {
  searchTerm?: string;
  accountId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  showUnified?: boolean; // Mostrar eventos de todas las cuentas
}

export interface CalendarActions {
  loadEvents: (filters?: CalendarFilters) => Promise<void>;
  searchEvents: (searchTerm: string) => Promise<void>;
  createEvent: (eventData: CreateEventDto) => Promise<void>;
  updateEvent: (eventId: string, eventData: UpdateEventDto) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  syncEvents: () => Promise<void>;
  changeView: (view: "month" | "week" | "day") => void;
  navigateToDate: (date: Date) => void;
  refresh: () => Promise<void>;
}

// ================================
// 🎨 COMPONENTES UI
// ================================

export interface CalendarEventModalProps {
  event: CalendarEvent | null;
  visible: boolean;
  onClose: () => void;
  onUpdate: (eventId: string, data: UpdateEventDto) => void;
  onDelete: (eventId: string) => void;
  loading?: boolean;
}

export interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateEventDto) => void;
  loading?: boolean;
  defaultDate?: Date;
  accountId?: string;
}

export interface GoogleConnectButtonProps {
  onConnect?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  block?: boolean;
}

export interface CalendarViewProps {
  accountId?: string;
  showUnified?: boolean;
  height?: number;
  initialView?: "month" | "week" | "day";
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export interface AccountManagerProps {
  onAccountChange?: (accountId: string) => void;
  onAccountDisconnect?: (accountId: string) => void;
  selectedAccountId?: string;
  showUnifiedOption?: boolean;
}

export interface SearchState {
  query: string;
  results: CalendarEvent[];
  loading: boolean;
  hasSearched: boolean;
  totalResults: number;
  currentPage: number;
}

export interface CalendarState {
  currentView: "month" | "week" | "day";
  currentDate: Date;
  selectedEvent: CalendarEvent | null;
  isSearchMode: boolean;
  searchTerm: string;
  filters: CalendarFilters;
  loading: boolean;
  error: string | null;
}

export interface CalendarEventHandlers {
  onEventClick?: (event: CalendarEvent) => void;
  onEventDoubleClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  onEventResize?: (event: CalendarEvent, newStart: Date, newEnd: Date) => void;
  onDateSelect?: (start: Date, end: Date) => void;
  onViewChange?: (view: string) => void;
  onDateChange?: (date: Date) => void;
}

// ================================
// 🔄 SINCRONIZACIÓN
// ================================

export interface SyncResponse {
  success: boolean;
  message: string;
  stats: {
    eventsProcessed: number;
    eventsAdded: number;
    eventsUpdated: number;
    eventsDeleted: number;
  };
  lastSyncTime: string;
}

export interface SyncOptions {
  accountId?: string;
  maxEvents?: number;
  forceFullSync?: boolean;
}

// ================================
// 🎭 RESPUESTAS DE API
// ================================

export interface CalendarApiResponse<T = unknown> {
  success: boolean;
  source: string;
  data: T;
  message?: string;
}

export interface ErrorDetails {
  code?: string;
  field?: string;
  reason?: string;
  [key: string]: unknown;
}

export interface CalendarErrorResponse {
  success: false;
  error: string;
  details?: ErrorDetails;
}

// ================================
// 🌐 CONFIGURACIÓN
// ================================

export interface CalendarConfig {
  defaultView: "month" | "week" | "day";
  defaultTimeZone: string;
  maxEventsPerPage: number;
  refreshInterval?: number;
  autoSync: boolean;
}

// ================================
// 📱 RESPONSIVE/MOBILE
// ================================

export interface MobileCalendarProps {
  isMobile: boolean;
  collapsedSidebar?: boolean;
  onToggleSidebar?: () => void;
}

// ================================
// 🎯 UTILIDADES
// ================================

export type CalendarEventColor =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange";

export interface CalendarTheme {
  primaryColor: string;
  eventColors: Record<CalendarEventColor, string>;
  todayColor: string;
  weekendColor: string;
}

// ================================
// 🔍 BÚSQUEDA AVANZADA
// ================================

export interface AdvancedSearchFilters {
  searchTerm?: string;
  accountIds?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  attendees?: string[];
  location?: string;
  hasAttachments?: boolean;
  isPrivate?: boolean;
}

export interface SearchSuggestion {
  type: "event" | "location" | "attendee";
  value: string;
  count: number;
}
