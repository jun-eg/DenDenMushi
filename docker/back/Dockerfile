FROM node:20.18.2

RUN npm install -g npm@11.4.1

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN yarn install

COPY . .

CMD ["npm", "run", "start"]
