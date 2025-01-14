FROM node:20.10.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/index.js"]

CMD ["yarn", "start"]
