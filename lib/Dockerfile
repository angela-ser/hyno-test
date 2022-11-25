FROM quay.io/xelectra/xasena:latest
RUN git clone https://github.com/angela-ser/hyno-test /root/HyNO
WORKDIR /root/HyNO
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"] 
