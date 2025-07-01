FROM node:20-alpine
WORKDIR /pos-webapp
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
