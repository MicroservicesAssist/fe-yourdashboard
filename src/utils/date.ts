export const formatoDeFecha = (dateStr: Date) => {
  const date = new Date(dateStr);

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleDateString("es-ES", optionsDate);

  return `${formattedDate}`;
};

export const formatoDeFechaCorta = (dateStr: Date): string => {
  const date = new Date(dateStr);

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  return date.toLocaleDateString("es-ES", optionsDate);
};

export const formatoDeFechaYHoraCorta = (dateStr: Date): string => {
  const date = new Date(dateStr);

  const optionsDateTime: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleDateString("es-ES", optionsDateTime);
};

export const formatoFechaHoraHoy = (dateStr: Date | string): string => {
  const date = new Date(dateStr);
  const now = new Date();

  // Normalizar solo la parte de fecha para comparar
  const esMismoDia =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (esMismoDia) {
    // Solo hora:minuto si es hoy
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    // Si no es hoy → dd/MM hh:mm
    const fecha = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    });
    const hora = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${fecha} ${hora}`;
  }
};

export const formatoDeFechaYHora = (dateStr: Date) => {
  const date = new Date(dateStr);

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString("es-ES", optionsDate);

  return `${formattedDate}`;
};
