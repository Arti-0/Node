FROM sitespeedio/node:ubuntu-22-04-nodejs-20.10.0

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/app_knex

EXPOSE 80

CMD ["node", "app.js"]