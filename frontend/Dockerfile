FROM node:16-alpine

WORKDIR /frontend

COPY package.json ./
RUN yarn
COPY . .

CMD ["yarn", "start"]
