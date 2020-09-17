FROM node:14.7.0-alpine As development

ARG VERSION

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:14.7.0-alpine as production

ARG NODE_ENV=production
ARG PORT=4040
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE $PORT

CMD ["node", "dist/src/main"]