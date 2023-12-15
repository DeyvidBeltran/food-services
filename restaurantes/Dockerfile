FROM node:21

WORKDIR /restaurantes
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]