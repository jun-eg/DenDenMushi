FROM node:20.18.2

WORKDIR /workspace

COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN yarn install

COPY . .

WORKDIR /workspace/backend

CMD ["yarn", "start"]
