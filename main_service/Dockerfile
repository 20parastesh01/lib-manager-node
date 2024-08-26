FROM hub.hamdocker.ir/node:18.17.0

WORKDIR /app/code

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "main-server" ] 
