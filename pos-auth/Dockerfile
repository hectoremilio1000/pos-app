########################
# Etapa 1: build       #
########################
FROM node:20-alpine AS build
WORKDIR /app

# 1. Copia solo lo mínimo para instalar dependencias
COPY package*.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i --frozen-lockfile    # instala TODO, pero solo en build

# 2. Copia el resto del código y compila
COPY . .
RUN pnpm run build              # genera carpeta build/

########################
# Etapa 2: runtime     #
########################
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# 3. Copia artefacto y package.json
COPY --from=build /app/build        ./build
COPY --from=build /app/package.json ./package.json

# 4. Instala SOLO dependencias de producción
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i --prod --frozen-lockfile

EXPOSE 3333
CMD ["node", "build/server.js"]
