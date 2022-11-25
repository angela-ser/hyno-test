FROM quay.io/xelectra/xasena:latest
RUN git clone https://github.com/angela-ser/hyno-test /root/X-Asena
WORKDIR /root/X-Asena
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"] 
