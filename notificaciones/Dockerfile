FROM node:21

WORKDIR /notificaciones
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]