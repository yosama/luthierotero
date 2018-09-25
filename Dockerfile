FROM node:8.4.0

# File Author / Maintainer
MAINTAINER Coderice


 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY package-lock.json /usr/src/app

RUN npm install

RUN npm install pm2 -g

 COPY . /usr/src/app

 RUN npm install -D .

 EXPOSE 3000

CMD ["pm2-docker", "start", "process.json"]