FROM node:20.18.0

RUN npm install -g npm@11.4.1

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["npm", "run", "dev"]
