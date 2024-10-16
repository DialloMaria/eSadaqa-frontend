FROM node:22.5.1

WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@~18.2.8
RUN npm install --force

EXPOSE 4200

CMD npm run start

