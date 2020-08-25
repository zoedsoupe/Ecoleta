FROM node:12-slim

ENV IP=0.0.0.0 PORT=$PORT

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --only=production

COPY . ./

CMD [ "yarn", "start" ]
