FROM node:slim

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install

USER node

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]