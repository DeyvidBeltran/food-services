FROM node:21

WORKDIR /pedidos
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]