FROM node:21

WORKDIR /pagos
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]