FROM node:19-alpine

WORKDIR /var/www/front/
RUN yarn install

CMD ["yarn", "start"]
