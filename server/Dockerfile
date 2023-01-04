FROM node
WORKDIR /app/server

COPY package.json .
RUN npm install

COPY . .
RUN npm install typescript -g

RUN tsc
EXPOSE 3000

CMD ["npm", "start"]
