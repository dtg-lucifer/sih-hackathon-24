FROM node:alpine
LABEL maintainer="Piush Bose <dev.bosepiush@gmail.com>"

WORKDIR /app
COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 8998

CMD ["npm", "start"]