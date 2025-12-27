FROM node:slim

WORKDIR /app

RUN rm -rf node_modules

COPY package.json yarn.lock* ./

RUN yarn install

USER node

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]