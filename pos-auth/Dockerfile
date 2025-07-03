########## Etapa 1: build ##########
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json + package-lock.json
COPY package*.json ./

# Instala TODAS las deps (incluye dev) de forma reproducible
RUN npm ci

# Copia el resto del código y compila TS → JS
COPY . .
RUN npm run build        # esto genera build/

########## Etapa 2: runtime ########
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Solo copiamos artefactos y deps de producción
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev    # instala solo dependencias req. en prod

EXPOSE 3333
CMD ["node", "build/server.js"]
