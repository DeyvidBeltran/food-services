FROM node:21

WORKDIR /entregas
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]