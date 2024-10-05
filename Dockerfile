FROM node:22-alpine

WORKDIR /test 
COPY . /test

RUN yarn install

CMD ["node", "./bin/www"]
