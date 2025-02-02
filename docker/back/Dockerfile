FROM node:20.18.2

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN yarn install

COPY . .

CMD ["npm", "run", "start"]
