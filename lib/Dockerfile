FROM node:latest

RUN apt-get update && apt-get -y upgrade
RUN apt-get install ffmpeg -y
RUN git clone https://github.com/angela-ser/X-Asena-1 /root/HyNO
WORKDIR /root/HyNO/
RUN yarn install --1 network-concurrency
RUN npm i -g supervisor
RUN npm i -g concurrently

CMD ["node", "bot.js"] 



#-------------Dockerfile by HyNO🔐-------------#
