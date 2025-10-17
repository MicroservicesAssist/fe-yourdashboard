# ===============================
# 🏗️ STAGE 1: BUILD
# ===============================
FROM node:20-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema (para sharp, si se usa)
RUN apk add --no-cache libc6-compat

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json* ./
COPY next.config.js* ./
COPY postcss.config.js* ./
COPY tailwind.config.js* ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir el proyecto Next.js
RUN npm run build

# ===============================
# 🚀 STAGE 2: RUNTIME
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

# Establecer entorno
ENV NODE_ENV=production

# Copiar dependencias necesarias del builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Variables de entorno Next.js (sobrescribibles en runtime)
ENV NEXT_PUBLIC_ORCHESTRATOR_API_URL=${NEXT_PUBLIC_ORCHESTRATOR_API_URL}
ENV PORT=3000

# Exponer puerto
EXPOSE ${PORT}

# Comando por defecto
CMD ["npm", "run", "start"]
