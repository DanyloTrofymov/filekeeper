FROM node
WORKDIR /app/client

COPY package.json .
RUN npm install

COPY . .

RUN npm i -g serve
RUN npm run build
EXPOSE 3000

CMD ["serve", "-s", "build"]
